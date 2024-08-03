import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import AuthRoute from "./routes/AuthRoute.js";
import UserRoute from"./routes/UserRoute.js";
import PelangganRoute from"./routes/PelangganRoute.js";

dotenv.config();


const app = express();

app.use(express.json());


app.use(cors({
  credentials: true,
  origin: 'http://localhost:3000'
}));

app.use(AuthRoute);
app.use(UserRoute);
app.use(PelangganRoute);

app.listen(process.env.APP_PORT, () => {
  console.log("Server up and running...");
});
