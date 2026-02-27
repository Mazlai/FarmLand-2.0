import { Request, Response } from 'express';
//import ToolStock from '../models/toolStock.models';
import ToolType from '../models/toolType.models';
import ToolStock from '../models/toolStock.models';

//region tool types

/** Get all tool types. */
export const getAllToolTypesAsync = async (_req: Request, res: Response): Promise<void> => {
    try {
        res.status(200).json(await ToolType.findAll({attributes: ['id', 'label', 'textIcon']}));
    } catch (error) {
        console.error("Error when getting tool types:", error);
        res.status(500).json({message: 'Error when getting tool types'});
    }
};

//endregion

//region tool stocks

/** Get the tool stock corresponding to the given ID. */
export const getToolStockByIdAsync = async (req: Request, res: Response): Promise<void> => {
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

        const tool = await ToolStock.findByPk(id, {
            attributes: ['id', 'description', 'toolTypeId', 'count', 'userId'],
            include: [
                {
                    model: ToolType,
                    as: 'toolType',
                    attributes: ['id', 'label'],
                    required: false
                }
            ]
        });

        const userId = await getUserIdFromReqAsync(req, res);
        if (userId) {

            if (!tool) {
                res.status(404).json({message: 'tool stock not found'});
                return;
            }

            res.status(200).json(tool);

        }
    } catch (error) {
        console.error("Error when getting the tool stock:", error);
        res.status(500).json({message: 'Error when getting the tool stock'});
    }
};

/** Get the tool stocks of the current user. */
export const getCurrentUserToolStocksAsync = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = await getUserIdFromReqAsync(req, res);
        if (userId) {

            // Récupération des outils de cet utilisateur
            const userTools = await ToolStock.findAll({
                where: {userId},
                attributes: ['id', 'description', 'toolTypeId', 'count', 'userId'],
                include: [
                    {
                        model: ToolType,
                        as: 'toolType',
                        attributes: ['id', 'label', 'textIcon'],
                        required: false
                    }
                ]
            });

            res.status(200).json(userTools);

        }
    } catch (error) {
        console.error("Error when getting current user tool stocks:", error);
        res.status(500).json({message: 'Error when getting current user tool stocks'});
    }
};

/** Add a tool stock linked to the current user. */
export const addToolStockAsync = async (req: Request, res: Response): Promise<void> => {
    try {
        const tool = req.body as { description: string, toolTypeId: number, count: number };

        // Validation des données
        if (!tool.toolTypeId || tool.count === undefined) {
            res.status(400).json({message: 'toolTypeId and count are required'});
            return;
        }

        // Vérifier que le type d'outil existe
        const toolTypeExists = await ToolType.findByPk(tool.toolTypeId);
        if (!toolTypeExists) {
            res.status(404).json({message: 'Tool type not found'});
            return;
        }

        const userId = await getUserIdFromReqAsync(req, res);
        if (userId) {

            // Créer un nouvel outil
            const newTool = await ToolStock.create({
                description: tool.description,
                toolTypeId: tool.toolTypeId,
                count: tool.count,
                userId: userId
            });

            // Récupérer l'outil avec ses relations
            const toolWithRelations = await ToolStock.findByPk(newTool.id, {
                include: [
                    {
                        model: ToolType,
                        as: 'toolType',
                        attributes: ['id', 'label']
                    }
                ]
            });

            res.status(201).json(toolWithRelations);

        }
    } catch (error) {
        console.error("Error when adding tool stock:", error);
        res.status(500).json({message: 'Error when adding tool stock'});
    }
};

/** Update an tool stock linked to the current user. */
export const updateToolStockAsync = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = await getUserIdFromReqAsync(req, res);
        if (userId) {

            const tool = req.body as { id: number, description: string, toolTypeId: number, count: number };

            const toolDb = await ToolStock.findByPk(tool.id);
            if (!toolDb) {
                res.status(404).json({message: 'Tool stock not found'});
                return;
            }

            if (toolDb.userId !== userId) {
                res.status(403).json({message: 'Resource unauthorized'});
                return;
            }

            // Vérifier que le type d'outil existe
            if (tool.toolTypeId && tool.toolTypeId !== tool.toolTypeId) {
                const toolTypeExists = await ToolType.findByPk(tool.toolTypeId);
                if (!toolTypeExists) {
                    res.status(404).json({message: 'Tool type not found'});
                    return;
                }
            }

            // Mettre à jour l'outil
            await toolDb.update({
                description: tool.description || toolDb.description,
                toolTypeId: tool.toolTypeId || toolDb.toolTypeId,
                count: tool.count !== undefined ? tool.count : toolDb.count
            });

            // Récupérer l'outil mis à jour avec ses relations
            const updatedTool = await ToolStock.findByPk(tool.id, {
                include: [
                    {
                        model: ToolType,
                        as: 'toolType',
                        attributes: ['id', 'label']
                    }
                ]
            });

            res.json(updatedTool);

        }
    } catch (error) {
        console.error("Error when updating tool stock:", error);
        res.status(500).json({message: 'Error when updating tool stock'});
    }
};

/** Deleting a tool stock linked to the current user. */
export const deleteToolStockAsync = async (req: Request, res: Response): Promise<void> => {
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

            const tool = await ToolStock.findByPk(id);
            if (!tool) {
                res.status(404).json({message: 'Tool not found'});
                return;
            }

            if (tool.userId !== userId) {
                res.status(403).json({message: 'Resource unauthorized'});
                return;
            }

            await tool.destroy();
            res.status(204).json({message: 'Tool stock deleted for the current user'});

        }
    } catch (error) {
        console.error('Error deleting tool:', error);
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