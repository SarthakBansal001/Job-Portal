import { SavedJob } from "../models/savedJob.model.js";

export const saveJob = async (req, res) => {
  try {
    const userId = req.id;
    const jobId = req.params.jobId;

    const alreadySaved = await SavedJob.findOne({
      user: userId,
      job: jobId,
    });

    if (alreadySaved) {
      return res.status(400).json({
        message: "Job already saved",
        success: false,
      });
    }

    await SavedJob.create({
      user: userId,
      job: jobId,
    });

    return res.status(201).json({
      message: "Job saved successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to save job",
      success: false,
    });
  }
};
export const getSavedJobs = async (req, res) => {
  try {
    const userId = req.id;

    const savedJobs = await SavedJob.find({ user: userId })
      .populate({
        path: "job",
        populate: {
          path: "company",
        },
      })
      .sort({ createdAt: -1 });

    return res.status(200).json({
      savedJobs,
      success: true,
    });
  } catch (error) {
    console.log("GET SAVED JOBS ERROR:", error);

    return res.status(500).json({
      message: "Failed to fetch saved jobs",
      success: false,
    });
  }
};
