const express = require("express");
const app = express();
const path = require('path');

app.use(express.static(path.join(__dirname, '../build')));

app.get('/api-test', (req, res) => {
  res.send({ message: 'API WORKS!' });
});

app.get('/getCatFact', async (req, res) => {
  const response = await fetch('https://catfact.ninja/fact');
  const responseJSON = await response.json();
  res.send(responseJSON);
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));