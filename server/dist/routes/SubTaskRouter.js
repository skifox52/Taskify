import { Router } from "express";
import { addSubTask, deleteSubTask, getSubTasks, putSubTask, } from "../controllers/subTaskController.js";
const subTaskRouter = Router();
subTaskRouter
    .get("/", getSubTasks)
    .post("/:id", addSubTask)
    .put("/:id", putSubTask)
    .delete("/:id", deleteSubTask);
export default subTaskRouter;
