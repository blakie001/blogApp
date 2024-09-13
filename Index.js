const express = require("express");
const dotenv = require("dotenv");
const { connectDb } = require("./config/db.connection");
const cors = require("cors");
const multer = require("multer")
const path = require("path");
const port = process.env.PORT || 3000;
const { client } = require("./config/elasticsearch");

const authRoutes = require("./routes/auth")
const userRoutes = require("./routes/user");
const postRoutes = require("./routes/post");
const catRoutes = require("./routes/category");
const searchRoutes = require("./routes/search");

dotenv.config();

const server = express();
connectDb();

server.use(express.json())
server.use(cors());

server.use(authRoutes.router)
server.use(userRoutes.router);
server.use(catRoutes.router);
server.use(searchRoutes.router);
server.use(postRoutes.router);




//multer

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, "images")
  },
  filename: (req, file, cb) => {
      // cb(null, `${Date.now()}-${path.extname(file.originalname)}`)
      cb(null, req.body.name)
  }
})
const upload = multer({storage: storage});

// server.use(express.urlencoded({extended: false}))
server.use("/images",express.static(path.join(__dirname,"/images")));

server.post("/api/upload", upload.single("file"),(req,res)=>{
  res.status(200).json("File has been uploaded");
})


  
server.listen(port, () => {
    console.log(`Server is Running...on ${port}`);
});