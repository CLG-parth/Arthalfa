import express from 'express';
import path from "path";
import { fileURLToPath } from 'url';
import { stablishDbConnection } from "./db/connection.js";
import dotenv from 'dotenv';
import productRoutes from './routes/productRoutes.js'
import { scheduleJob } from 'node-schedule';
import { exec } from 'child_process';
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

app.get("/warm",(req,res)=>{
    res.send("I'm here to keep the server warm");
})
const job = scheduleJob('* */14 * * * *', function(){ // sending request in every 14 min
    // Send a request 
    if(process.env.NODE_ENV == 'production'){
       exec('./scripts/warm.sh',(err,stdout,stderr)=>{})
    }
});

app.listen(process.env.APP_PORT || 8989,()=>{
    process.stdout.write(`Server is up and running on ${process.env.APP_PORT || 8989}\n`);
})