import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database";
import type ToolType from "./toolType.models";

interface ToolStockAttributes {
  id: number;
  description: string;
  toolTypeId: number;
  count: number;
  userId: number;
}

// Champs nécessaires lors de la création (id est auto-incrémenté)
interface ToolStockCreationAttributes extends Optional<ToolStockAttributes, "id"> {}

// Définition du modèle avec sequelize + TS
class ToolStock extends Model<ToolStockAttributes, ToolStockCreationAttributes> implements ToolStockAttributes {
  public id!: number;
  public description!: string;
  public toolTypeId!: number;
  public count!: number;
  public userId!: number;
  public readonly toolType?: ToolType;
}

ToolStock.init(
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
    toolTypeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: ToolStock,
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
    tableName: "tool_types",
    timestamps: true,
  }
);

export default ToolStock;