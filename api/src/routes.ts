import { Router, Response } from "express";

export const routes = Router();

routes.get('/', async (req, res: Response) => {
  return res.json({
    project: 'Nlw Ecoleta',
    Dev: 'Adrian'
  })
});