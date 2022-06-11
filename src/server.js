const config = require("./config");
const services = require("./services/services")({ config });
const routes = require("./routes");
const db = require("./db/db");

// Require the framework and instantiate it
const fastify = require("fastify")({ logger: true });

fastify.register(require("fastify-swagger"), {
  routePrefix: "/docs",
  exposeRoute: true,
  swagger: {
    info: {
      title: "Payments Service",
      description: "Payments service API Documentation",
      version: "0.1.0",
    },

    externalDocs: {
      url: "https://github.com/GrupoX-FIUBA/payments-service",
      description: "Find more info here",
    },
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
