import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fileUpload from "express-fileupload";
import "./config/db.js";
import { Router } from "./routes/routes.js";
import bodyParser from "body-parser";

dotenv.config({ path: "./config/.env" });
const app = express();
app.use(bodyParser.json({ limit: "10mb" }));
const corsOptions = {
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"],
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(fileUpload());
app.use("/uploads", express.static("uploads"));
app.use("/CultureConnect", Router);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
