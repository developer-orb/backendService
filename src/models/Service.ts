import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../db/config"
import Users from "./Users";

interface ServiceAtributes {
    id: number;
    name: string;
    description?: string;
    price: number;
    duration: number;
    availability?: Record<string, unknown>
    professional_id?: number;
}

interface ServiceCreationAtributes extends Optional<ServiceAtributes, "id" | "description" | "availability" | "professional_id"> { }


class Service extends Model<ServiceAtributes, ServiceCreationAtributes> implements ServiceAtributes {
    public id!: number;
    public name!: string;
    public description?: string | undefined;
    public price!: number;
    public duration!: number;
    public availability?: Record<string, unknown>;
    public professional_id?: number;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Service.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
    },
    price: {
        type: DataTypes.DECIMAL(10, 2)
    },
    duration: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    availability: {
        type: DataTypes.JSON,
    },
    professional_id: {
        type: DataTypes.INTEGER.UNSIGNED,
    },
}, {
    sequelize,
    tableName: 'Services',
})

export default Service;