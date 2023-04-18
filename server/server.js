const express = require("express");
const app = express();
const fs = require("fs");

app.get('/api-test', (req, res) => {
  res.send({ message: 'API WORKS!' });
});

app.get('/getCatFact', async (req, res) => {
  const response = await fetch('https://catfact.ninja/fact');
  const responseJSON = await response.json();
  res.send(responseJSON);
});

const port = 8000;
app.listen(port, () => console.log(`Listening on port ${port}...`));