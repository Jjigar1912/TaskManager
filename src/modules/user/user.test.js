import request from 'supertest' ; 
import server from '../../../bin/www.js';
import * as chai from 'chai';

const expect = chai.expect;
// eslint-disable-next-line no-undef
describe('User Authentication',()=>{

	// eslint-disable-next-line no-undef
	it('Valid Login', async ()=>{

		const response = await request(server)
			.post('/user/login')
			.send({ email: 'mayur@gmail.com', password: 'Jig@r1234' });

		expect(response.status).to.equal(200);
		expect(response.body).to.have.property('message', 'Login Successfull');
		expect(response.body).to.have.property('status',200);
		expect(response.body).to.have.property('data');

	});


	// eslint-disable-next-line no-undef
	it('Invalid Username',async ()=>{

		const response = await request(server)
			.post('/user/login')
			.send({ email: 'mayur1@gmail.com', password: 'Jig@r1234' });

		expect(response.status).to.equal(404);
		expect(response.body).to.have.property('message', 'User Not Found .');
		expect(response.body).to.have.property('status',404);

	});


	// eslint-disable-next-line no-undef
	it('Invalid Password',async ()=>{

		const response = await request(server)
			.post('/user/login')
			.send({ email: 'mayur@gmail.com', password: 'Jig@r12345' });

		expect(response.status).to.equal(401);
		expect(response.body).to.have.property('message', 'Invalid Password');
		expect(response.body).to.have.property('status',401);

	});


});