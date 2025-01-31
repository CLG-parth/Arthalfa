import { Sequelize } from "sequelize";

export const stablishDbConnection = () => {
  const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true, 
        rejectUnauthorized: false
      }
    }
  });
  
  sequelize.authenticate()
    .then(() => {
      console.log('Connection to Neon database established successfully.');
    })
    .catch(err => {
      console.error('Unable to connect to the database:', err);
    });
}