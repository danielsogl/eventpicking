const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

// Function modules
const imageModule = require('./transform-image.js');
const stripeModule = require('./stripe.js');
const eventModule = require('./events.js');

/**
 * Create Stripe user account
 */
exports.createStripeCustomer = functions.firestore
  .document('users/{userID}')
  .onCreate(stripeModule.createStripeCustomerHandler);

/**
 * Handle Stripe subscriptions
 */
exports.createSubscription = functions.firestore
  .document('users/{userID}')
  .onUpdate(stripeModule.createSubscription);

/**
 * Transform Image
 */
exports.transformImage = functions.storage
  .object('events/{photographer}/{id}/originals')
  .onChange(imageModule.transformImageHandler);

/**
 * Decrease events left counter
 */
exports.decreaseEventsLeft = functions.firestore
  .document('events/{eventID}')
  .onCreate(eventModule.decreaseEventsLeftHandler);

/**
 * Increase events left counter
 */
exports.increaseEventsLeft = functions.firestore
  .document('events/{eventID}')
  .onDelete(eventModule.increaseEventsLeftHandler);
