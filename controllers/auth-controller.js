import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken";

import User from "../models/User.js";
import { HttpError } from "../helpers/index.js";
import { ctrlWrapper } from "../decorators/index.js";

const {JWT_SECRET} = process.env;

const signup = async(req, res, next) => {
    const {password} = req.body
    req.body.password = await bcrypt.hash(password, 10)
    const { email, subscription } = await User.create(req.body);
    res.status(201).json({
        user: {
      email,
      subscription
     }
    })
}

const signin = async(req, res, next) => {
    const { email, password } = req.body
    const user = await User.findOne({ email })

    if (!user) {
       throw HttpError(401,"Email or password is wrong")
    }

    const passwordCompare = await bcrypt.compare(password, user.password)
    if (!passwordCompare) {
       throw HttpError(401,"Email or password is wrong")
    }
    
    const { subscription } = user
    
    const payload = {
        id: user._id,
    }

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "23h" });
    
    res.status(200).json({
        token,
        user: {
            email,
            subscription
        }
    })
}

export default {
    signup: ctrlWrapper(signup),
    signin: ctrlWrapper(signin),
}