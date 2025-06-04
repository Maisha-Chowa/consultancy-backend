import express from "express";
import cors from "cors";
import { userRoutes } from "./app/modules/user/user.routes";
import adminRoutes from "./app/routes/admin.routes";

const app = express();

//cors
app.use(cors());

//parse json body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes
//app.use("/api/v1/auth", authRoutes);

app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);

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
