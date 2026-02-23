import { Router } from "express";
import {
    deleteCurrentUserAsync,
    getCurrentUserAsync,
    signInAsync,
    signUpAsync,
    updateCurrentUserAsync,
    verifyTokenAsync
} from "~/controllers/user.controller";

const router = Router();

//region auth

router.post("/sign-up", signUpAsync);
router.post("/sign-in", signInAsync);
router.post("/verify-token", verifyTokenAsync);

//endregion

//region current user

router.get('/current', getCurrentUserAsync);
router.put('/current', updateCurrentUserAsync);
router.delete('/current', deleteCurrentUserAsync);

//endregion

export default router;
