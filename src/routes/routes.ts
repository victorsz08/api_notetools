import { Express } from "express";
import bodyParser from "body-parser";

// routes
import users from "./users";
import contracts from "./contracts";
import notes from "./notes";
import auth from "./login";
import teams from "./teams";
import statistics from "./statistics";
import countries from "./countries";
import ranking from "./ranking";

export default (app: Express) => {
    app.use(
        bodyParser.json(),
        auth,
        users,
        contracts,
        notes,
        teams,
        statistics,
        countries,
        ranking
    )
}