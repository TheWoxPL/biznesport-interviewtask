import express from "express";
import { getAllMessages } from "../controllers/messagesController.js";

const router = express.Router();

router.get("/", getAllMessages);

export default router;