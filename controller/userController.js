const db = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = db.User;

async function createUser(req, res) {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ 
                message: 'Email dan password wajib diisi' });
        }

        const existingUser = await User.findOne({ 
            where: { email } 
        });

        if (existingUser) {
            return res.status(409).json({ 
                message: 'Email sudah terdaftar' 
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            email,
            password: hashedPassword
        });

        return res.status(201).json({
            message: 'registrasi berhasil',
            data: {
                id: user.id,
                email: user.email
            }
        });
    } catch (error) {
        return res.status(500).json({
            error: error.message
        });
    }
}