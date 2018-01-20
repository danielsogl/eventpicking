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
    user: gmailEmail,
    pass: gmailPassword
  }
});

const APP_NAME = 'Eventpicking.de - Your pictures, their events';

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

  for (let i = 0; i < images.length; i++) {
    admin
      .firestore()
      .collection('original-images')
      .where('event', '==', images[i].event)
      .where('name', '==', images[i].name)
      .get()
      .then(querySnapshot => {
        console.log('Image', querySnapshot.docs[0].data());
        // transaction.item_list.items[i].url = querySnapshot.docs[0].data().url);
      })
      .catch(error => {
        console.log('Error getting documents: ', error);
        return null;
      });
  }

  transaction.status = 'available';

  console.log('New transaction', transaction);

  return event.data.ref.set(transaction, { merge: true });

  // // Send Mail
  // const mailOptions = {
  //   from: `${APP_NAME} <noreply@firebase.com>`,
  //   to: 'daniel@sogls.de'
  // };

  // mailOptions.subject = `Ihre Bestellung bei ${APP_NAME}`;
  // mailOptions.text = `Vielen Dank für Ihre Bestellung`;
  // return mailTransport
  //   .sendMail(mailOptions)
  //   .then(() => {

  //   })
  //   .catch(err => {
  //     console.log(err);
  //     return null;
  //   });
};
