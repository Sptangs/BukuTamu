const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors"); 
const bukutamu = require("./models/bukutamu");
const bukutamuRoutes = require("./routes/bukutamuRoutes");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors({
    origin: 'http://localhost:5173', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));

app.use(bodyParser.json());

app.use('/api', bukutamuRoutes);

bukutamu.createBukuTable();

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: "Something went wrong!" });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
