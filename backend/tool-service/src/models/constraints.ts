import ToolType from './toolType.models';
import ToolStock from './toolStock.models';

ToolType.hasMany(ToolStock, {
  foreignKey: 'toolTypeId',
  as: 'toolStocks',
});

ToolStock.belongsTo(ToolType, {
  foreignKey: 'toolTypeId',
  as: 'toolType',
});

// Export de tous les modèles du farm-service
export {
  ToolType,
  ToolStock,
};

export default {
  ToolType,
  ToolStock,
};