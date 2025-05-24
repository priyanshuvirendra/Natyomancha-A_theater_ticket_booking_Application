import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

// @desc: Authenticated user and get token

export const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "5d",
    });
};

export const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
};

export const comparePassword = async (password, hashedUserPassword) => {
    return bcrypt.compare(password, hashedUserPassword);
};
