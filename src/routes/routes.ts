import { Express } from "express";
import bodyParser from "body-parser";

// routes
import users from "./users";
import contracts from "./contracts";
import notes from "./notes";
import auth from "./login";

export default (app: Express) => {
    app.use(
        "/v1",
        bodyParser.json(),
        auth,
        users,
        contracts,
        notes
    )
}