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

    await prisma.point.create({
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

    return response.status(201).send();
  }
}