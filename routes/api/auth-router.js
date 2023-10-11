import express from 'express';
import authController from "../../controllers/auth-controller.js";
import { isEmptyBody, userValidateSignup, userValidateSignin } from '../../middlewares/index.js';

const authRouter = express.Router();



export default authRouter;