const express = require("express");
const dotenv = require("dotenv");
const dbConnect = require("./config/dbConnect");
const userRoute = require("./routes/users/usersRoute");
const { errorHandler, notFound } = require("./middlewares/errorMiddleware");

const app = express();
//env
dotenv.config();
//dbcoinnnect is a function that connects to the database
dbConnect();

//middlewares
app.use(express.json());

//routes
app.use("/api/users", userRoute);

//error handler middleware
app.use(notFound);
app.use(errorHandler);

module.exports = app;
