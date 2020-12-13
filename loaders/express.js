const bodyParser = require("body-parser");
routes = require("../api-routes");
cors = require("cors");
passport = require("passport");
const { errors, isCelebrateError} = require('celebrate');

module.exports = (app) => {
  // Passport middleware
  app.use(passport.initialize());
  app.use(errors())

  // Passport config
  require("../config/passport")(passport);

  app.get("/status", (req, res) => {
    res.status(200).end();
  });
  app.head("/status", (req, res) => {
    res.status(200).end();
  });

  app.use(cors());
  // Some sauce that always add since 2014
  // "Lets you use HTTP verbs such as PUT or DELETE in places where the client doesn't support it."
  // Maybe not needed anymore ?
  //   app.use(require("method-override")());
  // Middleware that transforms the raw string of req.body into json
  app.use(bodyParser.json());
  // Load API routes
  app.use(config.api.prefix, routes());

  //JOI Celebrate error Handler
app.use((error, req, res, next) => {
  if (isCelebrateError(error) ) {
    console.log(error)
    return res.status(400).json({error: error});
  }
  return res.status(500).send(error)
});

  // / catch 404 and forward to error handler
  /*
app.use((req, res, next) => {
   const err = new Error("Not Found");
   err["status"] = 404;
   next(err);
});




  // / error handlers
app.use((err, req, res, next) => {
    if (err.name === "UnauthorizedError") {
      return res
          .status(err.status)
          .send({message: err.message})
          .end();
    }
    return next(err);
  });
app.use((err, req, res, next) => {
   res.status(err.status || 500);
   res.json({
     errors: {
     message: err.message,
     },
   });
 });
 */
};

