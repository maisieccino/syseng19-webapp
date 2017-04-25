angular.module('app.controllers', ['ngStorage'])  //inject for the using of $localstorage


.controller('menuCtrl', ['$scope', '$stateParams', '$state','Data', '$localStorage','$http', '$rootScope',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams,$state,Data,$localStorage,$http,$rootScope) {
    //$scope.userEmail = "";
    //$scope.firstName = "";
    //$scope.lastName = "";
    var req = {
        method: 'GET',
        url: "https://api.dev.mbell.me/user/me/"
    };
    $http(req).then(function(res){
        console.log("rest called in menu");
        $scope.userEmail = res.data.email;
        $scope.firstName = res.data.first_name;
        $scope.lastName = res.data.last_name;
    });
    $rootScope.updateMenu = function(){
        console.log("update menu");
        $scope.firstName = $localStorage.firstName;
        $scope.lastName = $localStorage.lastName;
        $scope.userEmail = $localStorage.email;
        $scope.isStaff = $localStorage.isStaff;
    }
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
        delete $localStorage.token;
        $state.go('login');
    }
    $scope.goSettings=function(){
        $state.go('settings');
    }
    $scope.gocreate=function(){
      $state.go('create_Program');
    }

}])
   
.controller('profileCtrl', ['$scope', '$stateParams', '$state', '$localStorage', '$http',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
  function ($scope, $stateParams,$state,$localStorage,$http) {
    // User Data
    $scope.firstName = "";
    $scope.lastName = "";
    $scope.userBio = "";
    $scope.currentRole = "";
    $scope.tags;
    $scope.enrolledPrograms = [];
    $scope.mentors = ["John Smith", "Collin Wong"];
    $scope.mentees = ["Christopher Lau", "Collin Wong"];
    $scope.noMentors = ($scope.mentors.length == 0) ? true : false;
    $scope.noMentees = ($scope.mentees.length == 0) ? true : false;
    
    var req = {
        method: 'GET',
        url: "https://api.dev.mbell.me/user/me/"
    };
    $http(req).then(function(res){
        $scope.firstName = res.data.first_name;
        $scope.lastName = res.data.last_name;
        $scope.userBio = res.data.profile.bio;
        $scope.currentRole = res.data.profile.position;
        $scope.email = res.data.email;
        $scope.tags = res.data.tags;
        console.log(res.data);
    },function(res){
        console.log(res.headers());
    });
    
    // Get mentor programmes
    var req1 = {
        method: 'GET',
        url: "https://api.dev.mbell.me/participant/"
    };
    $http(req1).then(function(res){
        for(var i = 0; i < res.data.length; i++){
          $scope.enrolledPrograms.push(res.data[i].cohort.programme.name);
        }
        $scope.noEnrolledPrograms = $scope.enrolledPrograms.length == 0;
        console.log($scope.enrolledPrograms);
    },function(res){
        
    });

}])

.controller('settingsCtrl', ['$scope', '$stateParams', '$state', '$localStorage','$http', '$rootScope','$cordovaCamera',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams,$state,$localStorage,$http,$rootScope,$cordovaCamera) {

    $scope.user = {
      first_name:"",
      last_name:"",
      department:"",
      bio:"",
      position:""
    };

    $scope.interests=["Leadership","Career Development","Big data analytics","Performance Management","Microsoft Applications","Trello","Project Management","LinkedIn","Facebook","Security","Twitter","NodeJS","Javascript","CSS","Agile"];

    $scope.interestSelection = [];

    var req = {
        method: 'GET',
        url: "https://api.dev.mbell.me/user/me/"
    };
    $http(req).then(function(res){
        $scope.user.first_name = res.data.first_name;
        $scope.user.last_name = res.data.last_name;
        $scope.user.bio = res.data.profile.bio;
        $scope.user.position = res.data.profile.position;
        $scope.user.department = res.data.profile.department;
        for(var i = 0; i < res.data.tags.length; i++){
          $scope.interestSelection.push(res.data.tags[i]);          
        }
    });

    $scope.toggleSelection = function(interest){
      var index = $scope.interestSelection.indexOf(interest);
      if (index>-1) {
          $scope.interestSelection.splice(index,1);
        }else{
          $scope.interestSelection.push(interest);
      }
      console.log($scope.interestSelection);
    }

    $scope.checkedSelections = function(interest){
      if ($scope.interestSelection.indexOf(interest)>-1) {
          return true;
      }else{
          return false;
      }
    }

    $scope.takePicture = function() {
        var options = { 
            quality : 75, 
            destinationType : Camera.DestinationType.DATA_URL, 
            sourceType : Camera.PictureSourceType.CAMERA, 
            allowEdit : true,
            encodingType: Camera.EncodingType.JPEG,
            targetWidth: 100,
            targetHeight: 100,
            popoverOptions: CameraPopoverOptions,
            saveToPhotoAlbum: false
        };
 
        $cordovaCamera.getPicture(options).then(function(imageData) {
            $scope.imgURI = "data:image/jpeg;base64," + imageData;
        }, function(err) {
            console.log(err);// An error occured. Show a message to the user
        });
    }



    $scope.backToHome=function(){
      $state.go('home');
    }

    $scope.saveProfile=function(){

      //$rootScope.$emit('profileChange',menuData);
      var formData = {  
        first_name:$scope.user.first_name,
        last_name:$scope.user.last_name,
        profile:{
          position:$scope.user.position,
          department:$scope.user.department,
          bio:$scope.user.bio,
          tags:[]
        } 
      }

      for(var i = 0; i < $scope.interestSelection.length; i++){
        formData.profile.tags.push($scope.interestSelection[i]);
      }

      console.log(formData);

      $localStorage.firstName = formData.first_name;
      $localStorage.last_name = formData.last_name;

      $rootScope.updateMenu();

      var req = {
        method: 'PATCH',
        url: "https://api.dev.mbell.me/user/me/",
        headers: {
          'Content-type': 'application/json'
        },
        data: formData
      };
      $http(req).then(function(res){
        $state.go('profile');
      },function(res){
        console.log(res.headers());
      }); 

    }

}])

.controller('notificationCtrl', ['$scope', '$stateParams','$http','Data','$state',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams,$http,Data,$state) {
    // Notifications related to programs
    $scope.programNotifications = [];
    $scope.activeCohorts = [];

    $scope.go_program_detail=function(program){
      // console.log(program);
      Data.set_current_program(program);
      Data.show_program();
      $state.go('learnFasterMentoring');
    }

    var req = {
      method: 'GET',
      url: "https://api.dev.mbell.me/programme/"
    };
    
    function getActiveCohorts(programID){
      var req2 = {
        method: 'GET',
        url: "https://api.dev.mbell.me/programme/" + programID + "/cohorts/active"
      }
      $http(req2).then(function(response){
        $scope.activeCohorts.push(response.data);
      });
    }

    $http(req).then(function(res){
      $scope.programNotifications = res.data;
      for(var i = 0; i < $scope.programNotifications.length; i++){
        getActiveCohorts($scope.programNotifications[i].programmeId);
      }
    });

}])


.controller('contactPageCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
      
.controller('registerCtrl', ['$scope', '$stateParams', '$http','$state','Auth','$localStorage','$rootScope','$filter','registerService',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams,$http,$state,Auth,$localStorage,$rootScope,$filter,registerService) {
	
	  $scope.user={   // Bind attribute with form data
		first_name:"" ,   // Add attributes
    last_name:"",
    department:"",
		email:"",
		password:"",
		repeatpassword:"",
		position:"",
    join_date:"",
		bio:""
    };

    $scope.register = function() {

      // var temp=$scope.user.join_date;
      // var temp1=temp.slice(0,9);
      
      $scope.date=$filter('date')($scope.user.join_date,"yyyy-MM-dd");

      var formData = {
                email: $scope.user.email,
                password: $scope.user.password,
                first_name: $scope.user.first_name,
                last_name: $scope.user.last_name,
                profile:{
                  joinDate: $scope.date,
                  position: $scope.user.position,  
                  department: $scope.user.department,      
                  bio: $scope.user.bio
                }
      }   //set form data
      console.log(formData);

            Auth.save(formData, function(res) {   //use the function save() from Auth service
                if (res.type == false) {  //function success callback
                    alert(res.data)
                } else {
                    registerService.addCredentials($scope.user.email,$scope.user.password);
                    $state.go('login'); 
                }
            }, function() {  //function 
                // $rootScope.error = 'Failed to signup';
                console.log("failed to sign up");
               })
            // console.log(formData);

    };

    $scope.backToLogin=function(){
            console.log("Going to Login");
            $state.go('login');
    }        
    // <---testing code--->
    // $scope.submit=function(){
    // 	//$localStorage.test=$scope.user.name;
    //   $scope.userDate = new Date();
    // 	$scope.formattedDate = $filter('date')($scope.user.join_date, "dd-MM-yyyy"); //test for the using of $localStorage, does work!
    //   console.log($scope.formattedDate);
    // 	// $localStorage.$reset();//delete everything in localstorage
    // };



}])
   
.controller('loginCtrl', ['$scope', '$stateParams', '$state','$localStorage','Auth','$rootScope','$http','registerService',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $state,$localStorage,Auth,$rootScope,$http,registerService) {
    $scope.loginuser={
      emailaddress:registerService.getEmail(),
      password:registerService.getPassword() 
    };
    $scope.encoded = btoa(window.__env.client_id+':'+window.__env.client_password);
    $scope.loginctl=function(){ 
         console.log("I am logging in");
         delete $localStorage.token;

         var logindata="username="+$scope.loginuser.emailaddress+"&password="+$scope.loginuser.password+"&grant_type=password"+ "&scope=read write admin staff";
        
           var req = {
            method: 'POST',
            url: "https://api.dev.mbell.me/auth/token/",
            headers: {
                "Authorization": "Basic " + $scope.encoded,
                "Content-type": "application/x-www-form-urlencoded; charset=utf-8",
            },
            data:logindata
        };
        $http(req).then(function(res){
            $localStorage.token=res.data.access_token; //store the returned token in localstorage
            console.log(req);
            console.log($localStorage.token);
            $state.go('home');
        },function(res){
        $scope.errorMsg = "Login Failed. Please enter correct credentials!"
        console.log(res);
        }); }

}])
  

//Controller for home page 
.controller('homeCtrl', [ '$stateParams','$rootScope','$state','$localStorage','Data','$http','Program_Control','$scope','Data',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($stateParams,$rootScope,$state,$localStorage,Data,$http,Program_Control,$scope,Data) {


    $scope.All_Programs=[];
    $scope.isStaff;
    var myDataPromise = Program_Control.getData();
    $scope.noPrograms;
    $scope.registeredPrograms=[];

    myDataPromise.then(function(result) {  
      $scope.All_Programs = result;
      $scope.noPrograms = ($scope.All_Programs.length == 0);       
      console.log($scope.All_Programs);
      //console.log("There are no programs now : " + $scope.noPrograms);
    });

    $scope.go_program_detail=function(program){
      // console.log(program);
      Data.set_current_program(program);
      Data.show_program();


      $state.go('learnFasterMentoring');
    }

    $scope.go_participant_detail=function(participant){
      Data.set_current_participantID(participant.participantId);
      Data.set_current_registeredProgram(participant);
      //console.log(participant.participantId);

      $state.go('chooseTopthree');
    }

    $scope.go_cohort_editing=function(program){
       Data.set_current_program(program);
      Data.show_program();
      $state.go('Cohort_Manage');
    }

    $scope.go_program_modify=function(program){
      Data.set_current_program(program);
      Data.show_program();
      $state.go('Modify_Program');
    }


    var req = {
        method: 'GET',
        url: "https://api.dev.mbell.me/user/me/"
    };

    $http(req).then(function(res){
      $localStorage.firstName = res.data.first_name;
      $localStorage.lastName = res.data.last_name;
      $localStorage.email = res.data.email;
      $localStorage.isStaff = res.data.isStaff;
      $scope.isStaff = res.data.isStaff;
      console.log($scope.isStaff);
      $rootScope.updateMenu();    
    });

    $scope.learnFaster=Data.get_isregistered_learnFatser();
    $scope.Accelerates=Data.get_isregistered_Accelerates();
    $scope.manage=Data.get_isregistered_manage();

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

    var req = {
          method: 'GET',
          url: "https://api.dev.mbell.me/participant/" ,
    };

    $http(req).then(function(res){
      for(var i = 0; i < res.data.length; i++){
        $scope.registeredPrograms.push(res.data[i]);
      }
      console.log($scope.registeredPrograms);
      $scope.nonRegistered = $scope.registeredPrograms.length == 0;
      //console.log("Registered in any programs " + $scope.nonRegistered);
    },function(res){
      console.log(res);
    });

}])
 

.controller('Cohort_ManageCtrl',['$scope','$state','Data','$http','Cohort_Control', '$filter','$ionicPopup',
  function($scope,$state,Data,$http,Cohort_Control,$filter,$ionicPopup){

        $scope.currentProgram=Data.show_program();
        $scope.All_Cohorts=[];
        $scope.cohortStatuses=[];
        $scope.noCohorts;
        var myDataPromise = Cohort_Control.getData($scope.currentProgram.programmeId);
        $scope.todayDate = (new Date()).toISOString().slice(0,10).replace(/-/g,"-");

        myDataPromise.then(function(result) {  
          $scope.All_Cohorts= result;
          //Printing status of cohorts
          for(var i = 0; i < $scope.All_Cohorts.length; i++){
            var startDate =  $filter('date')($scope.All_Cohorts[i].openDate, "yyyy-MM-dd");
            var endDate =  $filter('date')($scope.All_Cohorts[i].closeDate, "yyyy-MM-dd");
            var matchDate =  $filter('date')($scope.All_Cohorts[i].matchDate, "yyyy-MM-dd");
            if($scope.todayDate >= startDate && $scope.todayDate <= endDate){
              $scope.cohortStatuses[i] = "This cohort is active";
            }
            if($scope.todayDate >= startDate && $scope.todayDate <= endDate && $scope.todayDate === matchDate){
              $scope.cohortStatuses[i] = "This cohort is active. Matching is commencing today!";
            }
            if($scope.todayDate < startDate){
              $scope.cohortStatuses[i] = "Cohort has yet to start";
            }
            if($scope.todayDate > endDate){
              $scope.cohortStatuses[i] = "Cohort has passed please renew or delete this cohort";
            }
          }
          $scope.noCohorts = ($scope.All_Cohorts.length == 0);
          console.log($scope.All_Cohorts);
          console.log($scope.noCohorts);
        });

        $scope.DeleteCohort=function(cohort_id){
          var req = {
          method: 'DELETE',
          url: "https://api.dev.mbell.me/cohort/"+cohort_id+"/",
        };        
        $http(req).then(function(res){
          // console.log('Modify successfull');
          console.log(res.headers());
          $state.go('home');
          },function(res){
          console.log(res);
           }); 
        }

        // Alert Pop up to confirm delete of cohort
        $scope.alertDelete = function(cohort_id) {
          var confirmPopup = $ionicPopup.confirm({
            title: 'Delete Cohort',
            template: 'Are you sure you want to delete this Cohort?'
          });
          confirmPopup.then(function(res) {
            if(res) {
              $scope.DeleteCohort(cohort_id);
            }else {
              console.log('No delete');
            }
          });
        };

        $scope.ModifyCohort=function(cohort_id){
          Data.set_current_cohortID(cohort_id);
          $state.go('Modify_Cohort');

        }


    
        $scope.backToHome=function(){
         $state.go('home');
        }


        $scope.cohort={
        size:'',
        openDate:'',
        closeDate:'',
        matchDate:''
        }




        $scope.AddCohort=function(){

          $scope.form_data={
          cohortSize:$scope.cohort.size,
          openDate:$scope.cohort.openDate,
          closeDate:$scope.cohort.closeDate,
          matchDate:$scope.cohort.matchDate
          }

          console.log($scope.form_data);

          var req1={
            method: 'POST',
            url: "https://api.dev.mbell.me/programme/"+$scope.currentProgram.programmeId+"/cohorts/",
            headers: {
            'Content-type': 'application/json'
            },
            data: $scope.form_data
          }
          $http(req1).then(function(res){
          // console.log('Adding cohort successfull');
          console.log(res);
          $state.go('home');
          },function(res){
          console.log(res);
          }); 
        }


  }])

.controller('Modify_CohortCtrl',['$scope','$state','Data','$http',
 function($scope,$state,Data,$http){

    $scope.backToManageCohort=function(){
      $state.go('Cohort_Manage');
    }
    $scope.currentID=Data.get_current_cohortID();
    $scope.todayDate = (new Date()).toISOString().slice(0,10).replace(/-/g,"-");

    $scope.cohort={
        size:'',
        openDate:'',
        closeDate:'',
        matchDate:''
    }
    var req = {
        method: 'GET',
        url: "https://api.dev.mbell.me/cohort/"+$scope.currentID+"/"
    };
    $http(req).then(function(res){
        $scope.cohort.size = res.data.cohortSize;
        $scope.cohort.openDate = new Date(res.data.openDate);
        $scope.cohort.closeDate = new Date(res.data.closeDate);
        $scope.cohort.matchDate = new Date(res.data.matchDate);
    });
    $scope.Approve=function(){
    $scope.form_data={
        cohortSize:$scope.cohort.size,
        openDate:$scope.cohort.openDate,
        closeDate:$scope.cohort.closeDate,
        matchDate:$scope.cohort.matchDate
    }
      console.log($scope.form_data);

          var req1={
            method: 'PATCH',
            url: "https://api.dev.mbell.me/cohort/"+$scope.currentID+"/",
            data: $scope.form_data
          }
          $http(req1).then(function(res){
          // console.log('Adding cohort successfull');
          console.log(res);
          $state.go('home');
          },function(res){
          console.log(res);
          }); 
        


    }




   }])


.controller('Modify_ProgramCtrl',['$scope','$state','Data','$http','$ionicPopup',
  function($scope,$state,Data,$http,$ionicPopup){

    $scope.backToHome=function(){
      $state.go('home');
    }
    $scope.currentProgram=Data.show_program();
    console.log($scope.currentProgram);

    $scope.newprogram={   // Bind attribute with form data
           name:$scope.currentProgram.name,
           description:$scope.currentProgram.description,
           cohort_size:$scope.currentProgram.defaultCohortSize,

    };

    

    $scope.Modify=function(){

      $scope.form_data={
      name: $scope.newprogram.name,
      description: $scope.newprogram.description,
      defaultCohortSize: $scope.newprogram.cohort_size
      }

      console.log($scope.form_data);

      var req = {
        method: 'PATCH',
        url: "https://api.dev.mbell.me/programme/"+$scope.currentProgram.programmeId+"/",
        headers: {
          'Content-type': 'application/json'
        },
        data: $scope.form_data
      };
      $http(req).then(function(res){
        // console.log('Modify successfull');
        console.log(res);
        $state.go('home');
      },function(res){
        console.log(res);
      }); 


    }
    $scope.Delete=function(programmeId){
      var req = {
        method: 'DELETE',
        url: "https://api.dev.mbell.me/programme/" + programmeId + "/",
        headers: {
          'Content-type': 'application/json'
        },
        
      };
      $http(req).then(function(res){
        // console.log('Modify successfull');
        console.log(res.headers());
        console.log("delete successfully");
        $state.go('home');
      },function(res){
        console.log(res);
      }); 
    }

    // Alert Pop up to confirm delete program
    $scope.alertDelete = function() {
      var confirmPopup = $ionicPopup.confirm({
        title: 'Delete Program',
        template: 'Are you sure you want to delete this Program? All cohorts and participants associated with this program is deleted as well!'
      });
      confirmPopup.then(function(res) {
        if(res) {
          $scope.Delete($scope.currentProgram.programmeId);
        }else {
          console.log('No delete');
        }
      });
    };




  }])
   


////**************This is the controller for creating a new program 
.controller('create_ProgramCtrl',['$scope','$state','$filter','$http',
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
  function($scope,$state,$filter,$http){
        $scope.program={   // Bind attribute with form data
           name:'',
           description:'',
           cohort_size:'',

        };



        $scope.backToHome=function(){
          $state.go('home');
        }

        $scope.create=function(){
        // var date1=$filter('date')($scope.program.start_date,"yyyy-MM-dd");
        // var date2=$filter('date')($scope.program.end_date,"yyyy-MM-dd");

          $scope.form_data={
          name:$scope.program.name,
          description:$scope.program.description,
          defaultCohortSize:$scope.program.cohort_size
          // start_date:date1,
          // end_date:date2
          }
          console.log($scope.form_data);

          var req = {
           method: 'POST',
           url: "https://api.dev.mbell.me/programme/",
           headers: {
           'Content-type': 'application/json'
           },
           data: $scope.form_data
          };
          $http(req).then(function(res){
           console.log(res);
           $state.go('home');
          },function(res){
          console.log(res);
          });

          }

    //   $scope.takePicture = function() {
    //     var options = { 
    //         quality : 75, 
    //         destinationType : Camera.DestinationType.DATA_URL, 
    //         sourceType : Camera.PictureSourceType.CAMERA, 
    //         allowEdit : true,
    //         encodingType: Camera.EncodingType.JPEG,
    //         targetWidth: 100,
    //         targetHeight: 100,
    //         popoverOptions: CameraPopoverOptions,
    //         saveToPhotoAlbum: false
    //     };
 
    //     $cordovaCamera.getPicture(options).then(function(imageData) {
    //         $scope.imgURI = "data:image/jpeg;base64," + imageData;
    //     }, function(err) {
    //         console.log(err);// An error occured. Show a message to the user
    //     });
    // }





}])






   
.controller('myMentorsCtrl', ['$scope', '$stateParams','$state','$http', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
	// You can include any angular dependencies as parameters for this function
	// TIP: Access Route Parameters for your page via $stateParams.parameterName
	function ($scope, $stateParams,$state,$http) {

    var programs = [];
    $scope.mentors = [];
    $scope.noMentors = true;

		$scope.getback=function(){
			console.log("Going Home");
			$state.go('home');
		}
    var req = {
          method: 'GET',
          url: "https://api.dev.mbell.me/participant/" ,
    };
    
    var req1 = {
          method: 'GET',
          url: "https://api.dev.mbell.me/participant/" ,
    };

    $http(req).then(function(res){
      console.log(res.data);
      for(var i = 0 ; i < res.data.length; i++){
        programs.push(res.data[i].participantId);
      }
      console.log(programs);
      for(var i = 0 ; i < programs.length; i++){
        var req1 = {
          method: 'GET',
          url: "https://api.dev.mbell.me/participant/" + programs[i] + "/match" ,
        };
        $http(req1).then(function(res){     
            console.log(res.data);
            if(res.data.isMentor){
              $scope.mentors.push(res.data); 
            } 
        });
      }
    });
}])
   

.controller('myMenteesCtrl', ['$scope', '$stateParams', '$state', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams,$state) {
    $scope.getback=function(){
        console.log("Going Home");
        $state.go('home');
    }
}])

.controller('learnFasterMentoringCtrl', ['$scope', '$stateParams', '$state','$rootScope','$localStorage','Data','$ionicHistory','$http',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams,$state,$rootScope,$localStorage,Data,$ionicHistory,$http) {
        var temp=Data.show_program();
        $scope.program=temp;
        $scope.activeCohort = null;
        $scope.disableRegisterProgram = true;
        console.log(temp);
        var req = {
          method: 'GET',
          url: "https://api.dev.mbell.me/programme/" + $scope.program.programmeId + "/cohorts/active"
        };
        $http(req).then(function(res){
          $scope.activeCohorts = res.data;
          console.log($scope.activeCohorts);
          $scope.disableRegisterProgram = (!isActiveCheck($scope.activeCohorts));
          console.log("disable register button: " + $scope.disableRegisterProgram);     

          Data.set_current_cohortID($scope.activeCohorts.cohortId);
          // console.log(Data.get_current_cohortID());

        });

        function isActiveCheck(activeCohort){
          if(activeCohort != null){
            return true;
          }else{
            return false;
          }
        }  
        $scope.goregisterProgram=function(){
            $state.go('registerProgram');
        }
        $scope.getback=function(){
            $state.go('home');
        }
	}
])

   
.controller('registerProgramCtrl', ['$scope', '$stateParams','Data','$localStorage','$state','Data',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams,Data,$localStorage,$state,Data,$ionicHistory) {
     console.log(Data.show_program());
     // Data.set_mentype("mentor");  //reset mentype
     console.log(Data.show_mentype());
     $scope.getback=function(){
        $state.go('learnFasterMentoring');
        Data.reset_settings();
        console.log("Settings reset");
     }
     // Data.set_mentype($scope.mymentype);
     $scope.mymentype= String(Data.show_mentype());
     //console.log($scope.mymentype);
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
    $scope.roleType=String(Data.show_mentype());
    $scope.isMentor= ($scope.roleType)==='mentor' ? true : false;
    //show all the form data 
     // console.log(Data.return_selection());
     // console.log(Data.Interests);
     // console.log(Data.get_times_perweek());
     
     $scope.Final_Data={
        program_name:Data.show_program(),
        role:Data.show_mentype(),
        selection:Data.return_selection(),
        contact_type:Data.Interests,
        times:Data.get_times_perweek()
     }
     console.log($scope.Final_Data);



}])
   
.controller('yourInterestsCtrl', ['$scope', '$stateParams','$state', 'Data','Mentorship_program','$localStorage','$http',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams,$state,Data,Mentorship_program,$localStorage,$http,$ionicHistory) {
    $scope.Interests=[
    {text:"Face to Face", value: "face to face",icon:"ion-ios-videocam"},
    {text:"E-mail", value: "email",icon:"icon ion-email"},
    {text:"Phone", value:"phone",icon:"icon ion-ios-telephone-outline"}
    ];

    $scope.temp=[
    {times_perweek:''}
    ]

    // Data.clear_selection();//intialize the selection at the start.
    $scope.roleType=String(Data.show_mentype());
    $scope.isMentor= ($scope.roleType)==='mentor' ? true : false;
    console.log($scope.isMentor);
    $scope.test1=["Leadership","Career Development","Big data analytics","Performance Management","Microsoft Applications","Trello","Project Management","LinkedIn","Facebook","Security","Twitter","NodeJS","Javascript","CSS","Agile"];
    
    $scope.gohome=function(){   //submit the data
        console.log($localStorage.token);
        // var temp=$scope.temp.times_perweek; //Add times per week
        // Data.set_times_perweek(temp);
        var ismentor;
        if (Data.show_mentype()=='mentor') {ismentor="true";}
        else {ismentor="false"};
        $scope.Final_Data={
          // program_name:Data.show_program(),
          isMentor:ismentor,
          tags:Data.return_selection(),
          // contact_type:Data.Interests,
          // times:Data.get_times_perweek()
        }

        console.log($scope.Final_Data);
        $scope.cohortid=Data.get_current_cohortID();
        console.log($scope.cohortid);


        var req = {
          method: 'POST',
          url: "https://api.dev.mbell.me/cohort/" + $scope.cohortid + "/register",
          data:$scope.Final_Data
        };

        $http(req).then(function(res){
          Data.clear_selection();
          console.log($scope.Final_Data);
          $state.go('home');
        },function(res){
          console.log(res);
        });
 
    }
     
     
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

    $scope.judgeSelection=function judgeSelection(interests){
        if (Data.show_selection_index(interests)>-1) {
            return true;
        }
        else return false;
    }
    

    $scope.Interests_Change = function(item) {
    Data.Interests=item.value;
    console.log(Data.Interests);
    };

    $scope.getback=function(){
     //    var temp=$scope.temp.times_perweek; //Add times per week
     //    Data.set_times_perweek(temp);
     //    $scope.Final_Data={
     //    program_name:Data.show_program(),
     //    role:Data.show_mentype(),
     //    selection:Data.return_selection(),
     //    contact_type:Data.Interests,
     //    times:Data.get_times_perweek()
     // }
     // console.log($scope.Final_Data);
    	$state.go('registerProgram');
    }
}])


.controller('chooseTopthreeCtrl',['$scope','Data','$http','$state',
function($scope,Data,$http,$state){

      var participantID=Data.get_current_participantID();
      // Get the current program user is registered for
      $scope.currentRegisteredProgram = Data.get_current_registeredProgram();
      $scope.isMentor = $scope.currentRegisteredProgram.isMentor;
      $scope.isMatched = $scope.currentRegisteredProgram.isMatched;
      // Check if there is top 3 mentors
      $scope.topThreePresent;
      $scope.topThreeMentors = [];
      console.log($scope.currentRegisteredProgram);
      var mentorOne;
      var mentorTwo;
      var mentorThree;

      $scope.setMentorOne = function(mentor) {
        console.log(mentor);
      }

      $scope.setMentorTwo = function(mentor) {
        console.log(mentor);
      }

      $scope.setMentorThree = function(mentor) {
        console.log(mentor);
      }

      $scope.getback=function(){
        $state.go('home');
      }

      var topThreeReq = {
         method: 'GET',
         url: "https://api.dev.mbell.me/participant/" + participantID + "/topThree" ,
      };

      $http(topThreeReq).then(function(res){
        console.log(res);
        for(var i = 0; i < res.data.length; i++){
          $scope.topThreeMentors.push(res.data[i]);
        }
        $scope.topThreePresent = $scope.topThreeMentors.length;
      },function(res){
        console.log(res);
        $scope.topThreePresent = false;
      });

      $scope.submitChoice=function(){
        console.log(mentorOne + " " + mentorTwo + " " + mentorThree + " ");
        $state.go('home');
      }


}])














 