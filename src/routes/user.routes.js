import { Router } from "express";
import {
    getAll
} from "../controllers/user.controllers.js";

// rutes
const router = Router();

router.get("/", getAll);

export default router;