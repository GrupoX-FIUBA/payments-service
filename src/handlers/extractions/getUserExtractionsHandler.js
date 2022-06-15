const Extraction = require("../../models/extraction").Extraction;

function schema() {
  return {
    description: "Get all user extractions information",
    tags: ["Extraction"],
    params: {
      type: "object",
      properties: {
        user_id: {
          type: "string",
        },
      },
    },
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
      where: {
        user_id: req.params.user_id,
      },
      offset: req.query.offset,
      limit: req.query.limit,
    });
    return reply.code(200).send(rows);
  };
}

module.exports = { handler, schema };
