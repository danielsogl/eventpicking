'use strict';
const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

// Function modules
const imageModule = require('./transform-image.js');
const eventModule = require('./events.js');

/**
 * Transform Image
 */
exports.transformImage = functions.storage
  .object('events/{photographer}/{eventID}')
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
