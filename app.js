/**
 * @description Task Manager API 
 * @date February 6 , 2024
 * @version 1.0
 */

import express from 'express' ; 
import allRoutes from './src/modules/index.js';
import cookieParser from 'cookie-parser';
import swaggerUI from 'swagger-ui-express' ; 
import swaggerJSDoc from 'swagger-jsdoc';
import options from './config/swagger-config.js';

// Create an instance of the Express Application . 
const app = express() ; 


app.use('/schemas',express.static('./src/helper'));
const spec = swaggerJSDoc(options);

app.use('/api-doc',swaggerUI.serve,swaggerUI.setup(spec));

// Middleware to parse incoming json request . 
app.use(express.json());
app.use(cookieParser());

// combines all routes 
app.use('/',allRoutes);

// Export configured express application for use in other modules.
export default app ; 