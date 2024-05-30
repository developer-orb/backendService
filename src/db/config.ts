import { config } from 'dotenv';
import { Sequelize, Op } from 'sequelize';
import path from 'path';
import { readdirSync } from 'fs';

config();

const {
  DB_USER,
  DB_PASSWORD,
  DB_HOST,
  DB_NAME,
  DB_PORT
} = process.env;

const sequelize = new Sequelize(DB_NAME as string, DB_USER as string, DB_PASSWORD as string, {
  host: DB_HOST,
  port: Number(DB_PORT),
  dialect: 'postgres',
  logging: false,
});

console.log('DB_HOST:', DB_HOST);

const basename = path.basename(__filename);
const modelDefiners: Array<(sequelize: Sequelize) => void> = [];

readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.ts'))
  .forEach((file) => {
    const modelDefiner = require(path.join(__dirname, '/models', file)).default;
    modelDefiners.push(modelDefiner);
  });

  modelDefiners.forEach(modelDefiner => modelDefiner(sequelize));

  const entries = Object.entries(sequelize.models);
  entries.forEach(([name, model]) => {
    sequelize.models[name[0].toUpperCase() + name.slice(1)] = model;
    delete sequelize.models[name];
  });

const { Users } = sequelize.models as any;

export { sequelize as conn, Op, Users };
