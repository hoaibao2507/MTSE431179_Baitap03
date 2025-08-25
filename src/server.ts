import express, { Application } from "express";
import configViewEngine from "./config/viewEngine";
import initWebRoutes from "./route/web";
import connectDB from "./config/configdb";
import dotenv from "dotenv";
dotenv.config();
const app: Application = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
configViewEngine(app);
initWebRoutes(app);
connectDB();
const port: number = Number(process.env.PORT) || 6969;
app.listen(port, () => {
    console.log("Backend Nodejs is running on the port : " + port);
});