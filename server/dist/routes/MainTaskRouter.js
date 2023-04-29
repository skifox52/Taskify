import { Router } from "express";
import { getAllMainTasks, createMainTask, putMainTask, deleteMainTask, } from "../controllers/mainTaskController.js";
const mainTaskRouter = Router();
mainTaskRouter
    .get("/", getAllMainTasks)
    .post("/", createMainTask)
    .put("/:id", putMainTask)
    .delete("/:id", deleteMainTask);
export default mainTaskRouter;
