import pg from 'pg' ; 
import envConfig from '../env.js';

const Pool = pg.Pool ; 

const pool = new Pool({
	host: envConfig.DATABASE_HOST,
	password: envConfig.DATABASE_PASSWORD,
	user: envConfig.DATABASE_USER,
	port: envConfig.DATABASE_PORT,
	database: envConfig.DATABASE_NAME
});

export default pool ; 