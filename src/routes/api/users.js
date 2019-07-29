const fetch = require('node-fetch');
const firebase = require('../../Firebase');

module.exports = (app) => {
  app.post('/api/users/create', (req, res) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(req.body.email, req.body.password)
      .then((result) => {
        if (!result) {
          res.status(500).send({
            error: {
              message: 'There was a problem, please try again.'
            }
          });
        } else {
          res.send({ result });
        }
      })
      .catch((error) => {
        res.send({ error });
      });
  });

  app.post('/api/users/sign_in', (req, res) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(req.body.email, req.body.password)
      .then((result) => {
        if (!result) {
          res.status(500).send({
            error: {
              message: 'There was a problem, please try again.'
            }
          });
        } else {
          res.send({ result });
        }
      })
      .catch((error) => {
        res.send({ error });
      });
  });

  app.get('/api/users/logout', (req, res) => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        res.send({ message: 'logout successful' });
        console.log('logout success');
      });
  });
};
