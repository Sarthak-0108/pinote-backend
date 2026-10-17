import mongoose from "mongoose";
import userModel from "../models/user.model.js";
import jwt from 'jsonwebtoken'
import bcrypt from "bcryptjs";

const registerUser = async (req, res) => {
    const { username, email, password } = req.body;

    const isUserAlreadyExist = userModel.findOne({
        $or: [{ username }, { email }]
    });

    if (!isUserAlreadyExist) {
        return res.status(409).json({
            message: "user already exist"
        })
    }

    const hash = await bcrypt.hash(password, 10);

    const user = await userModel.create({
        username,
        email,
        password: hash
    });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.cookie("token", token, {
        secure: true,
        sameSite: "none",
        path: "/",
        maxAge: 7 * 24 * 60 * 60 * 1000
    });

    res.status(201).json({
        message: "user registered successfully",
        user
    })
}

const loginUser = async (req, res) => {
    const { username, email, password } = req.body;

    const user = await userModel.findOne({
        $or: [{ username }, { email }]
    })

    if (!user) {
        return res.status(401).json({
            message: 'Invalid credentials'
        })
    }

    console.log(user)
    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log(isPasswordValid)

    if (!isPasswordValid) {
        return res.status(401).json({
            message: "Invalid credentials"
        })
    }

    const token = jwt.sign({
        id: user._id
    }, process.env.JWT_SECRET)

    res.cookie('token', token);

    res.status(200).json({
        message: "login successfully",
        user
    })
}

const logoutUser = async (req, res) => {
    res.clearCookie("token")
    res.status(200).json({
        message: "logout successfully"
    })
}

export default { registerUser, loginUser, logoutUser }