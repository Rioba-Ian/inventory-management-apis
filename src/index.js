const express = require("express");

const app = express();

const apiRoutes = require("./routes/index");

app.use("/api", apiRoutes);

app.listen(3000, () => {
  console.log(`Server is listening at port 3000`);
});
