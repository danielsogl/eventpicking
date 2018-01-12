const functions = require('firebase-functions');
const mkdirp = require('mkdirp-promise');
const gcs = require('@google-cloud/storage')({
  keyFilename: 'service-account-credentials.json'
});
const admin = require('firebase-admin');
const spawn = require('child-process-promise').spawn;
const path = require('path');
const os = require('os');
const fs = require('fs');
const readFile = require('fs-readfile-promise');
const imageinfo = require('imageinfo');
const uuidv1 = require('uuid/v1');

// Max height and width of the thumbnail in pixels.
const THUMB_MAX_HEIGHT = 400;
const THUMB_MAX_WIDTH = 300;
// Thumbnail prefix added to file names.
const THUMB_PREFIX = 'thumb_';

// Max height and width of the preview in pixels.
const PRE_MAX_HEIGHT = 950;
const PRE_MAX_WIDTH = 950;
// Thumbnail prefix added to file names.
const PRE_PREFIX = 'pre_';

/**
 * When an image is uploaded in the Storage bucket We generate a thumbnail automatically using
 * ImageMagick.
 * After the thumbnail has been generated and uploaded to Cloud Storage,
 * we write the public URL to the Firebase Realtime Database.
 * @author Daniel Sogl, Dennis Maurer
 */
exports.transformImageHandler = event => {
  // File and directory paths.
  const filePath = event.data.name;
  const contentType = event.data.contentType; // This is the image Mimme type
  const fileDir = path.dirname(filePath);
  const fileName = path.basename(filePath);
  const thumbFilePath = path.normalize(
    path.join(fileDir, `${THUMB_PREFIX}${fileName}`)
  );
  const preFilePath = path.normalize(
    path.join(fileDir, `${PRE_PREFIX}${fileName}`)
  );
  const watermarkFilePath = path.normalize(path.join('watermark.png'));
  const tempLocalFile = path.join(os.tmpdir(), filePath);
  const tempLocalDir = path.dirname(tempLocalFile);
  const tempLocalThumbFile = path.join(os.tmpdir(), thumbFilePath);
  const tempLocalPreFile = path.join(os.tmpdir(), preFilePath);
  const tempLocalWatermark = path.join(os.tmpdir(), watermarkFilePath);

  let fileInfo;

  // Cloud Storage files.
  const bucket = gcs.bucket(event.data.bucket);
  const file = bucket.file(filePath);
  const thumbFile = bucket.file(thumbFilePath);
  const preFile = bucket.file(preFilePath);
  const metadata = {
    contentType: contentType
  };

  // Exit if this is triggered on a file that is not an image.
  if (!contentType.startsWith('image/')) {
    console.log('This is not an image.');
    return null;
  }

  // Exit if the image is already a thumbnail.
  if (fileName.startsWith(THUMB_PREFIX)) {
    console.log('Already a Thumbnail.');
    return null;
  }

  if (fileName.startsWith(PRE_PREFIX)) {
    console.log('Already a Preview.');
    return null;
  }

  // Exit if this is a move or deletion event.
  if (event.data.resourceState === 'not_exists') {
    console.log('Delete event');
    return null;
  }

  // Create the temp directory where the storage file will be downloaded.
  return mkdirp(tempLocalDir)
    .then(() => {
      // Download file from bucket.
      return file.download({
        destination: tempLocalFile
      });
    })
    .then(() => {
      console.log('The file has been downloaded to', tempLocalFile);
      console.log('Save image metadata');

      return readFile(tempLocalFile).then(file => {
        info = imageinfo(file);
        fileInfo = {
          height: info.height,
          size: file.length,
          type: info.mimeType,
          width: info.width
        };
      });
    })
    .then(() => {
      // Generate a thumbnail using ImageMagick.
      console.log('Generate thumbnail');
      return spawn(
        'convert',
        [
          tempLocalFile,
          '-thumbnail',
          `${THUMB_MAX_WIDTH}x${THUMB_MAX_HEIGHT}>`,
          tempLocalThumbFile
        ],
        {
          capture: ['stdout', 'stderr']
        }
      ).then(() => {
        console.log('Thumbnail created at', tempLocalThumbFile);
      });
    })
    .then(() => {
      return bucket
        .file('wasserzeichen.png')
        .download({
          destination: tempLocalWatermark
        })
        .then(() => {
          console.log(
            'The watermark image has been downloaded to',
            tempLocalWatermark
          );
        });
    })
    .then(() => {
      return spawn(
        'convert',
        [
          tempLocalFile,
          '-thumbnail',
          `${PRE_MAX_WIDTH}x${PRE_MAX_HEIGHT}>`,
          tempLocalPreFile
        ],
        {
          capture: ['stdout', 'stderr']
        }
      ).then(() => {
        console.log('Resized preview created at', tempLocalPreFile);
      });
    })
    .then(() => {
      // Generate a preview using ImageMagick.
      console.log('Generate preview');
      return spawn(
        'composite',
        [
          '-watermark',
          '75',
          '-gravity',
          'South',
          tempLocalWatermark,
          tempLocalPreFile,
          tempLocalPreFile
        ],
        {
          capture: ['stdout', 'stderr']
        }
      ).then(() => {
        console.log('Preview created at', tempLocalPreFile);
      });
    })
    .then(() => {
      // Uploading the Thumbnail.
      return bucket.upload(tempLocalThumbFile, {
        destination: thumbFilePath,
        metadata: metadata
      });
    })
    .then(() => {
      return bucket.upload(tempLocalPreFile, {
        destination: preFilePath,
        metadata: metadata
      });
    })
    .then(() => {
      console.log('Thumbnail uploaded to Storage at', thumbFilePath);
      console.log('Preview uploaded to Storage at', preFilePath);
      // Once the image has been uploaded delete the local files to free up disk space.
      fs.unlinkSync(tempLocalFile);
      fs.unlinkSync(tempLocalThumbFile);
      fs.unlinkSync(tempLocalPreFile);
      // Get the Signed URLs for the thumbnail and original image.
      const config = {
        action: 'read',
        expires: '03-01-2500'
      };
      return Promise.all([
        thumbFile.getSignedUrl(config),
        preFile.getSignedUrl(config),
        file.getSignedUrl(config)
      ]);
    })
    .then(results => {
      console.log('Got Signed URLs.');
      const thumbFileUrl = results[0][0];
      const preFileUrl = results[1][0];
      const fileUrl = results[2][0];

      // Event Id
      const eventId = preFilePath.split('/')[2];

      // Image ID
      const uuid = uuidv1();

      // Add the URLs to Firestore
      return admin
        .firestore()
        .collection('events')
        .doc(eventId)
        .collection('images')
        .doc(uuid)
        .set({
          info: fileInfo,
          name: file.name.split('/')[3],
          preview: preFileUrl,
          thumbnail: thumbFileUrl,
          ratings: 0,
          id: uuid
        })
        .then(() => {
          console.log('Saved thumb and pre urls');
          return admin
            .firestore()
            .collection('events')
            .doc(eventId)
            .collection('originals')
            .doc(uuid)
            .set({
              info: fileInfo,
              name: file.name.split('/')[3],
              url: fileUrl,
              id: uuid
            })
            .then(() => {
              console.log('Saved original url');
            });
        });
    });
};
