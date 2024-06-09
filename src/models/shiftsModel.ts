import { Sequelize, DataTypes, Model, Optional } from 'sequelize';

interface AppointmentAttributes {
  id: number;
  date: string;
  time: string;
  status: string;
  comment: string;
  clientId: number;
  serviceId: number;
}

interface AppointmentCreationAttributes extends Optional<AppointmentAttributes, 'id'> {}

export default (sequelize: Sequelize) => {
  class Appointment extends Model<AppointmentAttributes, AppointmentCreationAttributes> implements AppointmentAttributes {
    public id!: number;
    public date!: string;
    public time!: string;
    public status!: string;
    public comment!: string;
    public clientId!: number;
    public serviceId!: number;
  }

  Appointment.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    date: {
      type: DataTypes.STRING,
      allowNull: false
    },
    time: {
      type: DataTypes.STRING,
      allowNull: false
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false
    },
    comment: {
      type: DataTypes.STRING,
      allowNull: true
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
    }
  }, {
    sequelize,
    modelName: 'appointments',
  });

  return Appointment;
};
