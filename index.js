// ScholiumAPP/ScholiumAPI/index.js
console.log("Index.js:");
const express = require("express");

const bodyParser = require("body-parser");
const compression = require("compression");
const cors = require("cors");
const morgan = require("morgan");

const authRoutes = require("./routes/authRoutes");
const notesRoutes = require("./routes/notesRoutes");
//const settingsRoutes = require("./routes/settingsRoutes");
const aboutRoutes = require("./routes/aboutRoutes");

const app = express();
require("dotenv").config();

const swaggerUI = require("swagger-ui-express");
const swaggerDocument = require("./docs/openapi.json");

app.use(bodyParser.json());
app.use(compression());
app.use(cors());
app.use(morgan("combined"));

app.use("/api/auth", authRoutes);
app.use("/about", aboutRoutes);
app.use("/api/notes", notesRoutes);
//app.use("/settings", settingsRoutes);
app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
