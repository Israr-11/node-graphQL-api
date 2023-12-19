const express = require("express");
const dbConnection = require("./dBConnection/connection");
const userRoutes = require("./Routes/routeGraphQL");

dbConnection(); //Calling the MongodB connection
const app = express();

app.use("/users", userRoutes);
const port = process.env.PORT || 5000;
app.listen(() => {
  console.log(`Server is listening at port ${port}`);
});
