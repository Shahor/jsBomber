var check =  {
	'isInt' : function (i){
		var intRegex = /^\d+$/;
		if(intRegex.test(i)) {
			return true;
		}
		else {
			return false;
		}
		
	}
}