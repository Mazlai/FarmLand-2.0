import express from 'express';
import {
    addToolStockAsync,
    deleteToolStockAsync,
    getAllToolTypesAsync,
    getToolStockByIdAsync,
    getCurrentUserToolStocksAsync,
    updateToolStockAsync
} from '~/controllers/tool.controller';

const router = express.Router();

//region animal stocks

router.get('/my-tools', getCurrentUserToolStocksAsync);
router.post('/my-tools', addToolStockAsync);
router.put('/my-tools', updateToolStockAsync);
router.get('/my-tool/:id', getToolStockByIdAsync);
router.delete('/my-tool/:id', deleteToolStockAsync);

//endregion

//region animal types

router.get('/tool-types', getAllToolTypesAsync);

//endregion

export default router;
