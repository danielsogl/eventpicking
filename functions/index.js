const functions = require('firebase-functions');

const cleanDatabaseModule = require('./clean-db');
const cleanStorageModule = require('./clean-storage');
const transformImagesModule = require('./transform-image');

exports.transformImage = functions.storage
  .object('events/{event}/{photographer}/originals/{file}')
  .onChange(transformImagesModule.transformImageHandler);
