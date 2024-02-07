/**
 * Class to handle user related all queries . 
 */
class User {

	/**
	 * 
	 * @description This is used to check whether email is already exists or not . 
	 * @param {Object} client represent a pg client object
	 * @param {String} email represent a user email 
	 * @returns {boolean} Returns true if email is already exists otherwise no . 
	 */
	static async isAlreadyExistEmail(client, email) {
		const getEmail = 'SELECT * FROM "user" WHERE "email" = $1 ';
		const result = await client.query(getEmail, [email]);
		return result.rows.length > 0 ? true : false;
	}

	/**
	 * 
	 * @description This is used to insert new user into the database . 
	 * @param {Object} client represent a pg client object 
	 * @param {Object} user represent a user object 
	 * @returns {Object} Returns an object representing the created user . 
	 */
	static async createUser(client, user) {
		const insertData = 'INSERT INTO "user"("userName","email","contact","password") VALUES($1,$2,$3,$4) RETURNING *';
		const { email, password, contact, username } = user;
		const result = await client.query(insertData, [username, email, contact, password]);
		return result.rows[0];
	}

	/**
	 * 
	 * @description This is used to get details of user by email . 
	 * @param {Object} client represent a pg client object
	 * @param {String} email represent a email of user 
	 * @returns { Object } Returns an object of user specified in email .
	 */
	static async getDetailsByEmail(client,email){
		const query = 'SELECT * FROM "user" WHERE "email" = $1';
		const result = await client.query(query,[email]);
		return result.rows[0];
	}


	/**
	 * 
	 * @description This is used to get role id of the user . 
	 * @param {Object} client represent a pg client object 
	 * @param {String} role represent a role 
	 * @returns { Object } Returns an object of role includes id , name , code . 
	 */
	static async getRoleId(client,role){
		const query = 'SELECT id from "userRole" WHERE "name" = $1';
		const result = await client.query(query,[role.toUpperCase()]);
		return result.rows[0];
	}


	/**
	 * 
	 * @description This is used to map user and it's role . 
	 * @param {Object} client represent a pg client object 
	 * @param {Serial} role_id represent a role id 
	 * @param {uuid} user_id represent a user id 
	 * @returns { Object } Returns an newly inserted object .  
	 */
	static async insertInUserRole(client,role_id,user_id){
		const query = 'INSERT INTO "user_role"("user_id","role_id") VALUES($1,$2)';
		const result = await client.query(query,[user_id,role_id]);
		return result.rows[0];
	}

}

export default User;