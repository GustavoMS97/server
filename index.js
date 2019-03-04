const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send({ bye: 'buddy' });
});

//Realiza a busca da porta que o NodeJS ira usar dinamicamente
//Funciona apenas em Produção, em desenvolvimento usa a porta normal.
const PORT = process.env.PORT || 5000;
app.listen(PORT);

//http://localhost:5000
