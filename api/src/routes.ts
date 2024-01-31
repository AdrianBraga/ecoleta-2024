import { PrismaClient } from "@prisma/client";
import { Router, Response } from "express";

const prisma = new PrismaClient();

export const routes = Router();

routes.get('/', async (req, res: Response) => {
  const items = await prisma.item.findMany();

  return res.json({
    items
  })
});