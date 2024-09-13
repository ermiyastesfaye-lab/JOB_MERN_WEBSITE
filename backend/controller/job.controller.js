const Application = require("../model/application.model");
const Job = require("../model/job.model");

const getJobs = async (req, res) => {
  try {
    const job = await Job.find({});
    res.status(200).json(job);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getJobById = async (req, res) => {
  try {
    const { id } = req.params;
    const job = await Job.findById(id);
    res.status(200).json(job);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createJob = async (req, res) => {
  try {
    const job = await Job.create(req.body);
    res.status(200).json(job);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateJob = async (req, res) => {
  try {
    const { id } = req.params;
    const job = await Job.findByIdAndUpdate(id, req.body);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }
    const updatedJob = await Job.findById(id);
    res.status(200).json(updatedJob);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteJob = async (req, res) => {
  try {
    const { id } = req.params;
    await Application.deleteMany({ jobId: id });
    const job = await Job.findByIdAndDelete(id);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }
    res.status(200).json({ message: "Job deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getJobs,
  getJobById,
  createJob,
  updateJob,
  deleteJob,
};
