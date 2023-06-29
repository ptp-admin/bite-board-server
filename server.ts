require('dotenv').config();

const express = require('express');
const db = require('./utils/database');
const app = express();
const ingredientsRouter = require('./controllers/ingredients');
const recipesRouter = require('./controllers/recipes');
const shoppingListRouter = require('./controllers/shoppingLists');

const port = process.env.PORT;

app.use(express.json());
app.use(express.static('build'));

app.use('/ingredients', ingredientsRouter);
app.use('/recipes', recipesRouter);
app.use('/shoppingList', shoppingListRouter);

app.listen(port, () => {
  console.log(`Server started. Listening on port ${port}`);
});

export {};
