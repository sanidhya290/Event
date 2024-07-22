import express from "express"
import { addEmployee ,allEmployee,deleteEmployee, searchEmployee} from "../Controller/empController.js"
const route =express.Router()
route.post("/add",addEmployee)
route.get("/all",allEmployee)
route.delete("/delete/:id",deleteEmployee)
route.get("/search",searchEmployee)
export default route;    