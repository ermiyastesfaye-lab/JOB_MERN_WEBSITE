const { application } = require("express");
const mongoose = require("mongoose");

const ApplicationSchema = mongoose.Schema(
  {
    applicant: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Job",
    },
    applicantName: {
      type: String,
      required: true,
    },
    applicantEmail: {
      type: String,
      required: true,
      match: /.+\@.+\..+/,
    },
    applicantPhoneNumber: {
      type: Number,
      required: true,
      unique: true,
    },
    applicantResume: {
      type: String,
      required: true,
      validate: {
        validator: function (v) {
          return (
            v.endsWith(".pdf") || v.endsWith(".docx") || v.endsWith(".doc")
          );
        },
        message: (props) => `${props.value} is not valid pdf file`,
      },
    },
    applicantCoverLetter: {
      type: String,
    },
    applicationDate: {
      type: Date,
      default: Date.now,
    },
    applicationStatus: {
      type: String,
      enum: ["Pending", "Rejected", "Accepted"],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

const Application = mongoose.model("Application", ApplicationSchema);
module.exports = Application;
