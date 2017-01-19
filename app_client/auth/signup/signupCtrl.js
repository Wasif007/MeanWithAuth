(function () {

  angular
    .module('loc8rApp')
    .controller('signupCtrl', signupCtrl);

    registerCtrl.$inject = ['$location','authenticationServices'];
    function registerCtrl($location,authenticationServices){
    	var vm = this;
vm.pageHeader = {
title: 'Create a new Loc8r account'
};
vm.credentials = {
name : "",
email : "",
password : ""
};

vm.returnPage = $location.search().page || '/';

vm.onSubmit = function () {
	vm.formError="";
	if(!vm.credentials.email || !vm.credentials.name || !vm.credentials.password){
		vm.formError="All Fields are required";
		return false;
	}
	else{
		vm.onSuccessful();
	}
};
vm.onSuccessful=function(){
	vm.formError = "";
	authenticationServices.signup(vm.credentials).error(function(err){
		vm.formError=err;
	}).then(function(){
$location.search('page', null);
$location.path(vm.returnPage);
	});

}

 
  }

})();