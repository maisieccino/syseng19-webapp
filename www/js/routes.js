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
    controller: 'profileCtrl'
  })

  .state('contactPage', {
    url: '/page4',
    templateUrl: 'templates/contactPage.html',
    controller: 'contactPageCtrl'
  })

  .state('tabsController', {
    url: '/page1',
    templateUrl: 'templates/tabsController.html',
    abstract:true
  })

  .state('register', {
    url: '/page5',
    templateUrl: 'templates/register.html',
    controller: 'registerCtrl'
  })

  .state('login', {
    url: '/page6',
    templateUrl: 'templates/login.html',
    controller: 'loginCtrl'
  })

  .state('home', {
    url: '/page8',
    templateUrl: 'templates/home.html',
    controller: 'homeCtrl'
  })

  .state('myMentors', {
    url: '/page12',
    templateUrl: 'templates/myMentors.html',
    controller: 'myMentorsCtrl'
  })

  .state('myMentees', {
    url: '/page13',
    templateUrl: 'templates/myMentees.html',
    controller: 'myMenteesCtrl'
  })

  .state('learnFasterMentoring', {
    url: '/page9',
    templateUrl: 'templates/learnFasterMentoring.html',
    controller: 'learnFasterMentoringCtrl'
  })

  .state('registerProgram', {
    url: '/page10',
    templateUrl: 'templates/registerProgram.html',
    controller: 'registerProgramCtrl'
  })

  .state('yourInterests', {
    url: '/page11',
    templateUrl: 'templates/yourInterests.html',
    controller: 'yourInterestsCtrl'
  })

$urlRouterProvider.otherwise('/page6')  //change index.html to log in page

  

});