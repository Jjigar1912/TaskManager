
import envConfig from '../env.js';
import http from 'http';
import app from '../app.js';

// Creates a http server using configured Express application . 
const server = http.createServer(app);

// assigning PORT from env.js file
const PORT = envConfig.PORT ;

// Start the server by specified PORT 
server.listen(PORT);
