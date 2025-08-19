import fastifySwagger from "@fastify/swagger";
import {
  validatorCompiler,
  serializerCompiler,
  type ZodTypeProvider,
  jsonSchemaTransform,
} from "fastify-type-provider-zod";
import fastify from "fastify";
import { createCourseRoute } from "./src/routes/create-course.ts";
import { getCourseByIdRoute } from "./src/routes/get-courses-by-id.ts";
import { getCoursesRoute } from "./src/routes/get-courses.ts";
import { deleteCourseByIdRoute } from "./src/routes/delete-course-by-id.ts";
import scalarAPIReference from "@scalar/fastify-api-reference";

const server = fastify({
  logger: {
    transport: {
      target: "pino-pretty",
      options: {
        translateTime: "HH:MM:ss Z",
        ignore: "pid,hostname",
      },
    },
  },
}).withTypeProvider<ZodTypeProvider>();

server.register(fastifySwagger, {
  openapi: {
    info: {
      title: "Desafio node.js",
      version: "1.0.0",
    },
  },
  transform: jsonSchemaTransform,
});

if (process.env.NODE_ENV === "development") {
  server.register(scalarAPIReference, {
    routePrefix: "/docs",
  });

  server.register(createCourseRoute);
  server.register(getCourseByIdRoute);
  server.register(getCoursesRoute);
  server.register(deleteCourseByIdRoute);

  server.setSerializerCompiler(serializerCompiler); //
  server.setValidatorCompiler(validatorCompiler); //checagem nos dados de entradam por exemplo: se o titulo e uma string
}

server.listen({ port: 3333 }).then(() => {
  console.log("Server is running on http://localhost:3333");
});
