const functions = require('firebase-functions');
const admin = require('firebase-admin');
const stripe = require('stripe')(functions.config().stripe.testkey);

/**
 * Create Strip user on signup
 */
exports.createStripeCustomerHandler = event => {
  const data = event.data;
  return stripe.customers
    .create({
      email: data.email
    })
    .then(customer => {
      return admin
        .firestore()
        .collection('users')
        .doc(`${data.uid}`)
        .set({ stripeId: customer.id }, { merge: true });
    });
};

// /**
//  * Create user subscription
//  */
// exports.createSubscription = event => {
//   const tokenId = event.data.val();
//   const userId = event.params.userId;

//   if (!tokenId) throw new Error('token missing');

//   return admin
//     .database()
//     .ref(`/users/${userId}`)
//     .once('value')
//     .then(snapshot => snapshot.val())
//     .then(user => {
//       return stripe.subscriptions.create({
//         customer: user.customerId,
//         source: tokenId,
//         items: [
//           {
//             plan: 'pro-membership'
//           }
//         ]
//       });
//     })
//     .then(sub => {
//       admin
//         .database()
//         .ref(`/users/${userId}/pro-membership`)
//         .update({ status: 'active' });
//     })
//     .catch(err => console.log(err));
// };

// /**
//  * Handle Recurring Payments with Webhooks
//  */
// exports.recurringPayment = event => {
//   const hook = req.body.type;
//   const data = req.body.data.object;
//   if (!data) throw new Error('missing data');

//   return admin
//     .database()
//     .ref(`/customers/${data.customer}`)
//     .once('value')
//     .then(snapshot => snapshot.val())
//     .then(userId => {
//       const ref = admin.database().ref(`/users/${userId}/pro-membership`);

//       // Handle successful payment webhook
//       if (hook === 'invoice.payment_succeeded') {
//         return ref.update({ status: 'active' });
//       }

//       // Handle failed payment webhook
//       if (hook === 'invoice.payment_failed') {
//         return ref.update({ status: 'pastDue' });
//       }
//     })
//     .then(() => res.status(200).send(`successfully handled ${hook}`))
//     .catch(err => res.status(400).send(`error handling ${hook}`));
// };
