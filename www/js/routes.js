angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
  

  .state('profile', {
    url: '/page3',
    templateUrl: 'templates/profile.html',  //指定template链接
    controller: 'profileCtrl',
    cache: false
  })

  .state('contactPage', {
    url: '/page4',
    templateUrl: 'templates/contactPage.html',
    controller: 'contactPageCtrl',
    cache: false
  })

  .state('tabsController', {
    url: '/page1',
    templateUrl: 'templates/tabsController.html',
    abstract:true
  })

  .state('register', {
    url: '/page5',
    templateUrl: 'templates/register.html',
    controller: 'registerCtrl',
    cache: false
  })

  .state('login', {
    url: '/page6',
    templateUrl: 'templates/login.html',
    controller: 'loginCtrl',
    cache: false
  })

  .state('home', {
    url: '/page8',
    templateUrl: 'templates/home.html',
    controller: 'homeCtrl',
    cache: false

  })

  .state('myMentors', {
    url: '/page12',
    templateUrl: 'templates/myMentors.html',
    controller: 'myMentorsCtrl',
    cache: false
  })

  .state('myMentees', {
    url: '/page13',
    templateUrl: 'templates/myMentees.html',
    controller: 'myMenteesCtrl',
    cache: false
  })

  .state('learnFasterMentoring', {
    url: '/page9',
    templateUrl: 'templates/learnFasterMentoring.html',
    controller: 'learnFasterMentoringCtrl',
    cache: false
  })

  .state('registerProgram', {
    url: '/page10',
    templateUrl: 'templates/registerProgram.html',
    controller: 'registerProgramCtrl',
    cache: false
  })

  .state('yourInterests', {
    url: '/page11',
    templateUrl: 'templates/yourInterests.html',
    controller: 'yourInterestsCtrl',
    cache: false

  })

$urlRouterProvider.otherwise('/page6')  //change index.html to log in page

  

});