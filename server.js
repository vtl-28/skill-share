const express = require("express");
const connectDB = require("./config/db");
const dotenv = require("dotenv");
const userRoutes = require("./routes/userRoutes");
const talkRoutes = require("./routes/talkRoutes");
const { notFound, errorHandler } = require("./middlewares/errorMiddleware");
const path = require("path");
const cors = require("cors");

const PORT = process.env.PORT || 3001;
const app = express();
dotenv.config();
connectDB();

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(
    express.urlencoded({
      extended: true,
    })
  ); // to accept json data

app.use('/api/user',userRoutes);
app.use('/api/talks',talkRoutes);

// Error Handling middlewares
app.use(notFound);
app.use(errorHandler);



app.listen(
  PORT,
  console.log(`Server running on PORT ${PORT}...`.yellow.bold)
);