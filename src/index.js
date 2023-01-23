const express = require("express");
const mongoose = require("mongoose");
const port = process.env.PORT || 3000;
const route = require("./routes/route");
mongoose.set("strictQuery", true);
const app = express();

app.use(express.json());

mongoose
  .connect(
    "mongodb+srv://Chetan_ProjectClustor:PNr1Fn8OcRu2cGmk@project1.h4p8xqh.mongodb.net/group13Database",
    { useNewUrlParser: true }
  )
  .then(() => {
    console.log("BatsyDB is connected");
  })
  .catch((err) => {
    console.log(err.message);
  });

app.use("/", route);

app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});
