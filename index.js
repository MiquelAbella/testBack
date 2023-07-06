require("dotenv").config();

const app = require("./server");
const Config = require("./src/config/config");
const { dbConnection } = require("./src/database/database");

dbConnection().then(async function onServerInit() {
  console.log("DB connected");

  app.listen(process.env.PORT, "0.0.0.0", () => {
    console.log(`Serving on port ${Config.app.PORT}`);
  });
});