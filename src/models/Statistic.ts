import { DataTypes, Model, Optional } from 'sequelize';
import {sequelize} from '../db/config';

interface StatisticAttributes {
  id: number;
  totalSales: number;
  totalClients: number;
  weeklyStatistics: object; // Objeto para almacenar múltiples datos de semanas
  monthlyStatistics: object; // Objeto para almacenar múltiples datos de meses
  yearlyStatistics: object; // Objeto para almacenar múltiples datos de años
  professional_id?: number;
}

interface StatisticCreationAttributes extends Optional<StatisticAttributes, 'id' | 'totalSales' | 'totalClients' | 'weeklyStatistics' | 'monthlyStatistics' | 'yearlyStatistics' | 'professional_id'> {}

class Statistic extends Model<StatisticAttributes, StatisticCreationAttributes> implements StatisticAttributes {
  public id!: number;
  public totalSales!: number;
  public totalClients!: number;
  public weeklyStatistics!: object;
  public monthlyStatistics!: object;
  public yearlyStatistics!: object;
  public professional_id?: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Statistic.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    totalSales: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    totalClients: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    weeklyStatistics: {
      type: DataTypes.JSON, // Cambiado a JSON para almacenar múltiples datos de semanas
    },
    monthlyStatistics: {
      type: DataTypes.JSON, // Cambiado a JSON para almacenar múltiples datos de meses
    },
    yearlyStatistics: {
      type: DataTypes.JSON, // Cambiado a JSON para almacenar múltiples datos de años
    },
    professional_id: {
      type: DataTypes.INTEGER.UNSIGNED,
    },
  },
  {
    sequelize,
    tableName: 'Statistics',
  }
);

export default Statistic;