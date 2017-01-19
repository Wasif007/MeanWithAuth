(function () {

  angular
    .module('loc8rApp')
    .controller('loginCtrl', loginCtrl);

    loginCtrl.$inject = ['$location','authenticationServices'];
    function loginCtrl($location,authenticationServices){
    	var vm = this;
vm.pageHeader = {
title: 'Sign In'
};
vm.credentials = {

email : "",
password : ""
};

vm.returnPage = $location.search().page || '/';

vm.onSubmit = function () {
	vm.formError="";
	if(!vm.credentials.email  || !vm.credentials.password){
		vm.formError="All Fields are required";
		return false;
	}
	else{
		vm.onSuccessful();
	}
};
vm.onSuccessful=function(){
	vm.formError = "";
	authenticationServices.login(vm.credentials).error(function(err){
		vm.formError=err;
	}).then(function(){
$location.search('page', null);
$location.path(vm.returnPage);
	});

}

 
  }

})();