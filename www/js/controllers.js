angular.module('app.controllers', [])
  
.controller('menuCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('profileCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('contactPageCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
      
.controller('registerCtrl', ['$scope', '$stateParams', '$http','$state',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams,$http) {
	$scope.user={
		name:"" ,   //add attributes
		email:"",
		password:"",
		repeatpassword:"",
		position:"",
		bio:""
    }


    $scope.submit=function(){
    	console.log($scope.user.name);
    }



}])
   
.controller('loginCtrl', ['$scope', '$stateParams', '$state',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $state) {
$scope.loginctl=function(){
	$state.go('home');//if login successfully
}

}])
   
.controller('homeCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {
	

}])
   
.controller('myMentorsCtrl', ['$scope', '$stateParams','$state', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
	// You can include any angular dependencies as parameters for this function
	// TIP: Access Route Parameters for your page via $stateParams.parameterName
	function ($scope, $stateParams,$state) {
		$scope.getback=function(){
			console.log("Going Home");
			$state.go('home');
		}
	}
])
   
.controller('myMenteesCtrl', ['$scope', '$stateParams', 
	// You can include any angular dependencies as parameters for this function
	// TIP: Access Route Parameters for your page via $stateParams.parameterName
	function ($scope, $stateParams) {

	}
])

   
.controller('registerProgramCtrl', ['$scope', '$stateParams','$ionicHistory', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams,$ionicHistory) {
	$scope.getback=function(){
		console.log("Back passed");
		// add data as paramater of state.go
		$ionicHistory.goBack();
	}
}])
   
.controller('yourInterestsCtrl', ['$scope', '$stateParams','$state','$ionicHistory', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
	// You can include any angular dependencies as parameters for this function
	// TIP: Access Route Parameters for your page via $stateParams.parameterName
	function ($scope, $stateParams,$state,$ionicHistory) {
	$scope.getback=function(){
		console.log("Back passed");
		$ionicHistory.goBack();
	}
}])

.controller('learnFasterMentoringCtrl', ['$scope', '$stateParams','$state', '$ionicHistory', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
	// You can include any angular dependencies as parameters for this function
	// TIP: Access Route Parameters for your page via $stateParams.parameterName
	function ($scope, $stateParams,$state,$ionicHistory){
		$scope.getback=function(){
			console.log("Back to Home!");
			$ionicHistory.goBack();
		}
		$scope.longText = "This is a programme open to all Atos UK&amp;I staff (9000 people). Anyone can offer themselves as a mentor or request mentoring. It is the main use of the App. We are planning to open the offer for mentoring every quarter. You can request mentoring on up to 2 topics, but you can offer it on a wider range. If people need mentoring on more than 2 topics they should finish the mentoring on their top 2 proprieties and then go back and request another mentor in a later quarter, so they can do this as often as they like. As it is based around expertise and need it doesn’t matter if the mentor is more junior than the mentee, it’s all about what people know. Mentors should not have more than 2 mentees. Mentees should only have one mentor at a time from this scheme ";
}])
 