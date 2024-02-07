const checkContact = (value,helper)=>{
	if(!(/[6-9]{1}[0-9]{9}/.test(value))){
		return helper.message('Contact number is invalid.');
	}
	return true ;
};
export default checkContact ; 