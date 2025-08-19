import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { db } from "../database/client.ts";
import { courses } from "../database/schema.ts";
import { eq } from "drizzle-orm";
import z from "zod";

export const deleteCourseByIdRoute: FastifyPluginAsyncZod = async (server) => {
  server.delete(
    "/courses/:id",
    {
      schema: {
        tags: ["courses"],
        summary: "delete a course by id",
        description: "this route delete a course by id",
        params: z.object({
          id: z.uuid(),
        }),
        response: {
          200: z.null().describe("Course deleted sucessfully"),
        },
      },
    },
    async (request, reply) => {
      const courseId = request.params.id;

      await db.delete(courses).where(eq(courses.id, courseId)).returning();

      return reply.status(200).send();
    }
  );
};
