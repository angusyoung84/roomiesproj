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
angular.module( 'ngBoilerplate.bill', [
  'ui.router',
  'plusOne'
])




.config(function config( $stateProvider ) {
  $stateProvider.state( 'bill', {
    url: '/bill',
    views: {
      "main": {
        controller: 'billCtrl',
        templateUrl: 'bill/bill.tpl.html'
      }
    },
    data:{ pageTitle: 'bill' }
  });
})

.controller( 'billCtrl', function groupController( $scope, $rootScope, $firebase, $state) {

  var ref = new Firebase('https://boiling-fire-6744.firebaseio.com/users/');
  $rootScope.items = $firebase(ref);
  $scope.people = $firebase(ref);

  $scope.addBill = function(title, price, description, item) {

    var ref1 = $firebase(new Firebase('https://boiling-fire-6744.firebaseio.com/groups/transactions/'));
    // AngularFire $add method

    console.log(item.id);

    console.log("adding title");
    console.log(title);
    ref1.$add({'creditor':$rootScope.user.id, 'debtor':item.id, 'title':title, 'price':price, 'description': description}).then(function(ref) {
      ref.name(); 

      var ref2 = $firebase(new Firebase('https://boiling-fire-6744.firebaseio.com/users/' + item.id + '/transaction/'));
      var ref3 = $firebase(new Firebase('https://boiling-fire-6744.firebaseio.com/users/' + $rootScope.user.id + '/transaction/'));

        ref2.child('owes').$add(ref.name());
        ref3.child('isOwed').$add(ref.name());

    });




    console.log("adding price");
    console.log(price);
    //$scope.people.$add($scope.price);
    console.log("adding description");
    console.log(description);
  
  };


    
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



 

  function CollapseDemoCtrl($scope) {
  $scope.isCollapsed = false;
  }






});
