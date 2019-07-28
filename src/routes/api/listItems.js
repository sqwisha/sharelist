const fetch = require('node-fetch');
const uuid = require('uuid/v4');
const firebase = require('firebase');
firebase.initializeApp({
  apiKey: process.env.FIREBASE_API,
  authDomain: 'sharelist-f0e76.firebaseapp.com',
  databaseURL: 'https://sharelist-f0e76.firebaseio.com',
  projectId: 'sharelist-f0e76',
  storageBucket: '',
  messagingSenderId: '714915154334',
  appId: '1:714915154334:web:4edd3c1a6193abaf'
});
const database = firebase.database();
const listItemsRef = database.ref('listItems');

module.exports = (app) => {
  app.get('/api/list_items', (req, res) => {
    listItemsRef
      .once('value')
      .then((snapshot) => {
        const listItems = snapshot.toJSON();
        res.json(listItems);
      })
      .catch((err) => {
        res.redirect('/error');
      });
  });

  app.post('/api/list_items/add', (req, res) => {
    const newListItem = {
      id: uuid(),
      title: req.body.newListItem,
      completed: false
    };

    listItemsRef.push(newListItem);
  });
};
