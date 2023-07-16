import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.models.js";
import { schemaRegister, schemaLogin } from "../validations/auth.js";

export const login = async (req, res) => {
    const { error } = schemaLogin.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message })

    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) return res.status(400).json({ error: 'Usuario no encontrado' });

        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) return res.status(400).json({ error: 'contraseña no válida' })

        // create token
        const token = jwt.sign({
            name: user.name,
            id: user._id
        }, process.env.TOKEN_SECRET)

        res.json({
            error: null,
            data: 'exito bienvenido', 
            token: token
        })
    } catch (error) {
        res.status(400).json({ error })
    }
}

export const register = async (req, res) => {
    const { name, email, password } = req.body;
    const { error } = schemaRegister.validate(req.body);
    if (error) {
        return res.status(400).json(
            { error: error.details[0].message }
        )
    }

    const isEmailExist = await User.findOne({ email: req.body.email });
    if (isEmailExist) {
        return res.status(400).json(
            { error: 'Email ya registrado' }
        )
    }

    const user = new User({
        name: name,
        email: email,
        password: password
    });

    user.password = await user.encryptPassword(password);
    try {
        const savedUser = await user.save();
        res.json({
            error: null,
            data: savedUser
        })
    } catch (error) {
        res.status(400).json({ error })
    }
}