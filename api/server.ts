import express from "express";
import { Router, Request, Response } from "express";
import routes from "./routes/routes";

const port = 3333;
const app = express();
const router = Router();

app.use(express.json());

routes(app)

app.listen(port, () => {
    console.log(`server running in port: ${port}`);
})


