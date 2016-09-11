import angular from 'angular';

auth.$inject = ['$rootScope', 'userService', '$mdDialog', '$state'];

export default function auth($rootScope, userService, $mdDialog, $state){

  // TODO: Figure out a way to have content show depending on who is logged in
  // multi tenancy???
  $rootScope.$on('$stateChangeStart', (event, toState, toParams )=>{
    if (toState.data && toState.data.requiresAuth && !userService.isAuthenticated()){
      event.preventDefault();

      $mdDialog.show({
        parent: angular.element(document.body),
        template: '<md-dialog><user-auth success="success()"></user-auth></md-dialog>',
        controller: ['$scope', function($scope){
          $scope.success = function(){
            $mdDialog.hide();
            return $state.go(toState.name, toParams);
          };
        }],
        clickOutsideToClose: true,
        escapeToClose: true
      });

    }

  });
}
