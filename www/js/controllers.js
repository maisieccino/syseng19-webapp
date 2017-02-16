angular.module('app.controllers', ['ngStorage'])  //inject for the using of $localstorage


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
      
.controller('registerCtrl', ['$scope', '$stateParams', '$http','$state','Auth','$localStorage','$rootScope',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams,$http,$state,Auth,$localStorage,$rootScope) {
	
	$scope.user={   // Bind attribute with form data
		name:"" ,   // Add attributes
		email:"",
		password:"",
		repeatpassword:"",
		position:"",
		bio:""
    };

    $scope.register = function() {

            var formData = {
            	name: $scope.user.name,
                email: $scope.user.email,
                password: $scope.user.password,
                repeatedpassword: $scope.user.repeatedpassword,
                position: $scope.user.position,
                bio: $scope.user.bio
            }   //set form data

            Auth.save(formData, function(res) {   //use the function save() from Auth service
                if (res.type == false) {
                    alert(res.data)
                } else {
                    $localStorage.token = res.data.token; //将服务器返回的token保存到本地
                    window.location = "/"    
                }
            }, function() {
                $rootScope.error = 'Failed to signup';
               })
            };


    // <---testing code--->
    // $scope.submit=function(){
    // 	$localStorage.test=$scope.user.name;
    // 	console.log($localStorage.test); //test for the using of $localStorage, does work!
    // 	// $localStorage.$reset();//delete everything in localstorage
    // };



}])
   
.controller('loginCtrl', ['$scope', '$stateParams', '$state','$localStorage','Auth','$rootScope',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $state,$localStorage,Auth,$rootScope) {

$scope.loginuser={
    emailaddress:'',
    password:''
};

$scope.loginctl=function(){
	var logindata={
        emailaddress: $scope.loginuser.emailaddress,
        password:$scope.loginuser.password
    };
    // console.log(logindata.emailaddress);
    // console.log(logindata.password);

    Auth.signin(logindata,function(res){
        if (res.type==false) {
            alert(res.data);
        }
        else{
            $localStorage.token=res.data.token;
            $state.go('login');
        }
    },function(){  //signin函数的第三个参数
            $rootScope.error='Failed to login';

        }

    )
    

    $state.go('home');//if login successfully
};

}])
   
.controller('homeCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('myMentorsCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('myMenteesCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('learnFasterMentoringCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}
])
   
.controller('registerProgramCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('yourInterestsCtrl', ['$scope', '$stateParams','$state', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams,$state) {
$scope.getback=function(){
	// console.log("hello");
	// add data as paramater of state.go
	$state.go('registerProgram');
}

}])
 