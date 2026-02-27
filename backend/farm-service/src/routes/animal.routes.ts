import express from 'express';
import {
    addAnimalStockAsync,
    deleteAnimalStockAsync,
    getAllAnimalTypesAsync,
    getAnimalStockByIdAsync,
    getCurrentUserAnimalStocksAsync,
    updateAnimalStockAsync
} from '~/controllers/animal.controller';

const router = express.Router();

//region animal stocks

/**
 * @swagger
 * /my-farm:
 *   get:
 *     summary: Get the animal stocks of the currently authenticated user.
 *     produces:
 *       - application/json
 *     responses:
 *       "200":
 *         description: Return the corresponding animal stocks.
 *       "500":
 *         description: Other server error.
 */
router.get('/my-farm', getCurrentUserAnimalStocksAsync);

/**
 * @swagger
 * /my-farm:
 *   post:
 *     summary: Create a new farm stock linked to the currently authenticated user.
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: description
 *         type: string
 *         example: Pig stock
 *       - name: animalTypeId
 *         type: number
 *         example: 5
 *       - name: count
 *         type: number
 *         example: 3
 *     responses:
 *       "201":
 *         description: The animal stock was added and is returned.
 *       "400":
 *         description: Missing data.
 *       "404":
 *         description: Animal type not found.
 *       "500":
 *         description: Other server error.
 */
router.post('/my-farm', addAnimalStockAsync);

/**
 * @swagger
 * /my-farm:
 *   put:
 *     summary: Update one of the animal stocks linked to the currently authenticated user.
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: description
 *         type: string
 *         example: Pig stock
 *       - name: animalTypeId
 *         type: number
 *         example: 5
 *       - name: count
 *         type: number
 *         example: 3
 *     responses:
 *       "201":
 *         description: The animal stock was updated and is returned.
 *       "403":
 *         description: Unauthorized operation.
 *       "404":
 *         description: Data not found.
 *       "500":
 *         description: Other server error.
 */
router.put('/my-farm', updateAnimalStockAsync);

/**
 * @swagger
 * /my-farm/{id}:
 *   get:
 *     summary: Get one of the animal stocks linked to the currently authenticated user.
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: id
 *     responses:
 *       "200":
 *         description: Return the corresponding animal stock.
 *       "500":
 *         description: Other server error.
 */
router.get('/my-farm/:id', getAnimalStockByIdAsync);

/**
 * @swagger
 * /my-farm/{id}:
 *   delete:
 *     summary: Get the animal stocks of the currently authenticated user.
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: id
 *     responses:
 *       "200":
 *         description: Return the corresponding animal stocks.
 *       "500":
 *         description: Other server error.
 */
router.delete('/my-farm/:id', deleteAnimalStockAsync);

//endregion

//region animal types

/**
 * @swagger
 * /animal-types:
 *   get:
 *     summary: Get all animal types.
 *     produces:
 *       - application/json
 *     responses:
 *       "200":
 *         description: Return the corresponding animal types.
 *       "500":
 *         description: Other server error.
 */
router.get('/animal-types', getAllAnimalTypesAsync);

//endregion

export default router;
