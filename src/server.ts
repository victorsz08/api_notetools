import express from "express";
import { Request, Response } from "express";
import routes from "./routes/routes";
import cors from "cors";
import "dotenv/config";

const port = process.env.PORT || 3333;
const app = express();



app.get("/", (request: Request, response: Response) => {
    return response.status(200).send("Notetools API");
});

app.use(cors({
    origin: process.env.CORS_ALLOW_PROD || "https://localhost:3000"
}))

routes(app);


app.listen(port, () => {
    console.log(`server running in port: ${port}`);
});


