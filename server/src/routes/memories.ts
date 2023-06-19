import {FastifyInstance} from 'fastify'
import {prisma} from '../lib/prisma'


/**
 * Route handler for '/users' endpoint.
 *
 * @param {FastifyInstance} app - The Fastify instance.
 * @returns {Promise<any>} The response containing the users data.
 */

export async function memoriesRoutes(app: FastifyInstance) {

  app.get('/users', async () => {
    
    const users = await prisma.user.findMany();
    
    return users;
  });
}

