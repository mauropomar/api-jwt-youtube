import { Router } from "express";
import {
    getAll
} from "../controllers/index.js";

// rutes
const router = Router();

router.get("/", getAll);

export default router;