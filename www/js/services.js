angular.module('app.services', ['ngStorage'])

.factory('BlankFactory', [function(){

}])

// Service to transfer register details to login page upon successful registration
.service('registerService', function() {
  var credentials = [];

  var addCredentials = function(userEmail,password) {
      credentials.push(userEmail);
      credentials.push(password);
  };

  var getEmail = function(){
      return credentials[0];
  };

  var getPassword = function(){
      return credentials[1];
  };

  return {
    addCredentials: addCredentials,
    getEmail: getEmail,
    getPassword: getPassword
  };

})

.factory('Data', function(){
       var current_program=null;    
       var Interests=null;
       var mentype="mentor";   //return "mentee" or "mentor"  itialised as "mentor"
       var selection=[];
       var times_per_week=null;
       var program_isregistered={
        learnFaster:"false",
        Accelerates:"false",
        manage:"false"
       };

       var current_cohortID=null;




        return{
            set_current_cohortID:function(id1){
                current_cohortID=id1;
            },
            get_current_cohortID: function(){
                return current_cohortID;
            },
            show_program:function(){
                // return this.current_program;
                return current_program;
            },
            set_current_program:function(da){
                current_program=da;
            },
            show_interests:function(){
                return interests;
            },
            set_mentype:function(da){
                mentype=da;
            },
            show_mentype:function(){
                return mentype;
            },
            show_selection_index:function(interests){
                return selection.indexOf(interests);
            },
            selection_delete:function(id){
                selection.splice(id,1);
            },
            selection_add:function(interests){
                selection.push(interests);
            },
            return_selection:function(){
                return selection;
            },
            clear_selection: function(){
                selection=[];
                current_program=null;    
                Interests=null;
                mentype="mentor"; 
                times_per_week=null;

            },
            set_times_perweek: function(ab){
                times_per_week=ab;
            },
            get_times_perweek: function(){
                return times_per_week;
            },

            get_isregistered_learnFatser: function(){
                return program_isregistered.learnFaster;
            },
            get_isregistered_Accelerates: function(){
                return program_isregistered.Accelerates;
            },
            get_isregistered_manage: function(){
                return program_isregistered.manage;
            },

            // I added this to reset settings when users decide to change their minds and click the back button 
            reset_settings: function(){
                current_program=current_program;    
                Interests=null;
                mentype="mentor";   //return "mentee" or "mentor"  itialised as "mentor"
                selection=[];
                times_per_week=null;
            }


        }
        


})

// Currently unused
.factory('userProfile', function(){
       var first_name;
       var last_name;
       var userEmail;    

        return{
            setFirstName: function(firstName){
                first_name = firstName;
            },
            setLastName: function(lastName){
                last_name = lastName;
            },
            setEmail: function(email){
                userEmail = email;
            },
            getFirstName: function(){
                return first_name;
            },
            getLastName: function(){
                return last_name;
            },
            getEmail: function(){
                return userEmail;
            }
        }
        
})

///////This is the program data model control , including the adimin add new programs, the users update the home page from server

.factory('Program_Control',['$http',function($http){
    var AllProgram=[];

    var getData = function() {

        // Angular $http() and then() both return promises themselves 
        return $http({method:"GET", url:"https://api.dev.mbell.me/programme/"}).then(function(result){

            // What we return here is the data that will be accessible 
            // to us after the promise resolves
            return result.data;
        });
    };
    
    return { getData: getData };


    return { 


        GetAllProgram: function(){
            var req = {
            method: 'GET',
            url: "https://api.dev.mbell.me/programme/",
            headers: {
            'Content-type': 'application/json'
             },
            };
           $http(req).then(function(res,callback){
            AllProgram=res.data;
            return AllProgram;
           },function(res){
           console.log(res.headers());
          }); 
        }
    };

}])

.factory('Cohort_Control',['$http',function($http){
    var AllCohort=[];

    var getData = function(programID) {

        // Angular $http() and then() both return promises themselves 
        return $http({method:"GET", url:"https://api.dev.mbell.me/programme/"+programID+"/cohorts/"}).then(function(result){

            // What we return here is the data that will be accessible 
            // to us after the promise resolves
            return result.data;
        });
    };
    
    return { getData: getData };


}])








.factory('Auth', ['$http', '$localStorage', function($http, $localStorage){      //factory for Auth
        

        return {
            save: function(data, success, error) {     //used for register
                $http.post('https://api.dev.mbell.me/user/', data).success(success).error(error)  //
            },
            logout: function(success) {
                delete $localStorage.token;
                $state.go('login');
                success();
            }
        };
    }
])


.factory('Mentorship_program',['$http',function($http){
        return{
            register: function(data,success,error){
                $http.post('https://api.dev.mbell.me/programme/',data).success(success).error(error)
            }

        };
    }
])
//app.config() could only use the provider serveice,
// .provider('myinterceptor',function(){

//     this.$get=function ($httpProvider,$localStorage,$state,$q) {  //拦截器,用来拦截请求并在header添加token
           
//             return {
//                 'request': function (config) {  //
//                     config.headers = config.headers || {};
//                     if ($localStorage.token) {
//                         config.headers.Authorization = 'Bearer ' + $localStorage.token;
//                     }
//                     return config;
//                 },
//                 'responseError': function(response) {
//                     if(response.status === 401 || response.status === 403) {
//                         // $state.go('login');  //因为报错,返回login page
//                     }
//                     return $q.reject(response);
//                 }
//             };//结束return

//         }//结束interceptor push
    

// })





.service('BlankService', [function(){

}]);




