



angular.module( 'ngBoilerplate', [
 'templates-app',
 'templates-common',
 'ngBoilerplate.home',
 'ngBoilerplate.about',
 'ngBoilerplate.login', 
 'ngBoilerplate.group',  
 'ngBoilerplate.bill',
 'ngBoilerplate.addgroup',        
 'firebase', 
 'ui.router'
])

.config( function myAppConfig ($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/login');  

})

.constant("constants", {
  ref: new Firebase('https://boiling-fire-6744.firebaseio.com'),
  refURL: 'https://boiling-fire-6744.firebaseio.com/'
}) 

.run( function run () {
})

.controller( 'AppCtrl', function AppCtrl ( $scope, $rootScope, $firebaseSimpleLogin, $firebase, $state, constants ) {
  $rootScope.auth = $firebaseSimpleLogin(constants.ref); 

  //LOGGING IN 
  /*
  console.log('setting roomie');
  $rootScope.roomies = 'na';
  $scope.$state = $state;
  $scope.$on('$stateChangeStart', function(event, toState){

  // FOR EVERY STATE CHANGE, SYSTEM NEEDS TO CHECK IF THE USER IS LOGGED IN

    if(!$rootScope.auth.user){
      event.preventDefault();
      console.log('USER NOT LOGGED IN, REDIRECTING TO LOGIN PAGE');
      return $state.go('login');
    }
  });

*/

  $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
    if ( angular.isDefined( toState.data.pageTitle ) ) {
      $scope.pageTitle = toState.data.pageTitle + ' | ngBoilerplate' ;
    }  

  });

  //SIMPLE LOG IN, USING FACEBOOK

  $scope.$on('$firebaseSimpleLogin:login', function(event, user){ 
    console.log('Logged in, now user ID is: ' + JSON.stringify(user.thirdPartyUserData));
    $rootScope.user = user; 
    constants.ref.child('users').child(user.id).on('value', function(snapshot){
      if(snapshot.val()===null){
        console.log('doesnt exist');
        constants.ref.child('users').child(user.id).set(user.thirdPartyUserData);
        $state.go('home');

      }else{ 
        console.log('does exist');
        //$rootScope.roomies = snapshot.val().roomies;
       // console.log($rootScope.roomies);
        $state.go('home');
      }
    });   


    // routing according to the user type

    /*
    console.log('logging in so: '+ $rootScope.roomies);
    var done = $rootScope.$watch('roomies', function (roomies){
      if(roomies){ 
        if($state.is('login') && $rootScope.roomies === true){
          console.log('going roomies ');
          return $state.go('login'); 
        }else if ($state.is('login') && $rootScope.roomies === false){
          console.log('going !roomies');
          return $state.go('dashhome');
        }else if ($state.is('login') && $rootScope.roomies === 'na'){
          console.log ('invalid should not get here');
        }
        done();
      }
    }); */
  }); 

  // logging out of facebook  
  
  $scope.$on('$firebaseSimpleLogin:logout', function(event, user){
    console.log('setting logged in values to null');
    $rootScope.user = null;
    return $state.go('login');
  });


  

})

; 