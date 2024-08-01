import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();


const app = express();

app.use(express.json());


app.use(cors({
  credentials: true,
  origin: 'http://localhost:3000'
}));

app.listen(process.env.APP_PORT, () => {
  console.log("Server up and running...");
});
