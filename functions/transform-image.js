const functions = require('firebase-functions');
const gcs = require('@google-cloud/storage')();
const path = require('path');
const os = require('os');
const fs = require('fs');
const admin = require('firebase-admin');
const Jimp = require('jimp');

exports.transformImageHandler = event => {
  const object = event.data; // The Storage object.

  const fileBucket = object.bucket; // The Storage bucket that contains the file.
  const filePath = object.name; // File path in the bucket.
  const contentType = object.contentType; // File content type.
  const resourceState = object.resourceState; // The resourceState is 'exists' or 'not_exists' (for file/folder deletions).
  const metageneration = object.metageneration; // Number of times metadata has been generated. New objects have a value of 1.

  if (!contentType.startsWith('image/')) {
    console.log('This is not an image.');
    return;
  }

  // Get the file name.
  const fileName = path.basename(filePath);

  // Exit if the image is already a thumbnail.
  if (fileName.startsWith('thumb_')) {
    console.log('Already a Thumbnail.');
    return;
  }

  // Exit if the image is already a preview picture.
  if (fileName.startsWith('preview_')) {
    console.log('Already a Preview image.');
    return;
  }

  // Exit if this is a move or deletion event.
  if (resourceState === 'not_exists') {
    console.log('This is a deletion event.');
    return;
  }

  // Exit if file exists but is not new and is only being triggered
  // because of a metadata change.
  if (resourceState === 'exists' && metageneration > 1) {
    console.log('This is a metadata change event.');
    return;
  }

  // Download file from bucket.
  const bucket = gcs.bucket(fileBucket);
  const tempFilePath = path.join(os.tmpdir(), fileName);
  return bucket
    .file(filePath)
    .download({
      destination: tempFilePath
    })
    .then(() => {
      console.log('Image downloaded locally to', tempFilePath);
      // Generate a thumbnail using Jimp
      return Jimp.read(tempFilePath).then(image => {
        image
          .resize(256, 256)
          .quality(60)
          .write(tempFilePath);
      });
    })
    .then(() => {
      console.log('Thumbnail created at', tempFilePath);
      // We add a 'thumb_' prefix to thumbnails file name. That's where we'll upload the thumbnail.
      const thumbFileName = `thumb_${fileName}`;
      const thumbFilePath = path.join(path.dirname(filePath), thumbFileName);
      // Uploading the thumbnail.
      return bucket.upload(tempFilePath, { destination: thumbFilePath });
    })
    .then(() => {
      console.log('Thumbnail uploaded to Storage at', thumbFilePath);
      // Once the image has been uploaded delete the local files to free up disk space.
      fs.unlinkSync(tempLocalFile);
      fs.unlinkSync(tempLocalThumbFile);
      // Get the Signed URLs for the thumbnail and original image.
      const config = {
        action: 'read',
        expires: '03-01-2500'
      };
      return Promise.all([
        thumbFile.getSignedUrl(config),
        file.getSignedUrl(config)
      ]);
    })
    .then(results => {
      console.log('Got Signed URLs.');
      const thumbResult = results[0];
      const originalResult = results[1];
      const thumbFileUrl = thumbResult[0];
      const fileUrl = originalResult[0];
      // Add the URLs to the Database
      return admin
        .database()
        .ref('images')
        .push({ path: fileUrl, thumbnail: thumbFileUrl });
    })
    .then(() => console.log('Thumbnail URLs saved to database.'));
};
