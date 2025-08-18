import fastify from "fastify";
import crypto from "node:crypto";

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
});

const courses = [
  {
    id: "1",
    title: "Introduction to Programming",
    description: "Learn the basics of programming using Python.",
  },
  {
    id: "2",
    title: "Web Development",
    description: "Build dynamic websites using HTML, CSS, and JavaScript.",
  },
  {
    id: "3",
    title: "Data Science",
    description: "Explore data analysis and machine learning techniques.",
  },
];

server.get("/courses", async (request, reply) => {
  return { courses };
});

server.get("/courses/:id", async (request, reply) => {
  type Params = {
    id: string;
  };

  const params = request.params as Params;
  const courseId = params.id;

  const course = courses.find((course) => course.id === courseId);

  if (course) {
    return { course };
  }

  return reply.status(404).send({ error: "Course not found" });
});

server.post("/courses", async (request, reply) => {
  type body = {
    title: string;
  };
  const courseId = crypto.randomUUID();
  const body = request.body as body;
  const courseTitle = body.title;

  if (!courseTitle) {
    return reply.status(400).send({ message: "Course title is required" });
  }

  courses.push({
    id: courseId,
    title: "New Course",
    description: "This is a new course.",
  });

  return reply.status(201).send({ courseId });
});

server.listen({ port: 3333 }).then(() => {
  console.log("Server is running on http://localhost:3333");
});
