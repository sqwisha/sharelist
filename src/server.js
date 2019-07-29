const express = require('express');
const app = express();
const path = require('path');
const port = 5000;
const bodyParser = require('body-parser');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, 'client/build')));
require('./routes')(app);
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

app.listen(port, () => console.log(`Server listening on port ${port}`));
