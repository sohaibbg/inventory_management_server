const express = require("express");
const department = require("./routes/department");
const designation = require("./routes/designation");
const user = require("./routes/user");
const catalogue = require("./routes/catalogue");
const category = require("./routes/category");
const property = require("./routes/property");
const attribute = require("./routes/attribute");
const asset_model = require("./routes/asset_model");
const asset = require("./routes/asset");
const employee = require("./routes/employee");
const supplier = require("./routes/supplier");
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());
app.use(
    express.urlencoded({ extended: true })
);
app.get("/", (req, res) => {
    res.json({ message: "live" });
});
app.use("/designation", designation);
app.use("/user", user);
app.use("/department", department);
app.use("/catalogue", catalogue);
app.use("/category", category);
app.use("/property", property);
app.use("/attribute", attribute);
app.use("/asset_model", asset_model);
app.use("/asset", asset);
app.use("/employee", employee);
app.use("/supplier", supplier);

/* Error handler middleware */
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    console.error(err.message, err.stack);
    res.status(statusCode).json({ message: err.message });
    res.status(err.statusCode).json({
        message: err.message,
    });
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});