import { Request, Response } from 'express';
import AnimalStock from '../models/animalStock.models';
import AnimalType from '../models/animalType.models';

//region animal types

/** Get all animal types. */
export const getAllAnimalTypesAsync = async (_req: Request, res: Response): Promise<void> => {
    try {
        res.status(200).json(await AnimalType.findAll({attributes: ['id', 'label', 'textIcon']}));
    } catch (error) {
        console.error("Error when getting animal types:", error);
        res.status(500).json({message: 'Error when getting animal types'});
    }
};

//endregion

//region animal stocks

/** Get the animal stock corresponding to the given ID. */
export const getAnimalStockByIdAsync = async (req: Request, res: Response): Promise<void> => {
    try {
        const idParam = req.params.id;
        if (!idParam) {
            res.status(400).json({message: 'An ID is required'});
            return;
        }

        const id = parseInt(idParam);
        if (isNaN(id)) {
            res.status(400).json({message: 'Invalid ID format'});
            return;
        }

        const animal = await AnimalStock.findByPk(id, {
            attributes: ['id', 'description', 'animalTypeId', 'count', 'userId'],
            include: [
                {
                    model: AnimalType,
                    as: 'animalType',
                    attributes: ['id', 'label'],
                    required: false
                }
            ]
        });

        const userId = await getUserIdFromReqAsync(req, res);
        if (userId) {

            if (!animal) {
                res.status(404).json({message: 'Animal stock not found'});
                return;
            }

            res.status(200).json(animal);

        }
    } catch (error) {
        console.error("Error when getting the animal stock:", error);
        res.status(500).json({message: 'Error when getting the animal stock'});
    }
};

/** Get the animal stocks of the current user. */
export const getCurrentUserAnimalStocksAsync = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = await getUserIdFromReqAsync(req, res);
        if (userId) {

            // Récupération des animaux de cet utilisateur
            const userAnimals = await AnimalStock.findAll({
                where: {userId},
                attributes: ['id', 'description', 'animalTypeId', 'count', 'userId'],
                include: [
                    {
                        model: AnimalType,
                        as: 'animalType',
                        attributes: ['id', 'label', 'textIcon'],
                        required: false
                    }
                ]
            });

            res.status(200).json(userAnimals);

        }
    } catch (error) {
        console.error("Error when getting current user animal stocks:", error);
        res.status(500).json({message: 'Error when getting current user animal stocks'});
    }
};

/** Add an animal stock linked to the current user. */
export const addAnimalStockAsync = async (req: Request, res: Response): Promise<void> => {
    try {
        const animal = req.body as { description: string, animalTypeId: number, count: number };

        // Validation des données
        if (!animal.animalTypeId || animal.count === undefined) {
            res.status(400).json({message: 'animalTypeId and count are required'});
            return;
        }

        // Vérifier que le type d'animal existe
        const animalTypeExists = await AnimalType.findByPk(animal.animalTypeId);
        if (!animalTypeExists) {
            res.status(404).json({message: 'Animal type not found'});
            return;
        }

        const userId = await getUserIdFromReqAsync(req, res);
        if (userId) {

            // Créer un nouvel animal
            const newAnimal = await AnimalStock.create({
                description: animal.description,
                animalTypeId: animal.animalTypeId,
                count: animal.count,
                userId: userId
            });

            // Récupérer l'animal avec ses relations
            const animalWithRelations = await AnimalStock.findByPk(newAnimal.id, {
                include: [
                    {
                        model: AnimalType,
                        as: 'animalType',
                        attributes: ['id', 'label']
                    }
                ]
            });

            res.status(201).json(animalWithRelations);

        }
    } catch (error) {
        console.error("Error when adding animal stock:", error);
        res.status(500).json({message: 'Error when adding animal stock'});
    }
};

/** Update an animal stock linked to the current user. */
export const updateAnimalStockAsync = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = await getUserIdFromReqAsync(req, res);
        if (userId) {

            const animal = req.body as { id: number, description: string, animalTypeId: number, count: number };

            const animalDb = await AnimalStock.findByPk(animal.id);
            if (!animalDb) {
                res.status(404).json({message: 'Animal stock not found'});
                return;
            }

            if (animalDb.userId !== userId) {
                res.status(403).json({message: 'Resource unauthorized'});
                return;
            }

            // Vérifier que le type d'animal existe
            if (animal.animalTypeId && animal.animalTypeId !== animal.animalTypeId) {
                const animalTypeExists = await AnimalType.findByPk(animal.animalTypeId);
                if (!animalTypeExists) {
                    res.status(404).json({message: 'Animal type not found'});
                    return;
                }
            }

            // Mettre à jour l'animal
            await animalDb.update({
                description: animal.description || animalDb.description,
                animalTypeId: animal.animalTypeId || animalDb.animalTypeId,
                count: animal.count !== undefined ? animal.count : animalDb.count
            });

            // Récupérer l'animal mis à jour avec ses relations
            const updatedAnimal = await AnimalStock.findByPk(animal.id, {
                include: [
                    {
                        model: AnimalType,
                        as: 'animalType',
                        attributes: ['id', 'label']
                    }
                ]
            });

            res.json(updatedAnimal);

        }
    } catch (error) {
        console.error("Error when updating animal stock:", error);
        res.status(500).json({message: 'Error when updating animal stock'});
    }
};

/** Deleting an animal stock linked to the current user. */
export const deleteAnimalStockAsync = async (req: Request, res: Response): Promise<void> => {
    try {
        const idParam = req.params.id;
        if (!idParam) {
            res.status(400).json({message: 'An ID is required'});
            return;
        }

        const id = parseInt(idParam);
        if (isNaN(id)) {
            res.status(400).json({message: 'Invalid ID format'});
            return;
        }

        const userId = await getUserIdFromReqAsync(req, res);
        if (userId) {

            const animal = await AnimalStock.findByPk(id);
            if (!animal) {
                res.status(404).json({message: 'Animal not found'});
                return;
            }

            if (animal.userId !== userId) {
                res.status(403).json({message: 'Resource unauthorized'});
                return;
            }

            await animal.destroy();
            res.status(204).json({message: 'Animal stock deleted for the current user'});

        }
    } catch (error) {
        console.error('Error deleting animal:', error);
        res.status(500).json({message: 'Internal server error'});
    }
};

//endregion

//region other methods

/**
 * Get the ID of the user corresponding to the token from the given request by requesting the user API, or send an error
 * in case of invalid data.
 * @param req The request.
 * @param res The response.
 * @returns The ID of the corresponding user, else `undefined`.
 */
async function getUserIdFromReqAsync(req: Request, res: Response): Promise<number | undefined> {
    try {

        // Extracting token from request headers
        const token = req.headers.authorization?.split(' ')[1];

        // Missing token
        if (!token) {
            res.status(401).json({message: "Missing token"});
            return undefined;
        }

        // Request the user API to verify the extracted token
        const response = await fetch(`${process.env.USER_SERVICE_URL}/verify-token`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            credentials: 'same-origin',
            body: JSON.stringify({token})
        })
            .then(res => res.text())
            .then(data => JSON.parse(data));

        if (!response.userId) {
            res.status(401).json({message: response.message});
            return
        }

        // Return the corresponding user ID
        return response?.userId;

    } catch (error) {
        console.error("Error fetching user ID from token:", error);
        res.status(401).json({message: "Resource unauthorized"});
        return undefined;
    }
}

//endregion