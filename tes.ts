import { randomBytes } from "node:crypto";

const main = () => {
  return randomBytes(3).toString("hex");
};

console.log(main());
