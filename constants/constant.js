const HTTP_RESPONSES = {
    
	BAD_REQUEST : {
		statusCode : 400 , 
		message : 'BAD REQUEST'
	} , 
	SUCCESS : {
		statusCode : 200 , 
		message : 'SUCCESS'
	} , 
	CREATED : {
		statusCode : 201 , 
		message : 'CREATED'
	} , 
	INTERNAL_SERVER_ERROR : {
		statusCode : 500 , 
		message : 'INTERNAL SERVER ERROR'
	} , 
	UNAUTHORIZED : {
		statusCode : 401 , 
		message : 'UNAUTHORIZED'
	} , 
	CONFLICT : {
		statusCode : 409 , 
		message : 'CONFLICT'
	} , 
	NOT_FOUND : {
		statusCode : 404 , 
		message : 'NOT FOUND'
	}
    
};

export {
	HTTP_RESPONSES
};