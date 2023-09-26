const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const cors = require("cors");
require("dotenv").config();
const app = express();
const fileRoutes = require("./routes/fileRoutes");

const MONGO_URI = process.env.MONGO_URI;

app.use(cors());
app.use(express.json());
app.use("/", fileRoutes);

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error(err));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

app.post("/upload", upload.array("files"), (req, res) => {
  const uploadFiles = req.files;

  const fileDetails = uploadFiles.map((file) => ({
    name: file.originalname,
    size: file.size,
    createdAt: new Date(),
  }));

  res.json(fileDetails);
});

app.listen(3001, () => console.log(`Server started at PORT 3001`));
