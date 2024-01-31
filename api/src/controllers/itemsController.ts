import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export class ItemsController {
  async index(request: Request, response: Response) {
    const items = await prisma.item.findMany();

    const serializedItems = items.map(item => {
      return {
        title: item.title,
        image_url: `http://localhost:3333/uploads/${item.image}`
      }
    })

    return response.json(serializedItems)
  }
}