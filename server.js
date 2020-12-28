const express = require('express');
const nunjucks = require('nunjucks');
const routes = require('./routes');
const server = express();
const methodOverride = require('method-override');

// funcionamento do req.body
server.use(express.urlencoded({ extended: true }));
// configurando o estilo --> usar arquivos estáticos
server.use(express.static('public'));
server.use(methodOverride('_method'));
server.use(routes);

// Configurando a template engine
server.set('view engine', 'njk');
nunjucks.configure('views', {
  express: server,
});

server.listen(3333, function () {
  console.log('Server is running');
});
