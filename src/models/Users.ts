import { Sequelize, DataTypes, Model, Optional } from 'sequelize';

interface UserAttributes {
  id: number;
  username: string;
  email: string;
  password: string;
  type: "client"|"professional";
  profession?: string;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id' | 'profession'> {}

export default (sequelize: Sequelize) => {
  class Users extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    public id!: number;
    public username!: string;
    public email!: string;
    public password!: string;
    public type!: 'client' | 'professional';
    public profession?: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
  }

  Users.init({
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password:{
      type: DataTypes.STRING,
      allowNull:false,
    },
    type:{
      type: DataTypes.ENUM("client","professional"),
      allowNull: false,
    },
    profession:{
      type: DataTypes.STRING,
    }
  }, {
    sequelize,
    modelName: 'users',
  });
  return Users;
};
