const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
require('./models/User');
require('./services/passport');

const app = express();

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);
app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(keys.mongoURI, { useNewUrlParser: true });
//mongoose.Promise = global.Promise;
mongoose.set('useFindAndModify', false);

require('./routes/authRoutes')(app);

//Realiza a busca da porta que o NodeJS ira usar dinamicamente
//Funciona apenas em Produção, em desenvolvimento usa a porta normal.
const PORT = process.env.PORT || 5000;
app.listen(PORT);
console.log();
