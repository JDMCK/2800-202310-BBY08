const express = require("express");
const app = express();
const fs = require("fs");

app.get('/api-test', (req, res) => {
  res.send('API TEST WORKED!');
});

const port = 8000;
app.listen(port, () => console.log(`Listening on port ${port}...`));