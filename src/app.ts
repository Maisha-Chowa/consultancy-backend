import express from "express";
import cors from "cors";

const app = express();

//cors
app.use(cors());

//parse json body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes
//app.use("/api/v1/auth", authRoutes);

//cookie parser

app.use("/test", (req, res) => {
  res.status(200).json({
    message: "server is running.....",
  });
});
//schedule to run every minute
//global error handler
//handle not found route

export default app;
