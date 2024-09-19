const bukutamu = require("../models/bukutamu");

const handleError = (res, err, message) => {
    console.error(err);
    res.status(500).json({ error: message || err.message });
};

const storeBuku = async (req, res) => {
    try {
        const { nama_tamu, no_hp, jabatan, unit_kerja, tujuan, yang_dituju, keterangan } = req.body;
        const result = await bukutamu.insertBuku(nama_tamu, no_hp, jabatan, unit_kerja, tujuan, yang_dituju, keterangan);
        res.status(201).json({ message: "Tamu Created", TamuId: result.insertId });
    } catch (err) {
        handleError(res, err, "Error creating guest entry");
    }
};

const showBuku = async (req, res) => {
    try {
        const { id } = req.params;
        const results = await bukutamu.selectBukuById(id);
        if (results.length === 0) {
            return res.status(404).json({ message: "Tamu tidak ditemukan" });
        }
        res.status(200).json(results[0]);
    } catch (err) {
        handleError(res, err, "Error fetching guest entry");
    }
};

const destroyBuku = async (req, res) => {
    try {
        const { id } = req.params;
        await bukutamu.deleteBuku(id);
        res.status(200).json({ message: "Data tamu berhasil dihapus" });
    } catch (err) {
        handleError(res, err, "Error deleting guest entry");
    }
};

const updateBukutamu = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;

        const updatedBukutamu = await Bukutamu.findByIdAndUpdate(id, updatedData, { new: true });
        if (!updatedBukutamu) {
            return res.status(404).json({ message: 'Bukutamu entry not found' });
        }

        res.status(200).json(updatedBukutamu);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const index = async (req, res) => {
    try {
        const result = await bukutamu.selectBuku();
        if (result.length === 0) {
            return res.status(404).json({ message: "Tidak ada tamu ditemukan" });
        }
        res.status(200).json(result);
    } catch (err) {
        handleError(res, err, "Error fetching guest entries");
    }
};

const login = (req, res) => {
    res.status(400).json({ message: "Login tidak berlaku untuk tabel bukutamu_db" });
};

const logout = (req, res) => {
    res.status(200).json({ auth: false, token: null });
};

module.exports = {
    storeBuku,
    showBuku,
    login,
    logout,
    index,
    destroyBuku,
    updateBukutamu
};
