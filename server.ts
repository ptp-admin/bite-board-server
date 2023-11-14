require('dotenv').config();

const express = require('express');
const db = require('./utils/database');
const app = express();
const ingredientsRouter = require('./controllers/ingredients');
const shoppingListsRouter = require('./controllers/shoppingLists');

import { recipesRouter } from "./controllers/recipes";

const port = process.env.PORT;

app.use(express.json());
app.use(express.static('build'));

app.use('/ingredients', ingredientsRouter);
app.use('/recipes', recipesRouter);
app.use('/shopping-lists', shoppingListsRouter);

app.listen(port, () => {
  console.log(`Server started. Listening on port ${port}`);
});

export {};
