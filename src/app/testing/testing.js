angular.module( 'ngBoilerplate.testing', [
  'ui.router',
  'plusOne'
])



.config(function config( $stateProvider ) {
  $stateProvider.state( 'testing', {
    url: '/testing',
    views: {
      "main": {
        controller: 'TestingCtrl',
        templateUrl: 'testing/testing.tpl.html'
      }
    },
    data:{ pageTitle: 'Testing' }
  });
})

.controller( 'TestingCtrl', function HomeController( $scope ) {
  $scope.login = function (provider) {
    alert('trying to log in with ' + provider);
  };
});

function CollapseDemoCtrl($scope) {
  $scope.isCollapsed = false;
}


var myapp = angular.module("myapp", ["firebase"]);
myapp.controller("MyController", ["$scope", "$firebase",
  function($scope, $firebase) {
    $scope.items = $firebase(new Firebase('https://boiling-fire-6744.firebaseio.com'));
  }
]);


