import express from "express";
import { config } from "dotenv";
import countryRoutes from "./src/routes/country.routes.js";

config();

const app = express();
const PORT = Number(process.env.PORT);

app.use(express.json());

app.use("/countries", countryRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
