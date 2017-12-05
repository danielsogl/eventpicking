const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

// Function modules
const imageModule = require('./transform-image.js');
const stripeModule = require('./stripe.js');

/**
 * Create Stripe user account
 */
exports.createStripeCustomer = functions.firestore
  .document('users/{userID}')
  .onCreate(stripeModule.createStripeCustomerHandler);

/**
 *
 */
exports.createSubscription = functions.firestore
  .document('users/{userID}')
  .onWrite(stripeModule.createStripeCustomerHandler);

/**
 * Transform Image
 */
exports.transformImage = functions.storage
  .object('events/{photographer}/{id}/originals')
  .onChange(imageModule.transformImageHandler);
