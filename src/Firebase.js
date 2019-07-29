var firebase = require('firebase/app');
require('firebase/auth');
require('firebase/database');

firebase.initializeApp({
  apiKey: 'AIzaSyBzhTsNeHDSPGIx1ZLdDeoIFhtircpmS3A',
  authDomain: 'sharelist-f0e76.firebaseapp.com',
  databaseURL: 'https://sharelist-f0e76.firebaseio.com',
  projectId: 'sharelist-f0e76',
  storageBucket: '',
  messagingSenderId: '714915154334',
  appId: '1:714915154334:web:4edd3c1a6193abaf'
});

module.exports = firebase;
