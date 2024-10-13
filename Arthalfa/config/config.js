import dotenv from 'dotenv'

dotenv.config();

const sequelizeConfig = {
  development: {
    url: process.env.DATABASE_URL,
    dialect: 'postgres',
    dialectOptions: { ssl: { require: true } }
  },
};

export default sequelizeConfig;

// module.exports = sequelizeConfig; --> This is incorrect notation in ESmodule
// Ref: https://stackoverflow.com/questions/63975194/referenceerror-module-is-not-defined
