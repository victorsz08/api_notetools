import express from "express";
import { Request, Response } from "express";
import routes from "./routes/routes";
import cors from "cors";
import "dotenv/config";

const port = process.env.PORT || 3333;
const app = express();

app.use(cors({
    optionsSuccessStatus: 200,
    origin: process.env.ORIGIN_URL_CORS,
    methods: "POST, GET, PUT, DELETE"    
}))


app.get("/", (request: Request, response: Response) => {
    return response.status(200).send("Notetools API");
});

routes(app);

app.listen(port, () => {
    console.log(`server running in port: ${port}`);
});


