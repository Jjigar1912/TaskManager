import UserService from './user.service.js';
import { HTTP_RESPONSES } from '../../../constants/constant.js';

/**
 * Class to handle all user related task - login , logout , register
 */
class UserController
{
	/**
     * Registers a new user
     * @async
     * @static
     * @param {Object} req Express Request Object
     * @param {Object} res Express Response Object
     */
	static async registerUser(req,res){

		try{
			
			// calling register sevices with req.body 
			const response = await UserService.registerService(req.body);
               
			// Sends status code 201 if it saves data correctly.
			return res.status(HTTP_RESPONSES.CREATED.statusCode).json(response);

		}catch(e){

			if(e.status==409){
                    
				// sends status code 409 if email is already exists . 
				return res.status(HTTP_RESPONSES.CONFLICT.statusCode).json(e);
			
			}
			
			// sends status code 501 if there is any server related error . 
			return res.status(HTTP_RESPONSES.INTERNAL_SERVER_ERROR.statusCode).json(e);
          
		}
		
	
	}
     
	/**
      * 
      * @async
      * @static
      * @param {req} req Express Request object
      * @param {res} res Express Response Object
      *  
      */
	static async loginUser(req,res){
	
		try{
               
			// return data stored in response which contains status , userdetails 
			const response = await UserService.loginService(req.body.email,req.body.password);
               
			// sends success if it is valid user 
			return res.status(HTTP_RESPONSES.SUCCESS.statusCode).json(response);
	
		}catch(e){
              
			if(e.status == 401) {
                
				// send status code 401 if user is unauthorized . 
				return res.status(e.status).json(e);
               
			}
			
			// send status code 500 if there is any server related error . 
			return res.status(500).json(e);
		
		}
	
	}


}

export default UserController ;