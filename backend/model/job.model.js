const mongoose = require("mongoose");

const JobSchema = mongoose.Schema(
  {
    jobCreator: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    jobTitle: {
      type: String,
      required: true,
    },
    jobCategory: {
      type: String,
      required: true,
    },
    jobCompany: {
      type: String,
      required: true,
    },
    jobLocation: {
      type: String,
      required: true,
    },
    jobType: {
      type: String,
      enum: ["Full-time", "Part-time", "Contract", "Internship"],
      required: true,
    },
    jobDescription: {
      type: String,
      required: true,
    },
    jobQualification: {
      type: String,
      required: true,
    },
    jobSalary: {
      type: String,
      required: true,
    },
    jobDeadline: {
      type: String,
      required: true,
    },
    jobStatus: {
      type: String,
      enum: ["Open", "Closed"],
      default: "Open",
    },
  },
  {
    timestamps: true,
  }
);

const Job = mongoose.model("Job", JobSchema);
module.exports = Job;
