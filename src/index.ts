import e, { json, urlencoded } from "express";
import route from "./controler/shorten/shorten.js";

const app = e();

app.use(json({ limit: "1kb" }));
app.use(urlencoded({ parameterLimit: 3 }));
app.use("/api/v1", route);
