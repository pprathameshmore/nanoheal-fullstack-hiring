module.exports = (app) => {
  const config = require("../configs/index");
  const express = require("express");
  const path = require("path");
  const cors = require("cors");
  const { graphqlHTTP } = require("express-graphql");
  const errorHandler = require("../api/middlewares/error-handler");
  const apiRouter = require("../api/routes/index");
  const schema = require("../graphql/schema");

  require("./logger")(app);

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static(path.join(__dirname, "public")));

  app.use(cors());

  //GraphQL
  app.use(
    "/graphql",
    graphqlHTTP({
      schema,
      graphiql: true,
      pretty: true,
      customFormatErrorFn: (error) => ({
        message: error.message,
        status: error.stack,
      }),
    })
  );

  //API Routes
  app.use(`/${config.API_PREFIX}`, apiRouter);
  app.use(errorHandler);
};
