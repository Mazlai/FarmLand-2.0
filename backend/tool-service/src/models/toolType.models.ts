import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database";

// Interface TypeScript représentant les attributs d'un type d'outil
interface ToolTypeAttributes {
  id: number;
  label: string;
  textIcon: string;
}

// Champs nécessaires lors de la création (id est auto-incrémenté)
interface ToolTypeCreationAttributes extends Optional<ToolTypeAttributes, "id"> {}

// Définition du modèle avec sequelize + TS
class ToolType extends Model<ToolTypeAttributes, ToolTypeCreationAttributes> implements ToolTypeAttributes {
  public id!: number;
  public label!: string;
  public textIcon!: string;
}

ToolType.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    label: {
      type: DataTypes.STRING(25),
      allowNull: false,
      unique: true,
    },
    textIcon: {
      type: DataTypes.STRING(2),
      allowNull: true
    }
  },
  {
    sequelize,
    tableName: "tool_types",
    timestamps: true,
  }
);

export default ToolType;