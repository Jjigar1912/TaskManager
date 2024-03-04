/* eslint-disable no-undef */

import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import server from '../../../bin/www.js';

chai.should();

chai.use(chaiHttp);

describe('User Module Test Cases', function () {

	describe('POST /user/login - Login API' ,()=>{

		it('Successful Login : ', (done) => {

			chai.request(server)
				.post('/user/login')
				.send({ 'email': 'mayur@gmail.com', 'password': 'Jig@r1234' })
				.end((error, response) => {
					chai.expect(error).to.be.null;
					response.body.should.have.status(200);
					response.body.should.be.a('object');
					response.body.should.have.property('status');
					response.body.should.have.property('message');
					response.body.should.have.property('data');		
					const cookies = response.headers['set-cookie'];
					const tokenExists = cookies.some(cookie=>cookie.includes('token='));
					tokenExists.should.be.true;	
					done();
				});
		});
	
		it('Invalid Login : ',(done)=>{
	
			chai.request(server)
				.post('/user/login')
				.send({ 'email': 'mayur@gmail.com', 'password': 'Jig@r12345' })
				.end((error,response)=>{
					chai.expect(error).to.be.null;
					response.body.should.have.status(401);
					response.body.should.have.property('status');
					response.body.should.have.property('message');
					done();
				});
		});
	
		it('Invalid Email : ',(done)=>{
	
			chai.request(server)
				.post('/user/login')
				.send({ 'email': 'mayur1@gmail.com', 'password': 'Jig@r12345' })
				.end((error,response)=>{
					chai.expect(error).to.be.null ;
					response.body.should.have.status(404);
					response.body.should.have.property('status');
					response.body.should.have.property('message');
					done();
				});
	
		});
	
		it('Valid Email and Invalid Password',(done)=>{
	
			chai.request(server)
				.post('/user/login')			
				.send({ 'email': 'mayur@gmail.com', 'password': 'Jig@r12345' })
				.end((error,response)=>{
					chai.expect(error).to.be.null ; 
					response.body.should.have.status(401);
					response.body.should.have.property('status');
					response.body.should.have.property('message');
					done();
				});		
		});
	
	});


	describe('POST /user/register - Register API',()=>{

		it('Should Return 400 When Request Body is Invalid',(done)=>{

			const user = {
				'userName' : 'Maharshi Darji' , 
				'email' : 'maharshi@gmail.com' ,
				'password' : '12345' , 
				'confirm_password' : '12345' ,
				'contact' : '8469697228' 
			};

			chai.request(server)
				.post('/user/register')
				.send(user)
				.end((error,response)=>{
					expect(error).to.be.null ;
					response.body.should.have.status(400);
					response.body.should.have.property('status');
					response.body.should.have.property('data');
					response.body.should.have.property('message');
					done();
				});

		});

		it('Should Return 400 When Role is Not From [tl,developer,admin]',(done)=>{

			const user = {
				'userName' : 'Maharshi Darji' , 
				'email' : 'maharshi@gmail.com' ,
				'password' : '12345' , 
				'confirm_password' : '12345' ,
				'contact' : '8469697228' ,
				'role' : 'jigar'
			};

			chai.request(server)
				.post('/user/register')
				.send(user)
				.end((error,response)=>{
					expect(error).to.be.null;
					response.body.should.have.status(400);
					response.body.should.have.property('status').that.has.valueOf('409');
					response.body.should.have.property('message');
					done();
				});

		});

		it('Should Return 409 When Duplicate Email Found',(done)=>{

			const user = {
				'userName' : 'Maharshi Darji' , 
				'email' : 'maharshi@gmail.com' ,
				'password' : '12345' , 
				'confirm_password' : '12345' ,
				'contact' : '8469697228' ,
				'role' : 'developer'
			};

			chai.request(server)
				.post('/user/register')
				.send(user)
				.end((error,response)=>{			
					expect(error).to.be.null;
					response.body.should.have.status(409);
					response.body.should.have.property('status').that.has.valueOf('409');
					response.body.should.have.property('message');
					done();
				});
		});

		it.skip('Should Return 201 When User is Created.',(done)=>{

			const user = {
				'userName' : 'Maharshi Darji' , 
				'email' : 'maharshi1@gmail.com' ,
				'password' : '12345' , 
				'confirm_password' : '12345' ,
				'contact' : '8469697228' ,
				'role' : 'developer'
			};

			chai.request(server)
				.post('/user/register')
				.send(user)
				.end((error,response)=>{			
					expect(error).to.be.null;
					response.body.should.have.status(201);
					response.body.should.have.property('status').that.has.valueOf('201');
					response.body.should.have.property('message');
					response.body.should.have.property('data').that.be.a('string');
					done();
				});

		});

		it('Should Return 400 When Email is Invalid',(done)=>{

			const user = {
				'userName' : 'Maharshi Darji' , 
				'email' : 'maharshigmail.com' ,
				'password' : '12345' , 
				'confirm_password' : '12345' ,
				'contact' : '8469697228' ,
				'role' : 'developer'
			};

			chai.request(server)
				.post('/user/register')
				.send(user)
				.end((error,response)=>{
					expect(error).to.be.null ;
					response.body.should.have.status(400);
					response.body.should.have.property('status');
					response.body.should.have.property('data');
					response.body.should.have.property('message');
					done();
				});
		});

		it('Should Return 400 When Contact is Invalid',(done)=>{

			const user = {
				'userName' : 'Maharshi Darji' , 
				'email' : 'maharshigmail.com' ,
				'password' : '12345' , 
				'confirm_password' : '12345' ,
				'contact' : '8469697228123344' ,
				'role' : 'developer'
			};

			chai.request(server)
				.post('/user/register')
				.send(user)
				.end((error,response)=>{
					expect(error).to.be.null ;
					response.body.should.have.status(400);
					response.body.should.have.property('status');
					response.body.should.have.property('data');
					response.body.should.have.property('message');
					done();
				});
		});

	});

});