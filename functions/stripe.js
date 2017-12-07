const functions = require('firebase-functions');
const admin = require('firebase-admin');
const stripe = require('stripe')(functions.config().stripe.testkey);

/**
 * Create Strip user on signup
 */
exports.createStripeCustomerHandler = event => {
  const data = event.data.data();
  return stripe.customers
    .create({
      email: data.email
    })
    .then(customer => {
      return admin
        .firestore()
        .collection('users')
        .doc(data.uid)
        .set({ stripeId: customer.id }, { merge: true });
    });
};

// /**
//  * Create user subscription
//  */
exports.createSubscription = event => {
  var newValue = event.data.data();
  var previousValue = event.data.previous.data();

  if (
    newValue.subscription.membership === previousValue.subscription.membership
  )
    return;

  if (!newValue.subscription.token) throw new Error('token missing');

  if (previousValue.subscription.membership === 'free') {
    console.log('Create Subscription');
    return stripe.subscriptions
      .create({
        customer: newValue.stripeId,
        source: newValue.subscription.token,
        items: [
          {
            plan: newValue.subscription.membership
          }
        ],
        tax_percent: 19
      })
      .then(sub => {
        let eventsLeftCounter = 0;
        if (newValue.subscription.membership === 'basic') {
          eventsLeftCounter = 15;
        } else if (newValue.subscription.membership === 'smart') {
          eventsLeftCounter = 25;
        } else {
          eventsLeftCounter = 50;
        }

        if (newValue.subscription.eventsLeft !== 0) {
          eventsLeftCounter =
            eventsLeftCounter - newValue.subscription.eventsLeft;
        } else {
          eventsLeftCounter = eventsLeftCounter - 1;
        }
        admin
          .firestore()
          .doc(`users/${newValue.uid}`)
          .set(
            {
              subscription: { status: 'valid', subId: sub.id },
              eventsLeft: eventsLeftCounter
            },
            { merge: true }
          );
      });
  } else {
    console.log('Update Subscription');
    return stripe.subscriptions
      .retrieve(newValue.subscription.subId)
      .then(subscription => {
        var item_id = subscription.items.data[0].id;
        return stripe.subscriptions
          .update(newValue.subscription.subId, {
            items: [
              {
                id: item_id,
                plan: newValue.subscription.membership
              }
            ],
            tax_percent: 19
          })
          .then(sub => {
            let eventsLeftCounter = 0;
            if (newValue.subscription.membership === 'basic') {
              eventsLeftCounter = 15;
            } else if (newValue.subscription.membership === 'smart') {
              eventsLeftCounter = 25;
            } else {
              eventsLeftCounter = 50;
            }

            if (newValue.subscription.eventsLeft !== 0) {
              eventsLeftCounter =
                eventsLeftCounter - newValue.subscription.eventsLeft;
            } else {
              eventsLeftCounter = eventsLeftCounter - 1;
            }
            admin
              .firestore()
              .doc(`users/${newValue.uid}`)
              .set(
                {
                  subscription: { status: 'valid', subId: sub.id },
                  eventsLeft: eventsLeftCounter
                },
                { merge: true }
              );
          });
      });
  }
};

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
