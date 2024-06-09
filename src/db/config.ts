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

export const sequelize = new Sequelize(DB_NAME as string, DB_USER as string, DB_PASSWORD as string, {
  host: DB_HOST,
  port: Number(DB_PORT),
  dialect: 'postgres',
  logging: false,
});

console.log('DB_HOST:', DB_HOST);

const basename = path.basename(__filename);
const modelDefiners: Array<(sequelize: Sequelize) => void> = [];

// Read all model files in the models directory
readdirSync(path.join(__dirname, '/models'))
  .filter((file) => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.ts');
  })
  .forEach((file) => {
    const modelDefiner = require(path.join(__dirname, '/models', file)).default;
    modelDefiners.push(modelDefiner);
  });

// Define all models
modelDefiners.forEach(modelDefiner => modelDefiner(sequelize));

// Capitalize model names and reassign them in sequelize.models
Object.entries(sequelize.models).forEach(([name, model]) => {
  const capitalizedModelName = name.charAt(0).toUpperCase() + name.slice(1);
  sequelize.models[capitalizedModelName] = model;
  delete sequelize.models[name];
});

const { Users, Service, Appointment, Rating, Statistic } = sequelize.models as any;

// Relaciones Usuarios-Servicios
Service.belongsTo(Users, { as: 'professional', foreignKey: 'professional_id' });
Users.hasMany(Service, { as: 'services', foreignKey: 'professional_id' });

// Relaciones de Usuarios-Servicios-Citas
Appointment.belongsTo(Users, { as: 'client', foreignKey: 'client_id' });
Appointment.belongsTo(Service, { as: 'service', foreignKey: 'service_id' });
Users.hasMany(Appointment, { as: 'appointments', foreignKey: 'client_id' });
Service.hasMany(Appointment, { as: 'appointments', foreignKey: 'service_id' });

// Relaciones Usuarios/Servicios/Citas/Rating
Rating.belongsTo(Users, { as: 'professional', foreignKey: 'professional_id' });
Rating.belongsTo(Users, { as: 'client', foreignKey: 'client_id' });
Rating.belongsTo(Service, { as: 'service', foreignKey: 'service_id' });
Rating.belongsTo(Appointment, { as: 'appointment', foreignKey: 'appointment_id' });
Users.hasMany(Rating, { as: 'ratings', foreignKey: 'professional_id' });
Users.hasMany(Rating, { as: 'clientRatings', foreignKey: 'client_id' });

// Relaciones Usuarios-Estadisticas
Statistic.belongsTo(Users, { as: 'professional', foreignKey: 'professional_id' });
Users.hasMany(Statistic, { as: 'statistics', foreignKey: 'professional_id' });

export { sequelize as conn, Op, Users, Service, Appointment, Rating, Statistic };
