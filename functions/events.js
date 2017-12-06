const admin = require('firebase-admin');

exports.decreaseEventsLeftHandler = event => {
  var eventData = event.data.data();
  var photographerUid = eventData.photographerUid;

  return admin
    .firestore()
    .collection('users')
    .doc(photographerUid)
    .get()
    .then(profile => {
      return admin
        .firestore()
        .collection('users')
        .doc(photographerUid)
        .set({ eventsLeft: profile.eventsLeft - 1 }, { merge: true });
    });
};

exports.increaseEventsLeftHandler = event => {
  var eventData = event.data.data();
  var photographerUid = eventData.photographerUid;

  return admin
    .firestore()
    .collection('users')
    .doc(photographerUid)
    .get()
    .then(profile => {
      return admin
        .firestore()
        .collection('users')
        .doc(photographerUid)
        .set({ eventsLeft: profile.eventsLeft + 1 }, { merge: true });
    });
};
