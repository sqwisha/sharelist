const express = require('express');
const app = express();
const port = 5000;
const bodyParser = require('body-parser');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

require('./routes')(app);

app.get('/', (req, res) => {
  res.send('PORT 5000');
});

app.listen(port, () => console.log(`Server listening on port ${port}`));
