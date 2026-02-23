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

router.get('/my-farm', getCurrentUserAnimalStocksAsync);
router.post('/my-farm', addAnimalStockAsync);
router.put('/my-farm', updateAnimalStockAsync);
router.get('/my-farm/:id', getAnimalStockByIdAsync);
router.delete('/my-farm/:id', deleteAnimalStockAsync);

//endregion

//region animal types

router.get('/animal-types', getAllAnimalTypesAsync);

//endregion

export default router;
