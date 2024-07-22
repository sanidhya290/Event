import express from "express";
import dbConnection from "./server.js";
import dotenv from "dotenv"
import EmpRouter from "./Router/employeeRouter.js";
import cors from "cors"
const app = express();
dotenv.config();
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const PORT=process.env.PORT||4000
app.listen(PORT, () => {
  console.log("App is running on port 4000");
}); 
app.use("/api/v1/employee",EmpRouter);
dbConnection();
export default app;
