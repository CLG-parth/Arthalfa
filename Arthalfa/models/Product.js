'use strict';

const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Product.init({
    /**Requirements
      * id (integer, auto-increment)
      * name (string, required)
      * price (float, required)
      * description (string, optional)
      * category (string, required)
     */
    name: {type: DataTypes.STRING},
    price: {type: DataTypes.FLOAT},
    description: {type: DataTypes.STRING},
    category: {type: DataTypes.STRING}
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};