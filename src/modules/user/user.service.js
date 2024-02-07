/**
 * Class to handle user related serices . 
 */

import pool from '../../../config/db-config.js';
import { HTTP_RESPONSES } from '../../../constants/constant.js';
import User from './user.dal.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import envConfig from '../../../env.js';

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

		const ans = await User.isAlreadyExistEmail(client, email);

		if (!ans) {

			const response = await User.createUser(client, data);

			const role = await User.getRoleId(client,data.role);

			await User.insertInUserRole(client,role.id,response.id);

			return response;

		} else {

			const response = {

				status: HTTP_RESPONSES.CONFLICT.statusCode,
				message: HTTP_RESPONSES.CONFLICT.message,
				data: 'Email Id is already exists.'

			};

			throw response;
		}

	}

	static async loginService(email,password){
	
		const client = await pool.connect(); 

		try{

			const ans = await User.getDetailsByEmail(client,email);

			if(ans){

				const passwordMatch = await bcrypt.compare(password,ans.password);

				if(passwordMatch){

					const { password , ...remaining } = ans ; 

					const access_token = await jwt.sign(remaining,envConfig.JWT_KEY,{ expiresIn : '3600'});

					Object.assign(ans,{access_token});

					const response = {
						
						status : HTTP_RESPONSES.SUCCESS.statusCode , 
						message : HTTP_RESPONSES.SUCCESS.message , 
						data : 'Login Successfull',
						userDetails : ans  

					};

					return response ; 

				}else{

					const response = {
						
						status : HTTP_RESPONSES.UNAUTHORIZED.statusCode , 
						message : HTTP_RESPONSES.UNAUTHORIZED.message , 
						data : 'Invalid Password'

					};

					throw response ; 

				}

			}else{

				const response = {
					
					status : HTTP_RESPONSES.NOT_FOUND.statusCode , 
					message : HTTP_RESPONSES.NOT_FOUND.message , 
					data : 'User Not Found .' 

				};

				throw response ; 

			}

		}catch(e){

			throw e ; 

		}finally{

			client.release();
		
		}

	}

}

export default UserService; 