import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database";

// Interface TypeScript représentant les attributs d'un type d'animal
interface AnimalTypeAttributes {
  id: number;
  label: string;
  textIcon: string;
}

// Champs nécessaires lors de la création (id est auto-incrémenté)
interface AnimalTypeCreationAttributes extends Optional<AnimalTypeAttributes, "id"> {}

// Définition du modèle avec sequelize + TS
class AnimalType extends Model<AnimalTypeAttributes, AnimalTypeCreationAttributes> implements AnimalTypeAttributes {
  public id!: number;
  public label!: string;
  public textIcon!: string;
}

AnimalType.init(
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
    tableName: "animal_types",
    timestamps: true,
  }
);

export default AnimalType;