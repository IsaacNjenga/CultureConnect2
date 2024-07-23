import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import "./config/db.js";
import { Router } from "./routes/routes.js";
import bodyParser from "body-parser";

dotenv.config({ path: "./config/.env" });
const app = express();
app.use(bodyParser.json({ limit: "10mb" }));
const corsOptions = {
  origin: ["http://localhost:3000","https://culture-connect2-front.vercel.app"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"],
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());

// Handle CORS preflight requests
app.use((req, res, next) => {
  console.log("Request Method:", req.method);
  console.log("Request Headers:", req.headers);
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Origin", req.headers.origin);
    res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.header("Access-Control-Allow-Credentials", "true");
    return res.sendStatus(200);
  }
  next();
});

app.use("/uploads", express.static("uploads"));
app.use("/CultureConnect", Router);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
