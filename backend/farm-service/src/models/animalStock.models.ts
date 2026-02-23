import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database";
import AnimalType from "./animalType.models";

// Interface TypeScript représentant les attributs d'un stock d'animal
interface AnimalStockAttributes {
  id: number;
  description: string;
  animalTypeId: number;
  count: number;
  userId: number;
}

// Champs nécessaires lors de la création (id est auto-incrémenté)
interface AnimalStockCreationAttributes extends Optional<AnimalStockAttributes, "id"> {}

// Définition du modèle avec sequelize + TS
class AnimalStock extends Model<AnimalStockAttributes, AnimalStockCreationAttributes> implements AnimalStockAttributes {
  public id!: number;
  public description!: string;
  public animalTypeId!: number;
  public count!: number;
  public userId!: number;
  public readonly animalType?: AnimalType;
}

AnimalStock.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    description: {
      type: DataTypes.STRING(25),
      allowNull: true,
    },
    animalTypeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: AnimalType,
        key: 'id',
      },
    },
    count: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      validate: {
        min: 0,
      },
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  },
  {
    sequelize,
    tableName: "animal_stocks",
    timestamps: true,
  }
);

export default AnimalStock;