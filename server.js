const express = require('express');
const app = express();
const port = 5000;

app.get('/api/list_items', (req, res) => {
  const listItems = [
    {id:1, title: 'get food'},
    {id:2, title: 'make food'},
    {id:3, title: 'eat food'}
  ];

  res.json(listItems);
});



app.listen(port, () => console.log(`Server listening on port ${port}`));
