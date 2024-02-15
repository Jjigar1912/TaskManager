/**
 * @description Task Manager API 
 * @date February 6 , 2024
 * @version 1.0
 */

import express from 'express' ; 
import allRoutes from './src/modules/index.js';
import cookieParser from 'cookie-parser';


// Create an instance of the Express Application . 
const app = express() ; 

// Middleware to parse incoming json request . 
app.use(express.json());
app.use(cookieParser());

// combines all routes 
app.use('/',allRoutes);

// Export configured express application for use in other modules.
export default app ; 