const express = require("express");
const router = express.Router();
const bukutamuController = require("../controllers/bukutamuController");


router.post("/bukutamu", bukutamuController.storeBuku);       
router.get("/bukutamu", bukutamuController.index);            
router.delete("/bukutamu/:id", bukutamuController.destroyBuku); 
router.get("/bukutamu/:id", bukutamuController.showBuku);  

router.get('/bukutamu', async (req, res) => {
    try {
        const allEntries = await bukutamu.getAllEntries();
        res.json(allEntries);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch bukutamu data." });
    }
});

module.exports = router;
