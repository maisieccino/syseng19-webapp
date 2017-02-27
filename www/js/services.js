angular.module('app.services', ['ngStorage'])

.factory('BlankFactory', [function(){

}])

.factory('Data', function(){
       var current_program=undefined;    
       var interests=undefined;
       var mentype="mentor";   //return "mentee" or "mentor" 
       var selection=[];
       // var times_per_week=undefined;
       var times_per_week=undefined;


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
            },
            set_times_perweek: function(ab){
                times_per_week=ab;
            },
            get_times_perweek: function(){
                return times_per_week;
            }



        }
        


})





.factory('Auth', ['$http', '$localStorage', function($http, $localStorage){      //factory for Auth
        
        var baseUrl = "api.dev.mbell.me"; //set base URL 

        function changeUser(user) {
            angular.extend(currentUser, user);  //currentuser引用user的对象 即空对象{}
        }

        function urlBase64Decode(str) {
            var output = str.replace('-', '+').replace('_', '/');
            switch (output.length % 4) {
                case 0:
                    break;
                case 2:
                    output += '==';
                    break;
                case 3:
                    output += '=';
                    break;
                default:
                    throw 'Illegal base64url string!';
            }
            return window.atob(output);
        }

        function getUserFromToken() {
            var token = $localStorage.token;
            var user = {};
            if (typeof token !== 'undefined') {
                var encoded = token.split('.')[1];
                user = JSON.parse(urlBase64Decode(encoded));
            }
            return user;
        }

        var currentUser = getUserFromToken();

        return {
            save: function(data, success, error) {     //used for register
                $http.post(baseUrl + '/signin', data).success(success).error(error)  //
            },
            signin: function(data, success, error) {
                $http.post(baseUrl + '/authenticate', data).success(success).error(error)
            },
            logout: function(success) {
                changeUser({});
                delete $localStorage.token;
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




