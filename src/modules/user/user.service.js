/**
 * Class to handle user related serices . 
 */

import pool from '../../../config/db-config.js';
import { HTTP_RESPONSES } from '../../../constants/constant.js';
import User from './user.dal.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import envConfig from '../../../env.js';
import Team from '../teams/team.dal.js';
import Project from '../project/project.dal.js';



class UserService {

	/**
	 * 
	 * @description This is the registerService which will be used to insert data into db of new user.
	 * @param {Object} data respresent a user object 
	 * @returns {Object} returns response 
	 */
	static async registerService(data) {

		const { email } = data;

		const client = await pool.connect();

		try{

			const ans = await User.isAlreadyExistEmail(client, email);

			if (!ans) {
	
				const result = await User.createUser(client, data);
	
				const role = await User.getRoleId(client,data.role);
	
				await User.insertInUserRole(client,role.id,result.id);



				const response = {

					status : HTTP_RESPONSES.CREATED.statusCode , 
					message : 'User registered successfully.' , 
					data : result.id
				};

				console.log(response);
	
				return response;
	
			} else {
	
				const response = {
	
					status: HTTP_RESPONSES.CONFLICT.statusCode,
					message: 'Email Id is already exists.',
				};
	
				throw response;
			}
		
		}catch(e){

			console.log(e);
			throw e ; 
		
		}

	

	}

	/**
	 * 
	 * @description This is the login service which will be used to check credentials of the user . 
	 * @param {String} email represents a user email 
	 * @param {String} password represents a user password 
	 * @returns { Object } response 
	 */
	static async loginService(email,password){
	
		const client = await pool.connect(); 

		try{

			const ans = await User.getDetailsByEmail(client,email);

			if(ans){

				const passwordMatch = await bcrypt.compare(password,ans.password);

				if(passwordMatch){

					const { password , ...remaining } = ans ; 

					const role = await User.getRoleName(client,remaining.id); 

					remaining['role'] = role.name ; 

					const access_token = await jwt.sign(remaining,envConfig.JWT_KEY,{ expiresIn : '1h'});

					Object.assign(remaining,{access_token});

					const response = {
						
						status : HTTP_RESPONSES.SUCCESS.statusCode , 
						message : 'Login Successfull' , 
						data : access_token 

					};
					
					return response ; 

				}else{

					const response = {
						
						status : HTTP_RESPONSES.UNAUTHORIZED.statusCode , 
						message : 'Invalid Password' 

					};

					throw response ; 

				}

			}else{

				const response = {
					
					status : HTTP_RESPONSES.NOT_FOUND.statusCode , 
					message : 'User Not Found .' , 
				};

				return response ; 

			}

		}catch(e){

			throw e ; 

		}finally{

			client.release();
		
		}

	}

	/**
	 * 
	 * @description This is used to display user data . 
	 * @param {String|null} role represents a user role if it is not specified it will take null value . 
	 * @returns { Object } response 
	 */
	static async displayUserService(role=null){

		const client = await pool.connect();

		let response = null ;

		try{

			if(role==null){
				
				const data = await User.getAllUserData(client);

				response = {

					status : HTTP_RESPONSES.SUCCESS.statusCode , 
					message : 'UserDetails got successfully.' , 
					data  

				};

			}else{

				const data = await User.getAllUserData(client,role);

				response = {

					status : HTTP_RESPONSES.SUCCESS.statusCode , 
					message : 'UserDetails got successfully.' , 
					data  
					
				};

			}

			return response ; 

		}catch(e){

			throw e ; 

		}finally{

			client.release();
		
		}
	
	}


	/**
	 * 
	 * @description This is used to delete user from database parmanently and also remove role from user_role table  
	 * @static
	 * @async
	 * @param {uuid} id represent a user uuid  
	 * @returns {object}
	 */
	static async deleteUserService(id){
		
		// connecting with postgresql database 
		const client = await pool.connect(); 

		try{

			// delete user role from user_role table .
			const data1 = await User.deleteUserRoleById(client,id);

			// delete user details from user table . 
			const data2 = await User.deleteUserById(client,id);
			
			const role = await User.getRoleName(client,data2.id);

			
			
		  if(role.name==='DEVELOPER'){
				console.log(role);
				await Team.deleteTeamMemberByUserId(client,data2.id);

			}

			// assigning data2 properties into data1 
			Object.assign(data1,data2);

			// sending success response to client with data 
			const response = {

				status : HTTP_RESPONSES.SUCCESS.statusCode , 
				message : 'User Deleted Successfully' , 		

			};

			// returning response 
			return response ; 
			
		}catch(e){

			console.log(e);
			// thowing an error 
			throw e ; 
		
		}finally{

			// releasing connection with postgresql database 
			client.release();

		}
		
	}

	/**
	 * 
	 * @description Updating user details and role 
	 * @param { uuid } user_id represent a user id of user table 
	 * @param {Object} user_data represent a user data that wil be replaced with the old data  
	 */
	static async updateUserService(user_id,user_data){

		const client = await pool.connect();

		try{

			const { role , ...remaining } = user_data ; 

			const data1 = await User.updateUserDetails(client,user_id,remaining);

			if(role){
				
				const roleId = await User.getRoleId(client,role);

				const data2 = await User.updateUserRole(client,user_id,roleId.id);

				Object.assign(data1,data2);

			}

			const response = {

				status : HTTP_RESPONSES.SUCCESS.statusCode , 
				message : 'User Updated Successfully.'  

			}; 

			return response ; 

		}catch(e){

			throw e ; 
		
		}finally{
		
			client.release();
		
		}
	
	}


	/**
	 * 
	 * @async
	 * @static
	 * @description This is used to get details of user whose role is TL and who is not in any team . 
	 * @returns {Object} response 
	 */
	static async getTL(){

		// connecting with postgresql db 
		const client = await pool.connect();

		try{

			/**
			 * @type {Array<Object>} return an array of object. 
			 */
			// getting user details whose role is TL and stored in result variable 
			const result = await User.getTL(client); 

			const response = {

				status : HTTP_RESPONSES.SUCCESS.statusCode , 
				message : 'TL Details get successfully.'  , 
				data : result
			};
			
			return response ; 

		}catch(e){

			throw e ;
		
		}finally{

			// releasing connection 
			client.release();
		
		}
	}

	/**
	 * 
	 * @description This is used to get developer details who is not in any of the team . 
	 * @returns {Object} response
	 */
	static async getDeveloper(){

		const client = await pool.connect();

		try{

			const result = await User.getDeveloper(client);

			const response = {

				status : HTTP_RESPONSES.SUCCESS.statusCode , 
				message : 'Developer details got successfully.', 
				data : result  
				
			} ; 

			return response ; 

		}catch(e){

			throw e ; 
		
		}finally{

			client.release();

		}
	}



}

export default UserService; 