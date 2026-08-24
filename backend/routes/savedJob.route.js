import express from "express";

import { saveJob, getSavedJobs } from "../controllers/savedJob.controller.js";

import isAuthenticated from "../middlewares/isAuthenticated.js";

const router = express.Router();

router.route("/save/:jobId").post(isAuthenticated, saveJob);

router.route("/").get(isAuthenticated, getSavedJobs);

export default router;
