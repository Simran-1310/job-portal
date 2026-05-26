require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const userRoute = require("./routes/user.route.js");
const connectDb = require("./utils/db.js");
const companyRoute= require("./routes/company.route.js");
const jobRoute= require("./routes/job.route.js");
const applicationRoute= require("./routes/application.route.js")
const app = express();

connectDb();

//middleware
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); 
const port = process.env.PORT || 3000;;

//api's
app.get("/", (req, res) => {
  res.send("Server is running ");
});
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company",companyRoute);
app.use("/api/v1/job",jobRoute);
app.use("/api/v1/application",applicationRoute);

app.listen(port, () => {
  console.log(`server listening on port ${port}`);
});