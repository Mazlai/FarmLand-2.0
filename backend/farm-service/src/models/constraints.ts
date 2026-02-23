import AnimalType from './animalType.models';
import AnimalStock from './animalStock.models';

AnimalType.hasMany(AnimalStock, {
  foreignKey: 'animalTypeId',
  as: 'animalStocks',
});

AnimalStock.belongsTo(AnimalType, {
  foreignKey: 'animalTypeId',
  as: 'animalType',
});

// Export de tous les modèles du farm-service
export {
  AnimalType,
  AnimalStock,
};

export default {
  AnimalType,
  AnimalStock,
};