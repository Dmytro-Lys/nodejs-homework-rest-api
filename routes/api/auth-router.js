import express from 'express';
import authController from "../../controllers/auth-controller.js";
import { isEmptyBody, userValidateSignup, userValidateSignin, authenticate } from '../../middlewares/index.js';

const authRouter = express.Router();

authRouter.post("/register", isEmptyBody, userValidateSignup, authController.signup)

authRouter.post("/login", isEmptyBody, userValidateSignin, authController.signin)

authRouter.post("/logout", authenticate, authController.signout);

authRouter.get("/current", authenticate, authController.getCurrent);

export default authRouter;