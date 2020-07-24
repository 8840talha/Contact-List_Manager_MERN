var dotenv = require("dotenv");
dotenv.config({ path: "./config/config.env" });
var path = require("path");
var express = require("express");
var app = express();
const contacts = require("./routes/contacts");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const mongoose = require("mongoose");

var cors = require("cors");
app.use(cors());
app.options('*', cors());
const Url = `${process.env.SRV}`;
mongoose.connect(
  Url,
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
  },
  () => {
    console.log("connected");
  }
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use(morgan("dev"));

app.use("/api/contact", contacts);
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} `);
});
