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
		const { email, password, contact, userName } = user;
		const result = await client.query(insertData, [userName, email, contact, password]);
		return result.rows[0];
	}

	/**
	 * 
	 * @description This is used to get details of user by email . 
	 * @param {Object} client represent a pg client object
	 * @param {String} email represent a email of user 
	 * @returns { Object } Returns an object of user specified in email .
	 */
	static async getDetailsByEmail(client, email) {
		const query = 'SELECT * FROM "user" WHERE "email" = $1 AND "is_deleted" = $2';
		const result = await client.query(query, [email, false]);
		return result.rows[0];
	}


	/**
	 * 
	 * @description This is used to get role id of the user . 
	 * @param {Object} client represent a pg client object 
	 * @param {String} role represent a role 
	 * @returns { Object } Returns an object of role includes id , name , code . 
	 */
	static async getRoleId(client, role) {
		const query = 'SELECT id from "userRole" WHERE "name" = $1';
		const result = await client.query(query, [role.toUpperCase()]);
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
	static async insertInUserRole(client, role_id, user_id) {
		const query = 'INSERT INTO "user_role"("user_id","role_id") VALUES($1,$2)';
		const result = await client.query(query, [user_id, role_id]);
		return result.rows[0];
	}

	/**
	 * 
	 * @static
	 * @async
	 * @param {client} client represent a pg client object .  
	 * @param {String} queryParam represent a category
	 * @returns {Array<Object>} returns all user data if role = null otherwise return data by specified role . 
	 */
	static async getAllUserData(client, role = null) {

		let query = null;
		let result = null;
		if (role === null) {

			query = `SELECT 
				"user"."id" , 
				"user"."userName" , 
				"user"."email" , 
				"user"."contact" , 
				"user"."createdAt" , 
				"userRole"."name" AS "role"
				FROM "user" 
				INNER JOIN "user_role" ON "user"."id" = "user_role"."user_id" 
				INNER JOIN "userRole" ON "userRole"."id" = "user_role"."role_id" WHERE "user"."is_deleted" = $1 ORDER BY "userRole"."name" ` ;

			// console.log(query);
			result = await client.query(query, [false]);
			// console.log(result);
		} else {

			query = `SELECT 
						"user"."id" , 
						"user"."userName" , 
						"user"."email" , 
						"user"."contact" , 
						"user"."createdAt" , 
						"userRole"."name" AS "role"
						FROM "user" 
						INNER JOIN "user_role" ON "user"."id" = "user_role"."user_id" 
						INNER JOIN "userRole" ON "userRole"."id" = "user_role"."role_id" 
						WHERE "userRole"."name" = $1 AND  "user"."is_deleted" = $2 ORDER BY "userRole"."name"  ` ;

			result = await client.query(query, [role.toUpperCase(), false]);

		}
		// console.log(result.rowsCount, result.rowCount);
		return result.rows;

	}

	/**
	 * 
	 * @static
	 * @async
	 * @param {uuid} id represent a user id . 
	 * @returns { Object } returns a deleted entry from user table 
	 */
	static async deleteUserById(client, id) {

		const query = 'UPDATE "user" SET "is_deleted" = $1 WHERE "id" = $2 RETURNING * ';
		const result = await client.query(query, [true, id]);
		return result.rows[0];

	}


	/**
	 * 
	 * @static
	 * @async
	 * @param {Object} client represents a client object  
	 * @param {uuid } id represents a user id 
	 * @returns { Object } returns a deleted entry from user_role table  
	 */
	static async deleteUserRoleById(client, id) {

		// console.log(id);
		const query = 'UPDATE "user_role" SET "is_deleted" = $1 WHERE "user_id" = $2 RETURNING * ';
		const result = await client.query(query, [true, id]);
		// console.log(result.rows[0]);
		return result.rows[0];

	}

	/**
	 * 
	 * @param {client} client represent a pg client object  
	 * @param {uuid} id represent a user uuid 
	 * @param {Object} data represent a user data that will be modified 
	 * @returns {Object} returns an updated record 
	 */
	static async updateUserDetails(client, id, data) {

		let keys = Object.keys(data);

		let result = null;

		for (let i = 0; i < keys.length; i++) {

			const query = `UPDATE "user"  SET "${keys[i]}" = $1 WHERE "id" = $2 RETURNING *`;
			result = await client.query(query, [data[keys[i]], id]);

		}

		return result.rows[0];

	}


	/**
	 * 
	 * @param {Object} client represent a pg client object 
	 * @param {uuid} user_id represent a user id 
	 * @param {Integer} role_id represent a new role id that user want to update  
	 * @returns {Object} returns an updated role 
	 */
	static async updateUserRole(client, user_id, role_id) {

		// query for updating role 
		const query = ` UPDATE "user_role" SET 
								"role_id" = $1 WHERE "user_id" =  $2 RETURNING * `;
		const result = await client.query(query, [role_id, user_id]);
		return result.rows[0];

	}


	/**
	 * 
	 * @param {Object} client represent a pg client object 
	 * @returns { Array<Object> } Returns an array of object of TL whose role is TL 
	 */
	static async getTL(client) {


		// query for getting user whose role is TL 
		const query = ` SELECT 
							"user"."id",
							"user"."userName" , 
							"user"."email" , 
							"user"."contact"
						FROM "user" 
						INNER JOIN "user_role" ON "user"."id" = "user_role"."user_id" 
						WHERE "user_role"."role_id" = $2 
						AND "user"."id" NOT IN (SELECT "tl_id" FROM "teams" ) AND "user"."is_deleted" = $1 ORDER BY "user"."userName"`;

		const result = await client.query(query, [false, 3]);

		return result.rows;

	}


	/**
	 * 
	 * @param {Object} client Represent a pg client object  
	 * @returns { Array<Object> } Returns an array of object of user whose role is developer 
	 */
	static async getDeveloper(client) {


		// query for getting all users whose role is developer
		const query = ` SELECT 
							"user"."id",
							"user"."userName" , 
							"user"."email" , 
							"user"."contact"
						FROM "user" 
						INNER JOIN "user_role" ON "user"."id" = "user_role"."user_id" 
						WHERE "user_role"."role_id" = $2 
						AND "user"."id" NOT IN (SELECT "user_id" FROM "team_user" ) AND "user"."is_deleted" = $1 ORDER BY "user"."userName" `;

		const result = await client.query(query, [false, 2]);

		return result.rows;

	}


	/**
	 * 
	 * @description This is used to get role name based on specific user id 
	 * @param {Object} client represent a pg client object
	 * @param {uuid} userId  represent a user id
	 * @returns 
	 */
	static async getRoleName(client, userId) {

		// query for getting role name based on user id 
		const query = 'SELECT "name" FROM "userRole" WHERE "id" =  ( SELECT "role_id" FROM "user_role" WHERE "user_id" = $1 ) ';

		const result = await client.query(query, [userId]);

		return result.rows[0];
	}



}

export default User;