
class Project{

	static async addProject(client,projectDetails){
		try{
			const keyArray = Object.keys(projectDetails).join(', ');
			const values = Object.values(projectDetails);
			const arr = [];
			for(let i = 1 ; i <= values.length ; i++){
				arr.push(`$${i}`);
			}
			const value = arr.join(', ');
			const query = `INSERT INTO "project"(${keyArray}) values(${value}) RETURNING *`;
			const result = await client.query(query,values);
			return result.rows[0]; 
		}catch(e){
			throw e ;
		}
	}

}

export default Project ; 