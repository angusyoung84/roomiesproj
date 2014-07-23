/**
 * Each section of the site has its own module. It probably also has
 * submodules, though this boilerplate is too simple to demonstrate it. Within
 * `src/app/group`, however, could exist several additional folders representing
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
angular.module( 'ngBoilerplate.group', [
  'ui.router',
  'plusOne'
])




.config(function config( $stateProvider ) {
  $stateProvider.state( 'group', {
    url: '/group',
    views: {
      "main": {
        controller: 'groupCtrl',
        templateUrl: 'group/group.tpl.html'
      }
    },
    data:{ pageTitle: 'group' }
  });
})

.controller( 'groupCtrl', function groupController( $scope, $rootScope, $firebase, $state) {

    //var userRef = new Firebase('https://boiling-fire-6744.firebaseio.com/users').child($rootScope.user.id);
    //$scope.user = $firebase(userRef);
    
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

  var ref = new Firebase('https://boiling-fire-6744.firebaseio.com/users/');
  //var us = [];
  //snapshot etc, for each --> if it doesnt have hte same uid as current logged in user then push it to us. and then assign us to items @ end
  $rootScope.items = $firebase(ref);

    // Add new TODO
    $scope.addItem  = function (item) {
        // Get the Firebase reference of the item
        console.log("adding item");
        var itemRef = new Firebase('https://boiling-fire-6744.firebaseio.com/groups/'+$rootScope.user.id+'/group/'+item.id);


        $firebase(itemRef).$update({
            name : item.name,
            id : item.id,
            info : item.picture.data
        });

        console.log("updating stuff");
        var updateId = new Firebase('https://boiling-fire-6744.firebaseio.com/users/' + item.id);


        $firebase(updateId).$update({

            group : $rootScope.user.id
              
        });

};


  




});
