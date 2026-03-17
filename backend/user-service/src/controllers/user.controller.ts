import { Request, Response } from "express";
import User from "../models/user.models";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

//region auth

/** Sign up a new user. */
export const signUpAsync = async (req: Request, res: Response): Promise<void> => {
    try {
        if (await User.findOne({where: {email: req.body.email}}))
            res.status(403).json({message: "User with the same mail address already exists"});
        else {
            const user = await User.create({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                birthDate: req.body.birthDate,
                email: req.body.email,
                phone: req.body.phone,
                gender: req.body.gender,
                passwordHash: bcrypt.hashSync(req.body.password, 10)
            });
            res.status(201).json(user);
        }
    } catch (error) {
        console.error("Error when signing up new user:", error);
        res.status(500).json({message: "Server error", error: error?.toString()});
    }
};

/** Sign in a user. */
export const signInAsync = async (req: Request, res: Response): Promise<void> => {
    try {
        const user = await User.findOne({where: {email: req.body.email}});
        if (!user) res.status(404).json({message: "User not found"});
        else {
            if (bcrypt.compareSync(req.body.password, user.passwordHash)) {
                res.status(201).json({
                    identity: `${user.firstName}${user.lastName != null ? ` ${user.lastName}` : ''}`,
                    token: jwt.sign({userId: user.id}, process.env.JWT_SECRET ?? '', {expiresIn: "24h"})
                });
            } else res.status(401).json({message: "Invalid email or password"});
        }
    } catch (error) {
        console.error("Error when signing in:", error);
        res.status(500).json({message: "Server error", error: error?.toString()});
    }
};

/** Verify JWT token and return user ID. */
export const verifyTokenAsync = async (req: Request, res: Response): Promise<void> => {
    const tokenValidation = await verifyUserTokenAsync(req.body.token);
    if (tokenValidation.status != 200) {
        res.status(tokenValidation.status).json({
            success: false,
            message: tokenValidation.error
        });
        return;
    }
    res.status(200).json({message: "Valid JWT token", userId: tokenValidation.user?.id});
};

//endregion

//region user admin

/** Get current user. */
export const getCurrentUserAsync = async (req: Request, res: Response): Promise<void> => {
    try {
        const user = await getUserFromReqTokenAsync(req, res);
        if (user) {
            user.passwordHash = ''; // Excluding the user password
            res.status(200).json(user);
        }
    } catch (error) {
        console.error("Error when getting current user:", error);
        res.status(500).json({
            success: false,
            message: "Error when getting current user"
        });
    }
};

/** Update current user. */
export const updateCurrentUserAsync = async (req: Request, res: Response): Promise<void> => {
    try {
        const user = await getUserFromReqTokenAsync(req, res);
        if (user) {

            const {firstName, lastName, birthDate, email, phone, gender, password} = req.body;

            // Vérification de l'unicité de l'email
            if (email && email !== user.email) {
                const existingUser = await User.findOne({where: {email}});
                if (existingUser) {
                    res.status(409).json({
                        success: false,
                        message: `Un utilisateur avec l'email ${email} existe déjà`
                    });
                    return;
                }
            }

            // Mise à jour des champs
            const updatedData: any = {};
            if (firstName !== undefined) updatedData.firstName = firstName;
            if (lastName !== undefined) updatedData.lastName = lastName;
            if (birthDate !== undefined) updatedData.birthDate = new Date(birthDate);
            if (email !== undefined) updatedData.email = email;
            if (phone !== undefined) updatedData.phone = phone;
            if (gender !== undefined) updatedData.gender = gender;

            // Si un mot de passe est fourni, le hasher
            if (password) {
                const saltRounds = 12;
                updatedData.passwordHash = await bcrypt.hash(password, saltRounds);
            }

            // Mise à jour de l'utilisateur
            await user.update(updatedData);

            // Retourner l'utilisateur mis à jour sans le mot de passe
            res.status(200).json(await User.findByPk(user.id, {attributes: {exclude: ['passwordHash']}}));

        }
    } catch (error) {
        console.error("Error when updating current user:", error);
        res.status(500).json({
            success: false,
            message: "Error when updating current user"
        });
    }
};

/** Delete current user. */
export const deleteCurrentUserAsync = async (req: Request, res: Response): Promise<void> => {
    try {
        const user = await getUserFromReqTokenAsync(req, res);
        if (user) {
            await user.destroy();
            res.status(200).json({message: "User deleted"});
        }
    } catch (error) {
        console.error("Error when deleting current user:", error);
        res.status(500).json({
            success: false,
            message: "Error when deleting current user"
        });
    }
};

//endregion

//region other methods

/**
 * Verify the token corresponding to a user.
 * @param token The token to verify
 * @returns
 * - The token validation status (`200` or `401`, `404`)
 * - The user corresponding to the token if found
 * - The potential token validity error.
 */
async function verifyUserTokenAsync(token: string): Promise<{ status: number, user?: User, error?: string }> {
    try {

        // Missing token
        if (!token || !/\S/.test(token)) return {status: 401, error: "Missing JWT token"};

        // Get the user corresponding to the given token
        const decoded = jwt.verify(token, process.env.JWT_SECRET ?? '') as { userId: number };
        const user = await User.findByPk(decoded.userId);

        // User not found
        if (!user) return {status: 404, error: "User not found"};

        // Return the corresponding user if found
        return {status: 200, user};

    } catch (error) {

        // Invalid token
        if (error instanceof jwt.JsonWebTokenError) return {status: 401, error: "Invalid JWT token"};

        // Expired token
        else if (error instanceof jwt.TokenExpiredError) return {status: 401, error: "Expired JWT token"};

        // Other errors
        return {status: 500, error: "Erreur when validating user token"};

    }
}

/**
 * Get the user corresponding to the token from the given request headers or send an error in case of invalid data.
 * @param req The request.
 * @param res The response.
 * @returns The user corresponding to the request headers, else `undefined`.
 */
async function getUserFromReqTokenAsync(req: Request, res: Response): Promise<User | undefined> {
    const tokenValidation = await verifyUserTokenAsync(req.headers.authorization?.replace('Bearer ', '') ?? '');
    if (tokenValidation.status != 201) {
        res.status(tokenValidation.status).json({
            success: false,
            message: tokenValidation.error
        });
        return undefined;
    }
    return tokenValidation.user;
}

//endregion