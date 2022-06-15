const Extraction = require("../../models/extraction").Extraction;

function schema() {
  return {
    description: "Get all extractions information",
    tags: ["Extraction"],
    query: {
      type: "object",
      properties: {
        offset: {
          type: "integer",
          default: 0,
        },
        limit: {
          type: "integer",
          default: 100,
        },
      },
    },
  };
}

function handler({ walletService }) {
  return async function (req, reply) {
    const { count, rows } = await Extraction.findAndCountAll({
      offset: req.query.offset,
      limit: req.query.limit,
    });
    return reply.code(200).send(rows);
  };
}

module.exports = { handler, schema };
