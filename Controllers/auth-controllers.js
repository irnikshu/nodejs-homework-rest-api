const { ctrlWrapper } = require("../Utils")
const { HttpError } = require("../Helpers")
const { User } = require("../models/user")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")

const { SECRET_KEY } = process.env;

const register = async (req, res) => { 
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
        throw HttpError(409, "Email in use")
    }
    const hashPassword = await bcrypt.hash(password, 10)
    const result = await User.create({ ...req.body, password: hashPassword })

    res.status(201).json({
        name: result.name,
        email: result.email, 
    })
}

const login = async (req, res) => { 
    const { email, password } = req.body;
    const user = await User.findOne({ email })
    if (!user) {
        throw HttpError(401, "Email or password is wrong");
    }
    const passwordCompare = await bcrypt.compare(password, user.password)
    if (!passwordCompare) {
        throw HttpError(401, "Email or password is wrong");
    }

    const payload = {
        id: user._id,
    }
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
    await User.findByIdAndUpdate(user._id, { token });

    res.json({
        token,
    })
}

const getCurrent = async (req, res) => {
    const { name, email } = req.user;

    res.json({
        name,
        email,
    })
}

const logout = async (req, res) => {
    const { _id } = req.user;
    await User.findByIdAndUpdate(_id, { token: "" });

    res.json({
        message:"Logout success"
    })
}

module.exports = {
    register: ctrlWrapper(register),
    login: ctrlWrapper(login),
    getCurrent: ctrlWrapper(getCurrent),
    logout: ctrlWrapper(logout),
}