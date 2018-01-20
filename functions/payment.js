/**
 * Payment function handler
 * @author Daniel Sogl
 */
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');
const gmailEmail = functions.config().gmail.email;
const gmailPassword = functions.config().gmail.password;
const mailTransport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'eventpicking@gmail.com',
    pass: 'Mtis2011'
  }
});

exports.transactionProcessHandler = event => {
  // Transaction
  let transaction = event.data.data();
  transaction.status = 'available';

  var counter = 0;

  // Get original image download url
  for (let i = 0; i < transaction.item_list.items.length; i++) {
    admin
      .firestore()
      .collection('original-images')
      .where('event', '==', transaction.item_list.items[i].name.split('/')[0])
      .where('name', '==', transaction.item_list.items[i].name.split('/')[1])
      .get()
      .then(querySnapshot => {
        transaction.item_list.items[i].url = querySnapshot.docs[0].data().url;
        counter++;
        console.log(counter);
        if (counter === transaction.item_list.items.length) {
          return event.data.ref.set(transaction, { merge: true });
        }
      })
      .catch(error => {
        console.log('Error getting documents: ', error);
        return null;
      });
  }

  return event.data.ref.set(transaction, { merge: true });
};
