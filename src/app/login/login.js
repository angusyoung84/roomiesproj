
//LOGGING IN FACEBOOK



angular.module( 'ngBoilerplate.login', [
 'ui.router',
 'placeholders',
 'ui.bootstrap'
])

.config(function config( $stateProvider ) {
 $stateProvider.state( 'login', {
   url: '/login',
   views: {
     "main": {
       controller: 'loginCtrl',
       templateUrl: 'login/login.tpl.html'
     } 
   }, 
   data:{ pageTitle: 'Log In' }
 });
})

.controller( 'loginCtrl', function loginCtrl( $scope, $rootScope) {

  $scope.attemptLogin=function(provider){
    console.log('attempting login');
    $rootScope.auth.$login(provider);  

  };

 })


;






//global scope
//dolar sign glocal

//$rootscope  