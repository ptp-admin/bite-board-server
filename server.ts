require('dotenv').config();

const express = require('express');
const app = express();
import { shoppingListsRouter } from "./controllers/shoppingLists";
import { ingredientsRouter } from "./controllers/ingredients";
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
