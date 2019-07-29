const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 5000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, 'client/build')));
require('./routes')(app);

if (process.env.NODE_ENV === 'production') {
  app.get('*', (req, res) => {
    res.sendFile(path.join((__dirname, 'client/build/index.html')));
  });
} else {
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/client/public/index.html'));
  });
}

app.listen(port, () => console.log(`Server listening on port ${port}`));
