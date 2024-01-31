import { Router } from "express";

import { ItemsController } from "./controllers/itemsController";

export const routes = Router();

const itemsController = new ItemsController();

routes.get('/items', itemsController.index);