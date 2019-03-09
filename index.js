const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('./config/keys');
require('./models/User');
require('./services/passport');

const app = express();

app.use(bodyParser.json());
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
require('./routes/billingRoutes')(app);

if (process.env.NODE_ENV === 'production') {
  //Express will serve up production assets
  //Like our main.js file, or main.css file.
  app.use(express.static('client/build'));
  //Express will serve up the index.html file
  //if it doesnt recognize the route
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    
  });
}

//Realiza a busca da porta que o NodeJS ira usar dinamicamente
//Funciona apenas em Produção, em desenvolvimento usa a porta normal.
const PORT = process.env.PORT || 5000;
app.listen(PORT);
