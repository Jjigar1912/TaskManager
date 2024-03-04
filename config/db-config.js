import pg from 'pg';
import envConfig from '../env.js';
// console.log(envConfig);
const Pool = pg.Pool;

const pool = new Pool({
	host: envConfig.DATABASE_HOST,
	password: envConfig.DATABASE_PASSWORD,
	user: envConfig.DATABASE_USER,
	port: envConfig.DATABASE_PORT,
	database: envConfig.DATABASE_NAME
});
pool.on('connect', () => {
	// console.log('conneced');
});
pool.on('error', (err) => {
	// console.log(err);
});

// console.log(pool);

export default pool; 