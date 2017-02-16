// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('app', ['ionic', 'app.controllers', 'app.routes', 'app.directives','app.services','ngStorage'])

.config(function($ionicConfigProvider, $sceDelegateProvider){
  

  $sceDelegateProvider.resourceUrlWhitelist([ 'self','*://www.youtube.com/**', '*://player.vimeo.com/video/**']);

})


.config(function ($httpProvider,$ionicConfigProvider,$provide) {  //拦截器,用来拦截请求并在header添加token

    $provide.service('myinterceptor',['$localStorage','$q','$injector',function($httpProvider,$localStorage,$q,$injector){

        //拦截器,用来拦截请求并在header添加token
           
            return {
                'request': function (config) {  //
                    config.headers = config.headers || {};
                    if ($localStorage.token) {
                        config.headers.Authorization = 'Bearer ' + $localStorage.token;
                    }
                    return config;
                },
                'responseError': function(response) {
                    if(response.status === 401 || response.status === 403) {
                        $injector.get('$state').transitionTo('login');  //因为报错或者token过期,返回login page
                    }
                    return $q.reject(response);
                }
            };//结束return

        }])//结束service

     $httpProvider.interceptors.push('myinterceptor'); //结束interceptor push
    
  }
)//结束config


// .config(['$httpProvider','$localStorage', function ($httpProvider,$localStorage) {

//     var interceptor = ['$q', '$localStorage', '$state', '$injector', function($q, $localStorage, $state, $injector) {

//         return {
//                 'request': function (config) {  //
//                     config.headers = config.headers || {};
//                     if ($localStorage.token) {
//                         config.headers.Authorization = 'Bearer ' + $localStorage.token;
//                     }
//                     return config;
//                 },
//                 'responseError': function(response) {
//                     if(response.status === 401 || response.status === 403) {
//                         $state.go('login');  //因为报错,返回login page
//                     }
//                     return $q.reject(response);
//                 }
//             };//结束return
//     }];

//     $httpProvider.interceptors.push(interceptor);
// }])




.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

/*
  This directive is used to disable the "drag to open" functionality of the Side-Menu
  when you are dragging a Slider component.
*/
.directive('disableSideMenuDrag', ['$ionicSideMenuDelegate', '$rootScope', function($ionicSideMenuDelegate, $rootScope) {
    return {
        restrict: "A",  
        controller: ['$scope', '$element', '$attrs', function ($scope, $element, $attrs) {

            function stopDrag(){
              $ionicSideMenuDelegate.canDragContent(false);
            }

            function allowDrag(){
              $ionicSideMenuDelegate.canDragContent(true);
            }

            $rootScope.$on('$ionicSlides.slideChangeEnd', allowDrag);
            $element.on('touchstart', stopDrag);
            $element.on('touchend', allowDrag);
            $element.on('mousedown', stopDrag);
            $element.on('mouseup', allowDrag);

        }]
    };
}])

/*
  This directive is used to open regular and dynamic href links inside of inappbrowser.
*/
.directive('hrefInappbrowser', function() {
  return {
    restrict: 'A',
    replace: false,
    transclude: false,
    link: function(scope, element, attrs) {
      var href = attrs['hrefInappbrowser'];

      attrs.$observe('hrefInappbrowser', function(val){
        href = val;
      });
      
      element.bind('click', function (event) {

        window.open(href, '_system', 'location=yes');

        event.preventDefault();
        event.stopPropagation();

      });
    }
  };
});