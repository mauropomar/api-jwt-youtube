import User from "../models/user.models.js";


export const getAll = async (req, res) => {
    try {
        const users = await User.find();
        res.json({
            error: null,
            data: users
        })
    } catch (error) {
        res.status(400).json({ error })
    }
}