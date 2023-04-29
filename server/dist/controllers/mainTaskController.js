import expressAsyncHandler from "express-async-handler";
import MainTaskModel from "../models/MainTaskModel.js";
import SubTaskModel from "../models/SubTaskModel.js";
//Get all main tasks
export const getAllMainTasks = expressAsyncHandler(async (req, res) => {
    try {
        const allTasks = await MainTaskModel.find({}).populate("subTasks");
        res.status(200).json(allTasks);
    }
    catch (error) {
        res.status(400);
        throw new Error(error);
    }
});
//POST main task
export const createMainTask = expressAsyncHandler(async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) {
            throw new Error("Empty fields!");
        }
        await MainTaskModel.create({ name });
        res.status(201).json("Main task created successfully!");
    }
    catch (error) {
        res.status(400);
        throw new Error(error);
    }
});
//PUT main task
export const putMainTask = expressAsyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;
        if (!name) {
            throw new Error("Empty fields!");
        }
        await MainTaskModel.findByIdAndUpdate(id, { name });
        res.status(202).json(`Task [${id}] has been updated successfully!`);
    }
    catch (error) {
        res.status(400);
        throw new Error(error);
    }
});
//Delete a task
export const deleteMainTask = expressAsyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const mainTask = (await MainTaskModel.findById(id));
        mainTask?.subTasks?.length > 0 &&
            mainTask.subTasks.forEach(async (main) => await SubTaskModel.findByIdAndDelete(main._id));
        await MainTaskModel.findByIdAndDelete(id);
        res.status(200).json(`Task [${id}] has been deleted successfully!`);
    }
    catch (error) {
        res.status(400);
        throw new Error(error);
    }
});
