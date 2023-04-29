import express from "express";
import { connect } from "mongoose";
import "dotenv/config";
import compression from "compression";
import ErrorHandler from "./middleware/ErrorHandler.js";
import mainTaskRouter from "./routes/MainTaskRouter.js";
import subTaskRouter from "./routes/SubTaskRouter.js";
import cors from "cors";
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(compression());
app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}));
//Routes
app.use("/main", mainTaskRouter);
app.use("/sub", subTaskRouter);
app.use("/*", (req, res) => {
    res.status(404).json("Not found!");
});
app.use(ErrorHandler);
connect(process.env.MONGO_URI).then(() => {
    app.listen(process.env.PORT, () => console.log(`App running at port ${process.env.PORT}`));
});
