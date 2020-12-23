const express = require('express');
const nunjucks = require('nunjucks');
const routes = require('./routes');

const server = express();

// configurando o estilo --> usar arquivos estáticos
server.use(express.static('public'));
server.use(routes);
// Configurando a template engine
server.set('view engine', 'njk');
nunjucks.configure('views', {
  express: server,
});

server.listen(3333, function () {
  console.log('Server is running');
});
