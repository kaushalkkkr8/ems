const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const { connection } = require("./db.connect");
const app = express();
dotenv.config();
app.use(express.json());

const auth = require("./Routes/authRoute");
const engineer = require("./Routes/engineerRoute");
const project = require("./Routes/projectRoute");
const assignment = require("./Routes/assignmentRoutes");

const allowedOrigins = ["http://localhost:5173", "https://ems-frontend-liart.vercel.app"];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.send("Hello! All Good");
});

app.use("/auth", auth);
app.use("/engineers", engineer);
app.use("/projects", project);
app.use("/assignments", assignment);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("App is running on port:", PORT);
});
