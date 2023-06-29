const shoppingListRouter = require('express').Router();
const db = require('../utils/database');

interface DbShoppingList {
  id: number;
  name: string;
  created_at: string;
}

interface ShoppingList {
  id: number;
  name: string;
  createdAt: string; // TODO maybe convert into a timestamp?
}

shoppingListRouter.get('/', async (req: any, res: any) => {
  res.send('You got a shopping list!');
});

module.exports = shoppingListRouter;
export {};
