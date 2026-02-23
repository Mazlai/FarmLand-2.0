import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database";

// Interface TypeScript représentant les attributs d’un utilisateur
interface UserAttributes {
  id: number;
  firstName: string;
  lastName?: string;
  birthDate: Date;
  email: string;
  phone?: string;
  gender: string;
  passwordHash: string;
}

// Champs nécessaires lors de la création (id est auto-incrémenté)
interface UserCreationAttributes extends Optional<UserAttributes, "id" | "lastName" | "phone"> {}

// Définition du modèle avec sequelize + TS
class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: number;
  public firstName!: string;
  public lastName?: string;
  public birthDate!: Date;
  public email!: string;
  public phone?: string;
  public gender!: string;
  public passwordHash!: string;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    firstName: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    birthDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
    phone: {
      type: DataTypes.STRING(25),
      allowNull: true,
    },
    gender: {
      type: DataTypes.STRING(25),
      allowNull: false,
    },
    passwordHash: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "users",
    timestamps: true,
  }
);

export default User;
