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

  async index(request: Request, response: Response) {
    const getPointsQuerySchema = z.object({
      city: z.string().optional(),
      uf: z.string().optional(),
      items: z.string().optional(),
    });

    const { city, uf, items } = getPointsQuerySchema.parse(request.query);

    const parsedItems = items?.split(',')
      .map(item => Number(item.trim()))

    const points = await prisma.point.findMany({
      where: {
        city,
        uf,
        PointItem: {
          some: {
            item_id: {
              in: parsedItems,
            }
          }
        }
      }
    })

    return response.json(points)
  }

  async show(request: Request, response: Response) {
    const getPointParamsSchema = z.object({
      id: z.string().uuid(),
    });

    const { id } = getPointParamsSchema.parse(request.params);

    const point = await prisma.point.findFirst({
      where: {
        id
      }
    })

    if (!point) {
      return response.status(400).json({
        error: true,
        message: 'Point not found!'
      })
    }

    const item = await prisma.item.findMany({
      where: {
        PointItem: {
          some: {
            point_id: id
          }
        }
      },
      select: {
        title: true
      }
    })

    return response.json({
      point,
      item
    })
  }
}