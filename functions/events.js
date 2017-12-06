const admin = require('firebase-admin');

exports.decreaseEventsLeftHandler = event => {
  var eventData = event.data.data();
  var photographerUid = eventData.photographerUid;

  var profile = admin
    .firestore()
    .collection('users')
    .doc(photographerUid);

  console.log(profile);

  return admin
    .firestore()
    .collection('users')
    .doc(photographerUid)
    .set({ eventsLeft: profile.eventsLeft - 1 }, { merge: true });
};

exports.increaseEventsLeftHandler = event => {
  var eventData = event.data.data();
  var photographerUid = eventData.photographerUid;

  var profile = admin
    .firestore()
    .collection('users')
    .doc(photographerUid);

  console.log(profile);

  return admin
    .firestore()
    .collection('users')
    .doc(photographerUid)
    .set({ eventsLeft: profile.eventsLeft + 1 }, { merge: true });
};
