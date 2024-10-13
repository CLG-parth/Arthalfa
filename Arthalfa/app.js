import express from 'express';
import path from "path";
import { fileURLToPath } from 'url';
import { stablishDbConnection } from "./db/connection.js";
import dotenv from 'dotenv';
import productRoutes from './routes/productRoutes.js'
const app = express();

dotenv.config();

const __filename = fileURLToPath(import.meta.url); 
const __dirname = path.dirname(__filename); 

// for parsing the body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// serving static files (css and js)
app.use(express.static(path.join(__dirname, 'public')));
// connecting to database
stablishDbConnection();

// Routes
app.use("",productRoutes);

app.listen(process.env.APP_PORT || 8989,()=>{
    process.stdout.write(`Server is up and running on ${process.env.APP_PORT || 8989}\n`);
})