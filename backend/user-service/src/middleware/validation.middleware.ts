import { Request, Response, NextFunction } from 'express';

export const validateUserCreation = (req: Request, res: Response, next: NextFunction): void => {
    const { firstName, lastName, birthDate, email, gender, password } = req.body;
    const errors: string[] = [];

    // Validation firstName
    if (!firstName || typeof firstName !== 'string' || firstName.trim().length < 2) {
        errors.push('Le prénom doit contenir au moins 2 caractères.');
    }

    // Validation email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
        errors.push('L\'email est invalide.');
    }

    // Validation birthDate
    if (!birthDate || isNaN(Date.parse(birthDate))) {
        errors.push('La date de naissance est invalide.');
    } else {
        const birthDateObj = new Date(birthDate);
        const today = new Date();
        const age = today.getFullYear() - birthDateObj.getFullYear();
        if(isNaN(birthDateObj.getTime()) || age < 0 || age > 120) {
            errors.push('La date de naissance doit être valide et l\'âge doit être compris entre 0 et 120 ans.');
        }
    }

    // Validation gender
    const validGenders = ['male', 'female', 'other', 'homme', 'femme', 'autre'];
    if(!gender || !validGenders.includes(gender.toLowerCase())) {
        errors.push('Le genre doit être: male, female, other, homme, femme ou autre');
    }

    // Validation password
    if (!password || typeof password !== 'string' || password.length < 8) {
        errors.push('Le mot de passe doit contenir au moins 6 caractères.');
    }

    // Validation phone
    if(req.body.phone) {
        const phoneRegex = /^\+?[1-9]\d{1,14}$/; // Format international
        if (!phoneRegex.test(req.body.phone)) {
            errors.push('Le numéro de téléphone est invalide.');
        }
    }

    if(errors.length > 0) {
        res.status(400).json({
            success: false,
            message: 'Validation échouée',
            errors: errors
        });
        return;
    }

    next();
};

export const validateUserUpdate = (req: Request, res: Response, next: NextFunction): void => {
    const { firstName, birthDate, email, gender, password } = req.body;
    const errors: string[] = [];

    if (firstName !== undefined && (typeof firstName !== 'string' || firstName.trim().length < 2)) {
        errors.push("Le prénom doit contenir au moins 2 caractères");
    }

    // Validation email (optionnel pour update)
    if (email !== undefined) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
        errors.push("L'email doit être valide");
        }
    }

    // Validation birthDate (optionnel pour update)
    if (birthDate !== undefined) {
        const birth = new Date(birthDate);
        const today = new Date();
        const age = today.getFullYear() - birth.getFullYear();
        if (isNaN(birth.getTime()) || age < 13 || age > 120) {
        errors.push("L'âge doit être entre 13 et 120 ans");
        }
    }

    // Validation gender (optionnel pour update)
    if (gender !== undefined) {
        const validGenders = ['male', 'female', 'other', 'homme', 'femme', 'autre'];
        if (!validGenders.includes(gender.toLowerCase())) {
        errors.push("Le genre doit être: male, female, other, homme, femme, ou autre");
        }
    }

    // Validation password (optionnel pour update)
    if (password !== undefined && (typeof password !== 'string' || password.length < 8)) {
        errors.push("Le mot de passe doit contenir au moins 8 caractères");
    }

    // Validation phone (optionnel)
    if (req.body.phone !== undefined && req.body.phone !== null && req.body.phone !== '') {
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        if (!phoneRegex.test(req.body.phone.replace(/[\s\-\(\)]/g, ''))) {
        errors.push("Le numéro de téléphone n'est pas valide");
        }
    }

    if (errors.length > 0) {
        res.status(400).json({
        success: false,
        message: "Erreurs de validation",
        errors
        });
        return;
    }

    next();
};