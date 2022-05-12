const express = require("express");

const db = require("./db");

const app = express();

app.use(express.json());

app.use("/users",require("./services/users/controller"))

const port = 8080;

app.listen(port, () => {
  console.log(`server running at http://localhost:${port}`);
});
