const fetch = require('node-fetch');

module.exports = (app) => {
  app.get('/api/list_items', (req, res) => {
    // TODO will eventually be call to DB
    fetch('https://jsonplaceholder.typicode.com/todos?_limit=5')
    .then(res => res.json())
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res.redirect('/error');
    });
  });
};
