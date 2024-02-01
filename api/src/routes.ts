import { Router } from "express";

import { ItemsController } from "./controllers/itemsController";
import { PointsController } from "./controllers/PointsController";

export const routes = Router();

const itemsController = new ItemsController();
const pointsController = new PointsController();

routes.get('/items', itemsController.index);

routes.post('/points', pointsController.create);