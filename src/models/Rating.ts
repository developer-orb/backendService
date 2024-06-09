import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../db/config';

interface RatingAttributes {
    id: number;
    rating: number; //Puntaje
    comment?: string;  //Comentario
    date: Date;  //Fecha
    professional_id?: number;
    client_id?: number;
    service_id?: number;
    appointment_id?: number;
}

interface RatingCreationAttributes extends Optional<RatingAttributes, 'id' | 'comment' | 'professional_id' | 'client_id' | 'service_id' | 'appointment_id'> { }

class Rating extends Model<RatingAttributes, RatingCreationAttributes> implements RatingAttributes {
    public id!: number;
    public rating!: number;
    public comment?: string;
    public date!: Date;
    public professional_id?: number;
    public client_id?: number;
    public service_id?: number;
    public appointment_id?: number;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Rating.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        rating: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        comment: {
            type: DataTypes.STRING,
        },
        date: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
        professional_id: {
            type: DataTypes.INTEGER.UNSIGNED,
        },
        client_id: {
            type: DataTypes.INTEGER.UNSIGNED,
        },
        service_id: {
            type: DataTypes.INTEGER.UNSIGNED,
        },
        appointment_id: {
            type: DataTypes.INTEGER.UNSIGNED,
        },
    },
    {
        sequelize,
        tableName: 'Ratings',
    }
);

export default Rating;
