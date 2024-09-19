const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/user");

const storeUser = (req, res) => {
    const {nama, email, password} = req.body;
    User.insertUser(nama, email, password, (err,result) => {
        if(err){
            return res.status(500).json({error: err.message});
        }
        res.status(201).json({message: "User Created", UserId: result.insertId});
    });
};

const showUser = (req, res) => {
    const {id} = req.params;
    User.selectUserById(id, (err, results)=> {
        if(err){
            return res.status(500).json({error: err.message});
        }
        if(results.lenght === 0){
            return res.status(404).json({message: "user tidak ditemukan"});
        }
        res.status(200).json(results[0]);
    });
};

const destroyUser = (req, res) => {
    const {id} = req.params;
    User.deleteUser(id, (err, result)=> {
        if(err){
            return res.status(500).json({error:err.message});
        }
        res.status(200).json("data berhasil dihapus");
    });
};

const index = (req, res) => {
    User.selectUsers((err, result)=>{
        if(err){
            return res.status(500).json({error: err.message});
        }
        if(result.lenght === 0){
            return res.status(404).json({ message: "user tidak ditemukan"});
        }
        res.status(200).json(result);
    });
};

const login = (req, res) => {
    const {email, password} = req.body;
    User.selectUserByEmail(email, (err, results) => {
        if (err) {
            return res.status(500).json({error: err.message});
        }
        if (results.length === 0) {
            return res.status(404).json({message: "User not found"});
        }
        
        const user = results[0];
        const isPasswordValid = bcrypt.compareSync(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({message: "Incorrect password"});
        }
        
        const token = jwt.sign({id: user.id}, "ayosekolah", {
            expiresIn: 86400, // Token expires in 24 hours
        });
        
        return res.status(200).json({auth: true, token});
    });
};

const updateUser = (req, res) => {
    const { id } = req.params; // Mengambil ID dari parameter URL
    const { nama, email, password } = req.body;
    
    User.updateUser(id, nama, email, password, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: "Bukutamu entry not found" });
        }
        res.status(200).json({ message: "Data Berhasil Diupdate" });
    });
};


const logout = (req, res)=>{
    res.status(200).json({auth:false, token:null})
}

module.exports = {
    storeUser,
    showUser,
    login,
    logout,
    index,
    destroyUser,
    updateUser
};