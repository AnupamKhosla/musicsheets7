// DO NOT DELETE COMMENTS
//WHole is being converted from commonJS to ESM
"use strict";
//var express = require('express');
//import express
import express from 'express';
import path from 'node:path';

import cors from "cors";
import "./loadEnvironment.mjs";
import "express-async-errors";
import db from "./db/conn.mjs";
console.log(db);



var PORT = process.env.PORT || 3000;
var app = express(),

// __dirname is path.resolve()
//publicDir = path.join(__dirname,'public');
publicDir = path.join(path.resolve(),'public');


app.use(cors());
app.use(express.static(publicDir));

app.use("/latest", async (req, res) => {
  let collection = await db.collection("posts");
  let results = await collection.aggregate([
    {"$project": {"author": 1, "title": 1, "tags": 1, "date": 1}},
    {"$sort": {"date": -1}},
    {"$limit": 3}
  ]).toArray();
  res.send(results).status(200);
});


app.use((err, _req, res, next) => {
  res.status(500).send("Uh oh! An unexpected error occured.")
})

// start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});

// app.listen(port);
// console.log("listen started");

//module.exports = app;
export default app;

///////////////////

// app.use(express.json());

// // Load the /posts routes
// app.use("/posts", posts);

// // Global error handling
// app.use((err, _req, res, next) => {
//   res.status(500).send("Uh oh! An unexpected error occured.")
// })

// // start the Express server
// app.listen(PORT, () => {
//   console.log(`Server is running on port: ${PORT}`);
// });