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

/**
 * @swagger
 * /sign-up:
 *   post:
 *     summary: Create a new user account within the database.
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         type: number
 *         example: 1
 *       - name: firstName
 *         type: string
 *         example: Hammond
 *       - name: lastName
 *         type: string
 *         example: GUS
 *       - name: birthDate
 *         type: Date
 *         example: 2025-04-26
 *       - name: email
 *         type: string
 *         example: test@hotmail.com
 *       - name: phone
 *         type: string
 *         example: 0605040302
 *       - name: gender
 *         type: string
 *         example: male
 *       - name: password
 *         type: string
 *         example: Test$1234
 *     responses:
 *       "201":
 *         description: The user was created and is returned.
 *       "403":
 *         description: User with the same mail address already exists.
 *       "500":
 *         description: Other server error.
 */
router.post("/sign-up", signUpAsync);

/**
 * @swagger
 * /sign-in:
 *   post:
 *     summary: Sign a user in.
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: email
 *         type: string
 *         example: test@gmail.com
 *       - name: password
 *         type: string
 *         example: Test$1234
 *     responses:
 *       "201":
 *         description: The user authentication is valid and data about their identity is returned.
 *       "401":
 *         description: Invalid authentication data.
 *       "500":
 *         description: Other server error.
 */
router.post("/sign-in", signInAsync);

/**
 * @swagger
 * /verify:
 *   post:
 *     summary: Verify if an authentication token is valid.
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         type: string
 *         example: gdb781f6v42S6D6pb4s466p4u6S46D4b4S6E6D6F6P6ESFB6s1g678hsGh67
 *     responses:
 *       "200":
 *         description: The token is valid.
 *       "401":
 *         description: Invalid token.
 *        "404":
 *         description: User not found.
 *       "500":
 *         description: Other server error.
 */
router.post("/verify-token", verifyTokenAsync);

//endregion

//region current user

/**
 * @swagger
 * /current:
 *   get:
 *     summary: Get the currently authenticated user.
 *     produces:
 *       - application/json
 *     responses:
 *       "200":
 *         description: Return the corresponding user.
 *       "500":
 *         description: Other server error.
 */
router.get('/current', getCurrentUserAsync);


/**
 * @swagger
 * /current:
 *   put:
 *     summary: Modify current user's data.
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: firstName
 *         type: string
 *         example: Hammond
 *       - name: lastName
 *         type: string
 *         example: GUS
 *       - name: birthDate
 *         type: Date
 *         example: 2025-04-26
 *       - name: email
 *         type: string
 *         example: test@hotmail.com
 *       - name: phone
 *         type: string
 *         example: 0605040302
 *       - name: gender
 *         type: string
 *         example: male
 *     responses:
 *       "200":
 *         description: The was updated and is returned.
 *       "409":
 *         description: Given email address is already taken.
 *       "500":
 *         description: Other server error.
 */
router.put('/current', updateCurrentUserAsync);

/**
 * @swagger
 * /current:
 *   delete:
 *     summary: Delete the currently authenticated user.
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         type: number
 *         example: 1
 *     responses:
 *       "200":
 *         description: The user has been deleted.
 *       "500":
 *         description: Other server error.
 */
router.delete('/current', deleteCurrentUserAsync);

//endregion

export default router;