import express from 'express';
import authController from "../../controllers/auth-controller.js";
import { isEmptyBody, userValidateSignup, userValidateSignin, authenticate, userValidateSubscription, upload, userValidateEmail } from '../../middlewares/index.js';

const authRouter = express.Router();

authRouter.post("/register", isEmptyBody, userValidateSignup, authController.signup)

authRouter.get("/verify/:verificationToken", authController.verify);

authRouter.post("/verify", isEmptyBody, userValidateEmail, authController.resendVerifyEmail);

authRouter.post("/login", isEmptyBody, userValidateSignin, authController.signin)

authRouter.post("/logout", authenticate, authController.signout);

authRouter.get("/current", authenticate, authController.getCurrent);

authRouter.patch("/", authenticate, isEmptyBody, userValidateSubscription, authController.updateSubscriptionUser);

authRouter.patch("/avatars", authenticate, upload.single("avatar"), authController.updateAvatarUser);


export default authRouter;