import express from "express";
import { routes } from "./files/data.js";
import { errorHandler } from "../middleware/errorHandler.js";

export const app = express();

app.use(express.json());
app.use("/files", routes);

app.use(errorHandler);
