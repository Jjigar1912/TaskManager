/**
 * 
 * Validate Schema middleware
 */
import { HTTP_RESPONSES } from '../../constants/constant.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'; 
import envConfig from '../../env.js';

const validateSchema = (schema) => (req,res,next) => {
    
	if(req.body.role)
		req.body.role = req.body.role.toUpperCase();
	const { error } = schema.validate(req.body,{ abortEarly : false });
    
	if(error){
		
		/**
		 * 
		 * Represent a response object contains status , message , data 
		 * @type {{
		 * 
		 * 	status , 
		 * 	message , 
		 * 	data
		 * 
		 * }}
		 */
		const response = {
           
			status : HTTP_RESPONSES.BAD_REQUEST.statusCode, 
			message : HTTP_RESPONSES.BAD_REQUEST.message , 
			data : error.details 

		};
		// Sends 400 status code if it is a bad request . 
		return res.status(HTTP_RESPONSES.BAD_REQUEST.statusCode).json(response);
	
	}
	// If validation passes , continue to next function . 
	next();

};

const hashPassword = async (req,res,next) => {

	try{

		const hashPassword = await bcrypt.hash(req.body.password,10);

		req.body.password = hashPassword ;

		next();
		

	}catch(error){
		
		const response = {

			status : HTTP_RESPONSES.INTERNAL_SERVER_ERROR.statusCode , 
			message : HTTP_RESPONSES.INTERNAL_SERVER_ERROR.message

		};

		return res.status(HTTP_RESPONSES.INTERNAL_SERVER_ERROR.statusCode).json(response);

	}
};

const storeAdminId = async (req,res,next)=>{

	if(req.cookies.token){

		try{
		
			const data = await jwt.verify(req.cookies.token,envConfig.JWT_KEY);
		
		}catch(error){

			if(error instanceof jwt.TokenExpiredError){

				return res.status(400).json(error);
				
			}
		}
	
	}

}

export {
	validateSchema , 
	hashPassword , 
	storeAdminId 	
};




