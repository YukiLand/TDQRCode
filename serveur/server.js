require("dotenv").config();
const express = require("express"); // import express
let cors = require("cors");

const Users = require("./Users");

const { existsSync, readFileSync, writeFileSync } = require('fs');

const app = express(); // initialize express
app.use(express.json()); // use express json

// Connexion BDD

//if database.json does not exist, create it with an empty array
if (!existsSync('database.json')) {
    writeFileSync('database.json', JSON.stringify([]));
}

app.use("/users", Users); // main route and after the /users we add the route from the Users.js file

app.listen(8000, () => {
  console.log("Server started on port 8000");
});
