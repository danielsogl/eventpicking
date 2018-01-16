/**
 * Clean-Up function handler
 * @author Daniel Sogl, Dennis Maurer
 */
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const gcs = require('@google-cloud/storage')({
  keyFilename: 'service-account-credentials.json'
});

/**
 * Delete image if user deletes firestore documents
 * @param {*} event
 */
exports.deleteImageHandler = event => {
  const image = event.data.previous.data();

  // Configure Google Plattform Storage Bucket
  const storageBucket = functions.config().firebase.storageBucket;
  const bucket = gcs.bucket(storageBucket);

  // Thumbnail Path
  const thumbPath = `events/${image.event}/thumb_${image.name}`;
  // Preview Path
  const prePath = `events/${image.event}/pre_${image.name}`;
  // Original Path
  const originalPath = `events/${image.event}/${image.name}`;

  return bucket
    .file(thumbPath)
    .delete()
    .then(value => {
      console.log('Deleted Thumbnail');
      return bucket
        .file(prePath)
        .delete()
        .then(value => {
          console.log('Deleted Preview');
          return bucket
            .file(originalPath)
            .delete()
            .then(() => {
              console.log('Deleted original image');
            });
        });
    });
};

exports.deleteUserFromDBHandler = event => {
  const user = event.data;
  return admin
    .firestore()
    .collection('users')
    .doc(user.uid)
    .delete()
    .then(() => {
      console.log('Successfully deleted user from firestore');
    })
    .catch(err => {
      console.log('Error deleting user from firestore:', err);
    });
};

exports.deleteuserFromFirebaseHandler = event => {
  const userID = event.params.userID;

  // Delete user from firebase
  return admin
    .auth()
    .deleteUser(userID)
    .then(() => {
      console.log('Successfully deleted user');
    })
    .catch(error => {
      console.log('Error deleting user:', error);
    });
};
