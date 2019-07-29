const fetch = require('node-fetch');
const uuid = require('uuid/v4');
const firebase = require('../../Firebase');

const listItemsRef = firebase.database().ref('listItems');

module.exports = (app) => {
  app.post('/api/list_items/add', (req, res) => {
    const newListItem = {
      id: uuid(),
      userId: req.body.user,
      title: req.body.newListItem,
      purchased: false
    };

    listItemsRef.push(newListItem);
    res.send({ message: 'List item added' });
  });
};
