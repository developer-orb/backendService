import { Sequelize, DataTypes, Model, Optional } from 'sequelize';

interface ServiceAttributes {
  id: number;
  name: string;
  description: string;
  price: number;
  duration: number;
  availability: string;
  professionalId: number;
}

interface ServiceCreationAttributes extends Optional<ServiceAttributes, 'id'> {}

export default (sequelize: Sequelize) => {
  class Service extends Model<ServiceAttributes, ServiceCreationAttributes> implements ServiceAttributes {
    public id!: number;
    public name!: string;
    public description!: string;
    public price!: number;
    public duration!: number;
    public availability!: string;
    public professionalId!: number;
  }

  Service.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    availability: {
      type: DataTypes.STRING,
      allowNull: false
    },
    professionalId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'services',
  });

  return Service;
};
