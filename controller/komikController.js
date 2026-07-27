const db = require('../models');
const Komik = db.Komik;

async function getAllKomik(req, res) {
    try {
        const komik = await Komik.findAll();
        return res.status(200).json(komik);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

async function getKomikById(req, res) {
    try {
        const komik = await Komik.findByPk(req.params.id);
        if (!komik) {
            return res.status(404).json({ message: 'Komik tidak ditemukan' });
        }
        return res.status(200).json(komik);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

async function createKomik(req, res) {
    try {
        const { title, description, author } = req.body;
        const komik = await Komik.create({ title, description, author });
        return res.status(201).json(komik);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

async function updateKomik(req, res) {
    try {
        const { title, description, author } = req.body;
        const komik = await Komik.findByPk(req.params.id);
        if (!komik) {
            return res.status(404).json({ message: 'Komik tidak ditemukan' });
        }
        await komik.update({ title, description, author });
        return res.status(200).json(komik);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

async function deleteKomik(req, res) {
    try {
        const komik = await Komik.findByPk(req.params.id);
        if (!komik) {
            return res.status(404).json({ message: 'Komik tidak ditemukan' });
        }
        await komik.destroy();
        return res.status(200).json({ message: 'Komik berhasil dihapus' });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

module.exports = {
    getAllKomik,
    getKomikById,
    createKomik,
    updateKomik,
    deleteKomik
};