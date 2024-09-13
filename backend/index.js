const express = require("express");
const app = express();
const mongoose = require("mongoose");
const userRoutes = require("./routes/user.route");
const jobRoutes = require("./routes/job.route");
const applicationRoutes = require("./routes/application.route");
const authRoutes = require("./routes/auth.route");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { requireAuth } = require("./middleware/auth.middleware");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/api/users", userRoutes);
app.use("/api/jobs", requireAuth, jobRoutes);

app.use("/api/applications", applicationRoutes);
app.use("/api", authRoutes);

mongoose
  .connect(
    "mongodb+srv://ermiyastesfaye16:mynameisermiyas@aau-jobs.rdhci.mongodb.net/AAU-Jobs?retryWrites=true&w=majority&appName=AAU-Jobs"
  )
  .then(() => {
    console.log("Connected to a database!");
    app.listen(5000, () => {
      console.log("Server connected on port 5000...");
    });
  })
  .catch((err) => {
    console.log("Connection failed");
  });
