const express = require("express");
const mongoose = require("mongoose");
const usersRouter = require("./routes/users");
const cardsRouter = require("./routes/cards");
const app = express();

mongoose.connect("mongodb://localhost:27017/mestodb");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/users", usersRouter);
app.use("/cards", cardsRouter);

app.use((req, res, next) => {
  req.user = {
    _id: "614e635d5d49c0be87077a6c",
  };

  next();
});

app.listen(3000);
