const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const authRoutes = require("./routes/auth.routes")
const usersRoutes = require("./routes/users.routes")
const postsRoutes = require("./routes/posts.routes")
const categoryRoutes = require("./routes/categories.routes")
const multer = require("multer")

//DB
require("./db")

//Middlewares
app.use(express.json())

const storage = multer.diskStorage({
   destination: (req, file, cb) => {
      cb(null, "images");
   },
   filename: (req, file, cb) => {
      cb(null, req.body.name);
   },
});

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
   res.status(200).json("File has been uploaded");
});


//Routes
app.use("/api/auth", authRoutes)
app.use("/api/users", usersRoutes)
app.use("/api/posts", postsRoutes)
app.use("/api/category", categoryRoutes)

app.listen(port, () => console.log(`Example app listening on port port!`))