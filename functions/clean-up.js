import { userInfo } from 'os';

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
  const eventId = event.params.eventID;

  // Configure Google Plattform Storage Bucket
  const storageBucket = functions.config().firebase.storageBucket;
  const bucket = gcs.bucket(storageBucket);

  return admin
    .firestore()
    .collection('events')
    .doc(eventId)
    .get()
    .then(function(data) {
      console.log('Event loaded');

      // Thumbnail Path
      const thumbPath = `events/${
        data.data().photographerUid
      }/${eventId}/thumb_${image.name}`;
      // Preview Path
      const prePath = `events/${data.data().photographerUid}/${eventId}/pre_${
        image.name
      }`;

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
            });
        });
    });
};

exports.deleateUserFromDBHandler = event => {
  const userID = event.params.userID;

  // Delete events

  // Delete user from firebase
  return admin
    .auth()
    .deleteUser(userID)
    .then(function() {
      console.log('Successfully deleted user');
    })
    .catch(function(error) {
      console.log('Error deleting user:', error);
    });
};

exports.deleteuserFromFirebaseHandler = event => {
  const userID = event.params.userID;
};

function deleteCollection(db, collectionPath, batchSize) {
  var collectionRef = db.collection(collectionPath);
  var query = collectionRef.orderBy('__name__').limit(batchSize);

  return new Promise((resolve, reject) => {
    deleteQueryBatch(db, query, batchSize, resolve, reject);
  });
}

function deleteQueryBatch(db, query, batchSize, resolve, reject) {
  query
    .get()
    .then(snapshot => {
      // When there are no documents left, we are done
      if (snapshot.size == 0) {
        return 0;
      }

      // Delete documents in a batch
      var batch = db.batch();
      snapshot.docs.forEach(doc => {
        batch.delete(doc.ref);
      });

      return batch.commit().then(() => {
        return snapshot.size;
      });
    })
    .then(numDeleted => {
      if (numDeleted === 0) {
        resolve();
        return;
      }

      // Recurse on the next process tick, to avoid
      // exploding the stack.
      process.nextTick(() => {
        deleteQueryBatch(db, query, batchSize, resolve, reject);
      });
    })
    .catch(reject);
}
