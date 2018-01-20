const admin = require('firebase-admin');

exports.updateEventVotesHandler = event => {
  var image = event.data.data();

  if (
    event.data.data() === event.data.previous.data() ||
    event.data.data().ratings === event.data.previous.data().ratings
  ) {
    console.log('Nothing changed');
    return null;
  }

  return admin
    .firestore()
    .collection('events')
    .doc(image.event)
    .get()
    .then(doc => {
      var data = doc.data();
      if (image.ratings > event.data.previous.data().ratings) {
        console.log('Added upvote');
        data.ratings = data.ratings + 1;
      } else if (image.ratings < event.data.previous.data().ratings) {
        console.log('Added Downvote');
        data.ratings = data.ratings - 1;
      }
      console.log('New rating', data.ratings);

      return admin
        .firestore()
        .collection('events')
        .doc(image.event)
        .update(data);
    });
};

/**
 *
 * @param {*} event
 * @author Daniel Sogl, Dennis Maurer
 */
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
  var eventData = event.data.previous.data();
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
