const mongoose = require('mongoose');
const express  = require('express');
const app = express();

const port = 8000;
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user')
const cors = require("cors"); 

app.use(cors());
app.use(express.json());
app.use("/auth", authRoutes);
app.use("/user", userRoutes);

app.listen(port, () => {
    console.log(`server listening at http://localhost:${port}`)
});

mongoose.connect('mongodb+srv://aalok2:1234@cluster0.89mnes1.mongodb.net/', { useNewUrlParser: true, useUnifiedTopology: true, dbName: "NoteTaking-Db" });