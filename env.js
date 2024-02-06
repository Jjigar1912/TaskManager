import dotenv from 'dotnev'; 

// loading environment variable from .env file 
dotenv.config();

/* global process */

/**
 * @type {{
 * 
 *  DATABASE_URL , 
 *  PORT
 * 
 * }}
 */
const envConfig = { 
	DATABASE_URL : process.env.DATABASE_URL , 
	PORT : process.env.PORT || 3000 
};

// exporting envConfig to use in other modules . 
export default envConfig ; 