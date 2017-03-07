angular.module('app.services', ['ngStorage'])

.factory('BlankFactory', [function(){

}])

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


        return{
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





.factory('Auth', ['$http', '$localStorage', function($http, $localStorage){      //factory for Auth
        


        return {
            save: function(data, success, error) {     //used for register
                $http.post('https://api.dev.mbell.me/', data).success(success).error(error)  //
            },
            logout: function(success) {
                delete $localStorage.token;
                $state.go('login');
                success();
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




