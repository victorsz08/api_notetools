import { Express } from "express";
import bodyParser from "body-parser";

// routes
import users from "./users";
import contracts from "./contracts";


export default (app: Express) => {
    app.use(
        bodyParser.json(),
        users,
        contracts
    )
}