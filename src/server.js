const config = require("./config");
const services = require("./services/services")({ config });
const routes = require("./routes");
const auth = require("./handlers/authHandlers");
const db = require("./db/db");

const tracer = require("dd-trace");
if (process.env.NODE_ENV === "prod") {
  tracer.init();
}

// Require the framework and instantiate it
const fastify = require("fastify")({ logger: true });

fastify.addHook("preHandler", auth.userAuthentication);

fastify.register(require("fastify-swagger"), {
  routePrefix: "/docs",
  exposeRoute: true,
  openapi: {
    info: {
      title: "Payments Service",
      description: "Payments service API Documentation",
      version: "0.1.0",
    },

    externalDocs: {
      url: "https://github.com/GrupoX-FIUBA/payments-service",
      description: "Find more info here",
    },

    components: {
      securitySchemes: {
        APIKeyHeader: {
          type: "apiKey",
          name: "X-API-Key",
          in: "header",
        },
      },
    },

    security: [
      {
        APIKeyHeader: [],
      },
    ],
  },
});

const PORT = process.env.PORT || 8000;
const DEBUG = process.env.DEBUG || false;

// Declares routes
routes.forEach(route => fastify.route(route({ config, services })));

// Run the server!
const start = async () => {
  try {
    await db.init();
    await fastify.listen(PORT, "0.0.0.0");
    fastify.log.info(`server listening on ${fastify.server.address().port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
