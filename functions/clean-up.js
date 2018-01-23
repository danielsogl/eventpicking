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
              return admin
                .firestore()
                .collection('original-images')
                .doc(event.params.imageID)
                .delete()
                .then(() => {
                  console.log('Deleted firestore collection');
                });
            });
        });
    });
};

exports.deleteUserFromDBHandler = event => {
  const uid = event.data.uid;
  return admin
    .firestore()
    .collection('users')
    .doc(uid)
    .get()
    .then(doc => {
      var user = doc.data();
      if (user) {
        return admin
          .firestore()
          .collection('users')
          .doc(uid)
          .delete()
          .then(() => {
            if (user.roles.photographer === true) {
              return admin
                .firestore()
                .collection('photographerUrls')
                .doc(user.photographerUrl)
                .delete()
                .then(() => {
                  console.log('Deleted photographer url');
                  return admin
                    .firestore()
                    .collection('photographer')
                    .doc(uid)
                    .delete()
                    .then(() => {
                      console.log('deleted photographer profile');
                      return admin
                        .firestore()
                        .collection('price-lists')
                        .doc(uid)
                        .delete()
                        .then(() => {
                          console.log('deleted price list');
                          return admin
                            .firestore()
                            .collection('printing-houses')
                            .doc(uid)
                            .delete()
                            .then(() => {
                              console.log('deleted printing house');
                            })
                            .catch(err => {
                              console.log(err);
                              return null;
                            });
                        })
                        .catch(err => {
                          console.log(err);
                          return null;
                        });
                    })
                    .catch(err => {
                      console.log(err);
                      return null;
                    });
                })
                .catch(err => {
                  console.log(err);
                  return null;
                });
            } else {
              console.log('user is no photographer');
              return null;
            }
          })
          .catch(err => {
            console.log(err);
            return null;
          });
      } else {
        console.log('user alreadey deleated from firestore');
        return null;
      }
    });
};

exports.deleteuserFromFirebaseHandler = event => {
  const userID = event.params.userID;
  const user = event.data.previous;

  // Delete user from firebase
  return admin
    .auth()
    .deleteUser(userID)
    .then(() => {
      console.log('Successfully deleted user');
      console.log(user);
      if (user.roles.photographer === true) {
        return admin
          .firestore()
          .collection('photographerUrls')
          .doc(user.photographerUrl)
          .delete()
          .then(() => {
            console.log('Deleted photographer url');
            return admin
              .firestore()
              .collection('photographer')
              .doc(uid)
              .delete()
              .then(() => {
                console.log('deleted photographer profile');
                return admin
                  .firestore()
                  .collection('price-lists')
                  .doc(uid)
                  .delete()
                  .then(() => {
                    console.log('deleted price list');
                    return admin
                      .firestore()
                      .collection('printing-houses')
                      .doc(uid)
                      .delete()
                      .then(() => {
                        console.log('deleted printing house');
                      })
                      .catch(err => {
                        console.log(err);
                        return null;
                      });
                  })
                  .catch(err => {
                    console.log(err);
                    return null;
                  });
              })
              .catch(err => {
                console.log(err);
                return null;
              });
          })
          .catch(err => {
            console.log(err);
            return null;
          });
      }
    })
    .catch(error => {
      console.log('Error deleting user:', error);
      return null;
    });
};
