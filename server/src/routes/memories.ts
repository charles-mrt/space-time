import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { prisma } from '../lib/prisma'


/**
 * Route handler for '/users' endpoint.
 *
 * @param {FastifyInstance} app - The Fastify instance.
 * @returns {Promise<any>} The response containing the users data.
 */

export async function memoriesRoutes(app: FastifyInstance) {

  /**
  * Retrieves all memories.
  */
  app.get('/memories', async () => {
    const memories = await prisma.memory.findMany({
      orderBy: {
        createdAt: 'asc',
      },
    })
    return memories.map((memory) => {
      return {
        id: memory.id,
        coverUrl: memory.coverUrl,
        excerpt: memory.content.substring(0, 115).concat('...'),
      }
    })
  });

  /**
  * Retrieves a specific memory by its ID.
  *
  * @param {Object} request - The request object containing the memory ID.
  * @returns {Promise<any>} The response containing the memory data.
  */
  app.get('/memories/:id', async (request) => {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    })
    const { id } = paramsSchema.parse(request.parms)

    const memory = await prisma.memory.findUniqueOrThrow({
      where: {
        id,
      },
    })
    return memory
  });

  /**
   * Creates a new memory.
   *
   * @param {Object} request - The request object containing the memory data.
   */
  app.post('/memories', async (request) => {
    const bodySchema = z.object({
      content: z.string(),
      coverUrl: z.string(),
      isPublic: z.coerce.boolean().default(false),
    })

    const { content, coverUrl, isPublic } = bodySchema.parse(request.body)

    const memory = await prisma.memory.create({
      data: {
        content,
        coverUrl,
        isPublic,
        userId: 'a9e5c508-2a19-47c7-97b5-cf342de5d78c'
      }
    })
  });


  /**
   * Updates a specific memory by its ID.
   *
   * @param {Object} request - The request object containing the memory ID and updated data.
   * @returns {Promise<any>} The response containing the updated memory data.
   */
  app.put('/memories/:id', async (request) => {

    const paramsSchema = z.object({
      id: z.string().uuid(),
    })

    const { id } = paramsSchema.parse(request.parms)

    const bodySchema = z.object({
      content: z.string(),
      coverUrl: z.string(),
      isPublic: z.coerce.boolean().default(false),
    })

    const { content, coverUrl, isPublic } = bodySchema.parse(request.body)

    const memory = await prisma.memory.update({
      where: {
        id,
      },
      data: {
        content,
        coverUrl,
        isPublic,
      },
    })
    return memory
  })

  
 /**
   * Deletes a specific memory by its ID.
   *
   * @param {Object} request - The request object containing the memory ID.
   */
  app.delete('/memories/:id', async (request) => {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    })
    const { id } = paramsSchema.parse(request.parms)

    await prisma.memory.delete({
      where: {
        id,
      },
    })
  });

}

