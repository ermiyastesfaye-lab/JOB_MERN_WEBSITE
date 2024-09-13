const Application = require("../model/application.model");

const getApplication = async (req, res) => {
  try {
    const application = await Application.find({});
    res.status(200).json(application);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getApplicationById = async (req, res) => {
  try {
    const { id } = req.params;
    const application = await Application.findById(id);
    res.status(200).json(application);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createApplication = async (req, res) => {
  console.log("Request Headers:", req.headers);
  console.log("Uploaded File:", req.file);
  console.log("Request Body:", req.body);
  const file = req.file;
  const applicationData = {
    ...req.body,
    applicantResume: file.filename,
  };
  try {
    const application = await Application.create(applicationData);
    res.status(200).json(application);
  } catch (err) {
    console.log("Error: ", err);
    res.status(500).json({ message: err.message });
  }
};

const updatedApplication = async (req, res) => {
  console.log("Request Headers:", req.headers);
  console.log("Uploaded File:", req.file);
  console.log("Request Body:", req.body);
  const file = req.file;
  const applicationData = file
    ? {
        ...req.body,
        applicantResume: file.filename,
      }
    : req.body;
  try {
    const { id } = req.params;
    const application = await Application.findByIdAndUpdate(
      id,
      applicationData
    );
    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }
    const updatedApplication = await Application.findById(id);
    res.status(200).json(updatedApplication);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteApplication = async (req, res) => {
  try {
    const { id } = req.params;
    const application = await Application.findByIdAndDelete(id);
    if (!application) {
      res.status(404).json({ message: "Application not found" });
    }
    res.status(200).json({ message: "Application deleted successfully!" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getApplication,
  getApplicationById,
  createApplication,
  updatedApplication,
  deleteApplication,
};
