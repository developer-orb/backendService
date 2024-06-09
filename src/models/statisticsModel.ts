import { Sequelize, DataTypes, Model, Optional } from 'sequelize';

interface StatisticsAttributes {
  id: number;
  totalSales: number;
  totalClients: number;
  serviceStatistics: string;
  monthlyStatistics: string;
  professionalId: number;
}

interface StatisticsCreationAttributes extends Optional<StatisticsAttributes, 'id'> {}

export default (sequelize: Sequelize) => {
  class Statistics extends Model<StatisticsAttributes, StatisticsCreationAttributes> implements StatisticsAttributes {
    public id!: number;
    public totalSales!: number;
    public totalClients!: number;
    public serviceStatistics!: string;
    public monthlyStatistics!: string;
    public professionalId!: number;
  }

  Statistics.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    totalSales: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    totalClients: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    serviceStatistics: {
      type: DataTypes.STRING,
      allowNull: false
    },
    monthlyStatistics: {
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
    modelName: 'statistics',
  });

  return Statistics;
};
