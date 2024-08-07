import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import AuthRoute from "./routes/AuthRoute.js";
import PelangganRoute from"./routes/PelangganRoute.js";
import PembayaranRoute from "./routes/PembayaranRoutes.js";
import PenggunaanRoute from "./routes/PenggunaanRoutes.js";
import TagihanRoute from "./routes/TagihanRoutes.js";
import TarifRoute from"./routes/TarifRoute.js";
import UserRoute from"./routes/UserRoute.js";
dotenv.config();


const app = express();

app.use(express.json());


app.use(
  cors({
    origin: "http://localhost:5173", 
    methods: 'GET,POST,PUT,DELETE,PATCH', 
    credentials: true,
  })
);

app.use(AuthRoute);
app.use(PelangganRoute);
app.use(PembayaranRoute);
app.use(PenggunaanRoute);
app.use(TagihanRoute);
app.use(TarifRoute);
app.use(UserRoute);

app.listen(process.env.APP_PORT, () => {
  console.log("Server up and running...");
});
