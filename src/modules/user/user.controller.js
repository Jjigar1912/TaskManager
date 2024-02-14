import UserService from './user.service.js';
import { HTTP_RESPONSES } from '../../../constants/constant.js';

/**
 * 
 * @typedef { Object } response 
 * @property { String } status represents a status code for example 200  , 500 etc . 
 * @property { String } message represents a message for example Success , Internal Server Error
 * @property { data } data represent a data for example "User Details Got Successfully"
 * @property { Array<Object> } userDetails represent an array of Object Of USER Data . 
 * 
 */

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
            
			res.cookie('token',response.data, { maxAge: 60 * 60 * 1000 , httpOnly: true });
  
			// sends success if it is valid user 
			return res.status(HTTP_RESPONSES.SUCCESS.statusCode).json(response);
	
		}catch(e){
              
			console.log(e);

			if(e.status == 401) {
                
				// send status code 401 if user is unauthorized . 
				return res.status(e.status).json(e);
               
			}
			
			// send status code 500 if there is any server related error . 
			return res.status(HTTP_RESPONSES.INTERNAL_SERVER_ERROR.statusCode).json(e);
		
		}
	
	}

	/**
	 * 
	 * @description This will return user data either by role or all user data . 
	 * @param {Object} req Express Request Object
	 * @param {Object} res Express Response Object
	 * @returns { Object } RESPONSE 
	 */
	static async displayUser(req,res){

		try{

			// response is initialized with null . 
			let response = null ; 

			if(!req.query.role){
				
				/**
				 * 
				 * @type { response }
				 */
				response = await UserService.displayUserService();
			
			}else{

				/**
				 * 
				 * @type { response }
				 */
				response = await UserService.displayUserService(req.query.role);

			}

			// sends 200 code if any error is not encountered. 
			return res.status(HTTP_RESPONSES.SUCCESS.statusCode).json(response);

		}catch(e){

			// sends 500 code if any error occurs . 
			return res.status(HTTP_RESPONSES.INTERNAL_SERVER_ERROR.statusCode).json(e);
		
		}

	}

	/**
	 * 
	 * @static 
	 * @async
	 * @description Delete a record from User table 
	 * @param {Object} req represents a express request object 
	 * @param {Object} res represents a express response object  
	 * 
	 */
	static async deleteUser(req,res){

		try{

			/**
			 * @type { Object } response 
			 */
			// stored return value of deleteUserService in response 
			const response = await UserService.deleteUserService(req.params.id);

			return res.status(HTTP_RESPONSES.SUCCESS.statusCode).json(response); 
			
		}catch(e){

			// sends 500 code if any error occurs . 
			return res.status(HTTP_RESPONSES.INTERNAL_SERVER_ERROR.statusCode).json(e);

		}
	}

	/**
	 * 
	 * @static
	 * @async
	 * @param {Object} req Express Request Object 
	 * @param {Object} res Express Response Object
	 * @description This is used to update user information
	 * @returns 
	 */
	static async updateUser(req,res){

		try{
			
			/**
			 * @type { Object } response 
			 */
			// stored return value of updateUserService in response 
			const response = await UserService.updateUserService(req.params.id,req.body);
			
			return res.status(HTTP_RESPONSES.SUCCESS.statusCode).json(response);

		}catch(e){

			// sends 500 code if any error occurs . 
			return res.status(HTTP_RESPONSES.INTERNAL_SERVER_ERROR.statusCode).json(e);
			
		}
	}

	
	
	static async getAllTeamLead(req,res){
		
		try{

			const response = await UserService.getTL();

			return res.status(HTTP_RESPONSES.SUCCESS.statusCode).json(response);

		}catch(e){

			return res.status(HTTP_RESPONSES.INTERNAL_SERVER_ERROR.statusCode).json(e);
		
		}
	
	}


	static async getAllDeveloper(req,res){

		try{

			const response = await UserService.getDeveloper() ; 

			return res.status(HTTP_RESPONSES.SUCCESS.statusCode).json(response);

		}catch(e){

			return res.status(HTTP_RESPONSES.INTERNAL_SERVER_ERROR.statusCode).json(e);

		}

	}


	static async logoutUser(req,res){

		try{

			if(res.cookie.token){
				
				res.clearCookie('token');

			}
	
			const response = {
				status : HTTP_RESPONSES.SUCCESS.statusCode , 
				message : 'User is logged out successfully.'  
			};

			return res.status(HTTP_RESPONSES.SUCCESS.statusCode).json(response);

		}catch(error){

			return res.status(HTTP_RESPONSES.INTERNAL_SERVER_ERROR.statusCode).json(e);

		}
	}

}

export default UserController ;