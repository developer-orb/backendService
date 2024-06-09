import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../db/config';

interface AppointmentAttributes {
    id: number;
    date: Date;
    time: string;
    status: 'solicitado'| 'confirmado'| 'cancelado'| 'completado';
    comment?: string;
    client_id?: number;
    service_id?: number;
}

interface AppointmentCreationAttributes extends Optional<AppointmentAttributes, "id" | "comment" | "client_id" | "service_id"> { }

class Appointment extends Model<AppointmentAttributes, AppointmentCreationAttributes> implements AppointmentAttributes {
    public id!: number;
    public date!: Date;
    public time!: string;
    public status!: 'solicitado'| 'confirmado'| 'cancelado'| 'completado';
    public comment?: string;
    public client_id?: number;
    public service_id?: number;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Appointment.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      time: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM('solicitado', 'confirmado', 'cancelado', 'completado'),
        allowNull: false,
      },
      comment: {
        type: DataTypes.STRING,
      },
      client_id: {
        type: DataTypes.INTEGER.UNSIGNED,
      },
      service_id: {
        type: DataTypes.INTEGER.UNSIGNED,
      },
},{
    sequelize,
    tableName: "Appointments"
})

export default Appointment;