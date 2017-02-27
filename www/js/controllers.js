angular.module('app.controllers', ['ngStorage'])  //inject for the using of $localstorage


.controller('menuCtrl', ['$scope', '$stateParams', '$state','Data',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams,$state,Data) {
    $scope.gohome=function(){
        $state.go('home');
    }
    $scope.goprofile=function(){
        $state.go('profile');
    }
    $scope.gocontact=function(){
        $state.go('contactPage');
    }
    $scope.gomymentors=function(){
        $state.go('myMentors');
    }
    $scope.gomyMentees=function(){
        $state.go('myMentees');
    }
    $scope.gologin=function(){
        $state.go('login');
    }

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
                    $state.go('login'); 
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
    },function(){  //signin函数的第三个参数error
            $rootScope.error='Failed to login';

        }

    )
    

    $state.go('home');//if login successfully
};

}])
  

//Controller for home page 
.controller('homeCtrl', ['$scope', '$stateParams','$rootScope','$state','$localStorage','Data',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams,$rootScope,$state,$localStorage,Data) {
    $scope.learnFaster='true';
    $scope.Accelerate='true';
    $scope.manage='true';

    $scope.learnFasterctrl=function(){
        Data.set_current_program("LearnFaster");
        console.log(Data.show_program());
        $state.go('learnFasterMentoring');
    }


    $scope.Acceleratectrl=function(){
        Data.set_current_program("Accelerate");
        console.log(Data.show_program());
        $state.go('learnFasterMentoring');
        
    }

    $scope.Managectrl=function(){
        Data.set_current_program("Manage");
        console.log(Data.show_program());
        $state.go('learnFasterMentoring');
        
    }

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
   
.controller('learnFasterMentoringCtrl', ['$scope', '$stateParams', '$state','$rootScope','$localStorage','Data',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams,$state,$rootScope,$localStorage,Data) {
    var temp=Data.show_program();
    $scope.program=temp;
    console.log(temp);
  

    $scope.goregisterProgram=function(){
        $state.go('registerProgram');
     }
    


}
])
   
.controller('registerProgramCtrl', ['$scope', '$stateParams','Data','$localStorage','$state','Data',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams,Data,$localStorage,$state,Data) {
     console.log(Data.show_program());
     Data.set_mentype("mentor");  //reset mentype
     console.log(Data.show_mentype());
    
     
     // Data.set_mentype($scope.mymentype);
     // console.log(Data.show_mentype());
     $scope.gointerests=function(){
        $state.go('yourInterests');
     }
     $scope.gohome=function(){
        $state.go('home');
     }
     $scope.seta=function(){
        Data.set_mentype("mentee");
        console.log(Data.show_mentype());
     }
     $scope.setb=function(){
        Data.set_mentype("mentor");
        console.log(Data.show_mentype());
     }
    

    //show all the form data 
     console.log(Data.return_selection());
     console.log(Data.Interests);
     console.log(Data.get_times_perweek());
     



}])
   
.controller('yourInterestsCtrl', ['$scope', '$stateParams','$state', 'Data',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams,$state,Data) {
    // console.log($scope.Interests);
    // $scope.Interests="hello";
    $scope.Interests=[
    {text:"Face to Face", value: "face"},
    {text:"E-mail", value: "email"},
    {text:"Phone", value:"phone"}
    ];

    $scope.temp=[
    {times_perweek:''}
    ]

    Data.clear_selection();//intialize the selection at the start.
    $scope.test1=["Leadership","Security","Big data and analytics","Performance management","Microsoft Applications"];
    
    $scope.toggleSelection=function toggleSelection(interests){
        var idx=Data.show_selection_index(interests);
        if (idx>-1) {
            Data.selection_delete(idx); //删除
        }
        else{
            Data.selection_add(interests);
        }
        console.log(Data.return_selection());

    };
    

    $scope.Interests_Change = function(item) {
    Data.Interests=item.value;
    console.log(Data.Interests);
    };




    $scope.getback=function(){

    var temp=$scope.temp.times_perweek; //Add times per week
    Data.set_times_perweek(temp);

	$state.go('registerProgram');

    }

}])














 