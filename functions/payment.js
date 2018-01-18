/**
 * Payment function handler
 * @author Daniel Sogl
 */
const functions = require('firebase-functions');
const admin = require('firebase-admin');

exports.transactionProcessHandler = event => {
  // Transaction
  let transaction = event.data.data();

  let images = [];

  // Get original image download url
  for (let i = 0; i < transaction.item_list.items.length; i++) {
    images.push({
      event: transaction.item_list.items[i].name.split('/')[0],
      name: transaction.item_list.items[i].name.split('/')[1],
      index: i
    });
  }

  const fetches = images.map(image => {
    return admin
      .firestore()
      .collection('original-images')
      .where('event', '==', image.event)
      .where('name', '==', image.name)
      .get().then(querySnapshot => {
        console.log('Image', querySnapshot.docs[0].data());
        return transaction.item_list.items[i].url = querySnapshot.docs[0].data().url;
      })
  });

  const docs = await Promise.all(fetches)

  admin
    .firestore()
    .collection('original-images')
    .where('event', '==', transaction.item_list.items[i].name.split('/')[0])
    .where('name', '==', transaction.item_list.items[i].name.split('/')[1])
    .get()
    .then(querySnapshot => {
      console.log('Image', querySnapshot.docs[0].data());
      transaction.item_list.items[i].url = querySnapshot.docs[0].data().url;
    })
    .catch(error => {
      console.log('Error getting documents: ', error);
      return null;
    });

  return event.data.ref.set(transaction, { merge: true });

  console.log('New transaction', transaction);
};
