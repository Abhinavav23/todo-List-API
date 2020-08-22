const express = require("express");
const cors = require("cors");
const userRoute = require("./routes/user-route");
const taskRoute = require("./routes/task-route");
const port = process.env.PORT || 3000;
require("./database-setup/mongoose");

const app = express();

app.use(cors());
app.use(express.json());
app.use(userRoute);
app.use(taskRoute);

app.listen(port, () => {
  console.log(`server is running at port ${port}`);
});
