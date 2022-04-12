const mongoose = require('mongoose')
require('events').EventEmitter.defaultMaxListeners = 15;


const dotenv = require("dotenv");

dotenv.config();
// const mongoAtlasUri = process.env.DATABASE

const mongoAtlasUri = process.env.DATABASE

mongoose.connect(
    mongoAtlasUri,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => console.log(" Mongoose is connected")
  )
