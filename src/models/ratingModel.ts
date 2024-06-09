import { Sequelize, DataTypes, Model, Optional } from 'sequelize';

interface ReviewAttributes {
  id: number;
  rating: number;
  comment: string;
  date: string;
  professionalId: number;
  clientId: number;
  serviceId: number;
  appointmentId: number;
}

interface ReviewCreationAttributes extends Optional<ReviewAttributes, 'id'> {}

export default (sequelize: Sequelize) => {
  class Review extends Model<ReviewAttributes, ReviewCreationAttributes> implements ReviewAttributes {
    public id!: number;
    public rating!: number;
    public comment!: string;
    public date!: string;
    public professionalId!: number;
    public clientId!: number;
    public serviceId!: number;
    public appointmentId!: number;
  }

  Review.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    comment: {
      type: DataTypes.STRING,
      allowNull: true
    },
    date: {
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
    },
    clientId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    serviceId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'services',
        key: 'id'
      }
    },
    appointmentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'appointments',
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'reviews',
  });

  return Review;
};
