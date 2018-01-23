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

  const promises = [];

  transaction.item_list.items.forEach(item => {
    if (item.sku === 'Download') {
      const promise = admin
        .firestore()
        .collection('original-images')
        .where('event', '==', item.name.split('/')[0])
        .where('name', '==', item.name.split('/')[1])
        .get();
      promises.push(promise);
    } else {
      promises.push(
        new Promise((resolve, reject) => {
          resolve(null);
        })
      );
    }
  });

  return Promise.all(promises)
    .then(results => {
      console.log('Loaded all image documents');
      for (var i = 0; i < transaction.item_list.items.length; i++) {
        if (transaction.item_list.items[i].sku === 'Download') {
          transaction.item_list.items[i].downloadUrl = results[
            i
          ].docs[0].data().url;
        }
      }

      console.log('Finished transaction');
      // Set transaction as finsihed
      transaction.status = 'available';
    })
    .then(() => {
      return event.data.ref.set(transaction, {
        merge: true
      });
    });
};
