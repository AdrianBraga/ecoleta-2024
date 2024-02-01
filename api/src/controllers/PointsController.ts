import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { z } from 'zod';

const prisma = new PrismaClient();

export class PointsController {
  async create(request: Request, response: Response) {
    const createPointBodySchema = z.object({
      image: z.string(),
      name: z.string(),
      email: z.string(),
      whatsapp: z.string(),
      latitude: z.number(),
      longitude: z.number(),
      city: z.string(),
      uf: z.string(),
      items: z.array(z.number())
    });

    const {
      image,
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf,
      items
    } = createPointBodySchema.parse(request.body)

    const { id } = await prisma.point.create({
      data: {
        image: 'image-fake',
        name,
        email,
        whatsapp,
        latitude,
        longitude,
        city,
        uf
      }
    });

    const pointItem = items
      .map((item_id: number) => {
        return {
          item_id,
          point_id: id
        }
      })

    await prisma.pointItem.createMany({
      data: pointItem
    });

    return response.status(201).send();
  }
}