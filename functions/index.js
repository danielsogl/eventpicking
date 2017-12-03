const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

// Function modules
const imageModule = require('./transform-image.js');
const stripeModule = require('./stripe.js');

/**
 * Stripe Functions
 */
exports.createStripeCustomer = functions.auth
  .user()
  .onCreate(stripeModule.createStripeCustomerHandler);

/**
 * Transform Image
 */
exports.transformImage = functions.storage
  .object('events/{photographer}/{id}/originals')
  .onChange(imageModule.transformImageHandler);
