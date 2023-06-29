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

shoppingListRouter.post('/', async (req: any, res: any) => {
  // create a shopping list here
});

shoppingListRouter.put('/:id', async (req: any, res: any) => {
  // updating a shopping list here
});

shoppingListRouter.get('/', async (req: any, res: any) => {
  res.send('You got a shopping list!');
  // reading all shopping lists
});

shoppingListRouter.get('/:id', async (req: any, res: any) => {
  // reading a shopping list
});

shoppingListRouter.delete('/:id', async (req: any, res: any) => {
  // deleting a shopping list
});

module.exports = shoppingListRouter;
export {};
