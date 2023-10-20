import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken";
import gravatar from "gravatar";
import Jimp from "jimp";
import fs from "fs/promises";
import path from "path";

import User from "../models/User.js";
import { HttpError } from "../helpers/index.js";
import { ctrlWrapper } from "../decorators/index.js";

const { JWT_SECRET } = process.env;

const avatarsPath = path.resolve("public", "avatars");

const signup = async(req, res, next) => {
    const {password, email} = req.body
    req.body.password = await bcrypt.hash(password, 10);
    req.body.avatarURL =  gravatar.url(email, {protocol: 'https', d: "mp"});
    const {  subscription, avatarURL } = await User.create(req.body);
    res.status(201).json({
        user: {
      email,
      subscription,
      avatarURL
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
    await User.findByIdAndUpdate(user._id, { token });
    
    res.status(200).json({
        token,
        user: {
            email,
            subscription
        }
    })
}

const signout = async(req, res)=> {
    const {_id} = req.user;
    await User.findByIdAndUpdate(_id, {token: ""});
    res.status(204).json()
}

const getCurrent = async(req, res)=> {
    const { email, subscription} = req.user;
    res.status(200).json({
        email,
        subscription
    })
}

const updateSubscriptionUser = async (req, res) => {
    const { subscription } = req.body;
    const { _id, email } = req.user;
     const user = await User.findByIdAndUpdate(_id, { subscription });
    if (!user) throw HttpError(404, "Not found");
    res.status(200).json({
        email,
        subscription
    })
}

const updateAvatarUser = async (req, res) => {
    const { _id } = req.user;
    const { path: tmpPath, filename } = req.file;
    const newPath = path.join(avatarsPath, filename);
    const file = await Jimp.read(tmpPath);
    await file.resize(250, 250).write(newPath);
    await fs.unlink(tmpPath);
    const avatarURL = path.join("avatars", filename);
    const user = await User.findByIdAndUpdate(_id, { avatarURL });
    if (!user) throw HttpError(404, "Not found");
    res.status(200).json({
        avatarURL
    })
}

export default {
    signup: ctrlWrapper(signup),
    signin: ctrlWrapper(signin),
    signout: ctrlWrapper(signout),
    getCurrent: ctrlWrapper(getCurrent),
    updateSubscriptionUser: ctrlWrapper(updateSubscriptionUser),
    updateAvatarUser: ctrlWrapper(updateAvatarUser),
}