const express = require('express');
const routes = express.Router();

routes.get('/', function (req, res) {
  return res.redirect('/instructors');
});

routes.get('/instructors', function (req, res) {
  return res.render('instructors/index');
});

routes.get('/members', function (req, res) {
  return res.send('members');
});

module.exports = routes;

/*server.get('/', function (req, res) {
  return res.render('initialPage', { recipes: recipesList });
});

server.get('/sobre', function (req, res) {
  return res.render('about');
});

server.get('/receitas', function (req, res) {
  return res.render('recipes', { recipes: recipesList });
});

server.get('/receitas/:index', function (req, res) {
  const recipes = recipesList; // Array de receitas carregadas do data.js
  const recipeIndex = req.params.index;

  if (recipeIndex >= recipes.length) {
    return res.status(404).render('not-found');
  }

  return res.render('recipe', { recipe: recipes[recipeIndex] });
});

server.use(function (req, res) {
  res.status(404).render('not-found');
});
*/
