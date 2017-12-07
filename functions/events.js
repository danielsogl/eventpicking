const admin = require('firebase-admin');

exports.decreaseEventsLeftHandler = event => {
  var eventData = event.data.data();
  var photographerUid = eventData.photographerUid;

  return admin
    .firestore()
    .collection('users')
    .doc(photographerUid)
    .get()
    .then(function(profile) {
      return admin
        .firestore()
        .collection('users')
        .doc(photographerUid)
        .set(
          {
            eventsLeft: profile.data().eventsLeft - 1,
            eventCounter: profile.data().eventCounter + 1
          },
          {
            merge: true
          }
        );
    });
};

exports.increaseEventsLeftHandler = event => {
  ``;
  var eventData = event.data.data();
  var photographerUid = eventData.photographerUid;

  return admin
    .firestore()
    .collection('users')
    .doc(photographerUid)
    .get()
    .then(function(profile) {
      return admin
        .firestore()
        .collection('users')
        .doc(photographerUid)
        .set(
          {
            eventsLeft: profile.data().eventsLeft + 1,
            eventCounter: profile.data().eventCounter - 1
          },
          {
            merge: true
          }
        );
    });
};
