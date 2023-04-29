import expressAsyncHandler from "express-async-handler";
import MainTaskModel from "../models/MainTaskModel.js";
import SubTaskModel from "../models/SubTaskModel.js";
import { Types } from "mongoose";
// POST subtask
export const addSubTask = expressAsyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const { content, status } = req.body;
        if (!content || !status) {
            throw new Error("Empty fields!");
        }
        const newSubTask = await SubTaskModel.create({ content, status });
        const mainTask = (await MainTaskModel.findById(id));
        mainTask.subTasks.push(new Types.ObjectId(newSubTask._id));
        await mainTask.save();
        res.status(200).json("Subtask created successfully!");
    }
    catch (error) {
        res.status(400);
        throw new Error(error);
    }
});
// GET subtasks
export const getSubTasks = expressAsyncHandler(async (req, res) => {
    try {
        const subtasks = await SubTaskModel.find({});
        res.status(200).json(subtasks);
    }
    catch (error) {
        res.status(400);
        throw new Error(error);
    }
});
//PUT subtasks
export const putSubTask = expressAsyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        await SubTaskModel.findByIdAndUpdate(id, req.body);
        res.status(201).json(`Task [${id}] updated successfully!`);
    }
    catch (error) {
        res.status(400);
        throw new Error(error);
    }
});
//DELETE subtask
export const deleteSubTask = expressAsyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        await MainTaskModel.findOneAndUpdate({ subTasks: { $in: [id] } }, { $pull: { subTasks: id } });
        await SubTaskModel.findByIdAndDelete(id);
        res.status(200).json(`Subtask [${id}] deleted successfully!`);
    }
    catch (error) {
        res.status(400);
        throw new Error(error);
    }
});
