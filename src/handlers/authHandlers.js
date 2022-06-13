const userAuthentication = (request, reply, done) => {
  // Handle authentication
  if (!request.url.startsWith("/docs")) {
    if (request.headers["x-api-key"] == process.env.PAYMENTS_SERVICE_API_KEY) {
    } else {
      reply.code(401).send({ detail: "Permission denied" });
    }
  }
  done();
};

module.exports = { userAuthentication };
