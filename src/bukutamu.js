const express = require("express");
const bodyParser = require("body-parser");
const bukutamu = require("./models/bukutamu");
const bukutamuRoutes = require("./routes/bukutamuRoutes");

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use('/api',bukutamuRoutes);

bukutamu.createUserTable();
app.listen(port, () => {
    console.log(`Server berjalan di port ${port}`);
});