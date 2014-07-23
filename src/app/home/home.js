/**
 * Each section of the site has its own module. It probably also has
 * submodules, though this boilerplate is too simple to demonstrate it. Within
 * `src/app/home`, however, could exist several additional folders representing
 * additional modules that would then be listed as dependencies of this one.
 * For example, a `note` section could have the submodules `note.create`,
 * `note.delete`, `note.edit`, etc.
 *
 * Regardless, so long as dependencies are managed correctly, the build process
 * will automatically take take of the rest.
 *
 * The dependencies block here is also where component dependencies should be
 * specified, as shown below.
 */
angular.module( 'ngBoilerplate.home', [
  'ui.router',
  'plusOne'
])




.config(function config( $stateProvider ) {
  $stateProvider.state( 'home', {
    url: '/home',
    views: {
      "main": {
        controller: 'HomeCtrl',
        templateUrl: 'home/home.tpl.html'
      }
    },
    data:{ pageTitle: 'Home' }
  });
})

.controller( 'HomeCtrl', function HomeController( $scope, $rootScope, $firebase, $state) {


  var ref1 = new Firebase("https://boiling-fire-6744.firebaseio.com/groups/transactions/10100564121867105");
  




  var ref = new Firebase('https://boiling-fire-6744.firebaseio.com/groups/'+$rootScope.user.id+'/group');
  console.log(ref);
  $rootScope.usersGroup = $firebase(ref);
    
  var done = $rootScope.$watch('user.id', function(id) {
    if (id) {
      $scope.user = $firebase(new Firebase('https://boiling-fire-6744.firebaseio.com/users/'+$rootScope.user.id+'/'));
      done();
    }
  });  

  $scope.logout=function(){
  console.log('logout biatch');
  $rootScope.auth.$logout();   
  
};


  $scope.delItem  = function (item) {
      // Get the Firebase reference of the item
      console.log("deleting item");
      var itemRefForDel = new Firebase('https://boiling-fire-6744.firebaseio.com/groups/' + $rootScope.user.id + '/group/' + item.id);


      $firebase(itemRefForDel).$remove({
          name : item.name,
          id : item.id,
          info : item.picture.data
      });

    };


});






