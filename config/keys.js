//Validar as chaves que devem ser retornadas,
//produção ou desenvolvimento.

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./prod');
} else {
  module.exports = require('./dev');
}
