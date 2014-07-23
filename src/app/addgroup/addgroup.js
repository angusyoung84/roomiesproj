angular.module( 'ngBoilerplate.addgroup', [
  'ui.router',
  'placeholders',
  'ui.bootstrap'
])

.config(function config( $stateProvider ) {
  $stateProvider.state( 'addgroup', {
    url: '/addgroup',
    views: {
      "main": {
        controller: 'addgroupCtrl',
        templateUrl: 'addgroup/addgroup.tpl.html'
      }
    },
    data:{ pageTitle: 'Adding groups' }
  });
})

.controller( 'addgroupCtrl', function addgroupCtrl( $scope, $rootScope, $firebase, $state) {

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
  $rootScope.items = $firebase(ref);


  $scope.addGroup = function(name, item) {

    var ref1 = $firebase(new Firebase('https://boiling-fire-6744.firebaseio.com/groups'));
    var ref2 = $firebase(new Firebase('https://boiling-fire-6744.firebaseio.com/groups/'+$rootScope.user.id+'/group/'+item.id));
    
    // AngularFire $add method

    console.log("adding name");

    ref1.$add({'title':name}).then(function(ref) {
    ref.name();

    console.log("the key name is " + ref.name());
    ref2.$add({'title': ref.name()});

  });
  
  };



 

  function CollapseDemoCtrl($scope) {
  $scope.isCollapsed = false;
  }






});
