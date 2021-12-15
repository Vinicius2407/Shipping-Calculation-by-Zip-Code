import "dotenv/config";
import express from "express";

import { router } from "./routes.js";

const app = express();

app.use(express.json());
app.use("/api/v1", router);

const port = process.env.PORT || 3333;

app.listen(port, () => console.log(`\nServer listening on ${port}\n`));
