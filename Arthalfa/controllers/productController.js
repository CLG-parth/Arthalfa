/**Requirements
 * POST /products - Add a new product.
 * GET /products - Get a list of all products.
 * GET /products/:id - Get details of a single product by ID.
 * PUT /products/:id - Update an existing product.
 * DELETE /products/:id - Delete a product by ID.
 */

import { Sequelize, DataTypes, Op } from "sequelize";
import ProductModel from "../models/Product.js"; 
import { config } from "dotenv";
config();
const sequelize = new Sequelize(process.env.DATABASE_URL);
const Product = ProductModel(sequelize, DataTypes);

export const addProduct = async (req,res)=>{
    try{
        const {name,price,description,category} = req.body;

        const newProduct = await sequelize.transaction({
            isolationLevel: Transaction.ISOLATION_LEVELS.READ_UNCOMMITTED,
          },async function (transaction) {

            const newProduct = await Product.create({ 
                    name:name,
                    price:price,
                    description:description,
                    category:category 
                },{ transaction });
            
            return newProduct;
        
        });

        res.status(201).json({message: `Product added successfully ${newProduct.id}`});
    }catch(err){    
        console.error(err);
        res.status(500).json({message: "Internal Server Error"});
    }   
}

export const getProductList = async (req,res)=>{
    try{
        let { query, page, limit } = req.query;
        if(!query) query = "";

        const allProducts = await sequelize.transaction({
            isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED,
          },async function (transaction) {

            const allProducts = await Product.findAll({
                where: {
                    [Op.or]: [
                      { name: { [Op.iLike]: `%${query}%` } },
                      { category: { [Op.iLike]: `%${query}%` } }
                    ]
                  },
                limit: limit || 10,
                offset: page || 0,
                attributes: {exclude: ['createdAt','updatedAt']}
            },{ transaction });
            
            return allProducts;
        
        });
        
        res.status(200).json(allProducts);
    }catch(err){
        console.error(err);
        res.status(500).json({message: "Internal Server Error"});
    }
}

export const getProduct = async (req,res) => {
    try{
        const {id} = req.params;
        
        const existingProduct = await sequelize.transaction({
            isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED,
          },async function (transaction) {
            const existingProduct = await Product.findByPk(id,{attributes: {exclude: ['createdAt','updatedAt']}},{ transaction });
            return existingProduct;
        });
        
        if(!existingProduct){
            return res.status(404).json({message: "The product with id " + id + " does not exists"});
        }
        res.status(200).json(existingProduct);
    }catch(err){
        console.error(err);
        res.status(500).json({message: "Internal Server Error"});
    }
}

export const updateProduct = async (req,res) => {
    try{    
        const {id} = req.params;
        const {name,price,description,category} = req.body;
        
        const existingProduct = await sequelize.transaction({
            isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED,
          },async function (transaction) {
            const existingProduct = await Product.findByPk(id,{attributes: {exclude: ['createdAt','updatedAt']}},{ transaction });
            return existingProduct;
        });
        
        if(!existingProduct){
            return res.status(404).json({message: "The product with id " + id + " does not exists"});
        }
        
        await sequelize.transaction(async function (transaction) {
            await Product.update({
                ...(name && {name}),
                ...(price && {price}),
                ...(description && {description}),
                ...(category && {category}),
            },{where: {id: id}},
            { transaction });
        });
        
        res.status(200).json({message: `Product updated with product id ${id}`});
    }catch(err){
        console.error(err);
        res.status(500).json({message: "Internal Server Error"});
    }
}

export const deleteProduct = async (req,res) => {
    try{
        const {id} = req.params;

        const existingProduct = await sequelize.transaction({
            isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED,
          },async function (transaction) {
            const existingProduct = await Product.findByPk(id,{attributes: {exclude: ['createdAt','updatedAt']}},{ transaction });
            return existingProduct;
        });
        
        if(!existingProduct){
            return res.status(404).json({message: "The product with id " + id + " does not exists"});
        }

        await sequelize.transaction({
            isolationLevel: Transaction.ISOLATION_LEVELS.READ_UNCOMMITTED,
          },async function (transaction) {
            await Product.destroy({where: {id:id}},{transaction});
        })
        
        res.status(200).json({message: `Product deleted with product id ${id}`});
    }catch(err){
        console.error(err);
        res.status(500).json({message: "Internal Server Error"});
    }
}