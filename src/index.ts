import e, { json, urlencoded } from "express";
import route from "./controler/shorten/shorten.js";
import helmet from "helmet";

const app = e();

app.use(json({ limit: "1kb" }));
app.use(helmet());
app.use(urlencoded({ parameterLimit: 100, extended: true }));
app.use("/api/v1", route);

app.listen(3000, () => {
  console.log(`server started in port 3000 `);
});
