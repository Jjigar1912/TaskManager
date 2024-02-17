import dotenv from 'dotenv'; 

// loading environment variable from .env file 
dotenv.config();

/* global process */

/**
 * @type {{
 * 
 *  DATABASE_URL , 
 *  PORT , 
 * 	DATABASE_NAME , 
 * 	DATABASE_HOST , 
 * 	DATABASE_PASSWORD , 
 * 	DATABASE_USER
 * 
 * }}
 */
const envConfig = { 
	DATABASE_URL : process.env.DATABASE_URL , 
	PORT : process.env.PORT || 4005 , 
	DATABASE_NAME : process.env.DATABASE_NAME , 
	DATABASE_HOST : process.env.DATABASE_HOST , 
	DATABASE_PASSWORD : process.env.DATABASE_PASSWORD , 
	DATABASE_USER : process.env.DATABASE_USER ,
	DATABASE_PORT : process.env.DATABASE_PORT , 
	JWT_KEY : process.env.JWT_KEY
};

// exporting envConfig to use in other modules . 
export default envConfig ; 