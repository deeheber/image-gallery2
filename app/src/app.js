import angular from 'angular';
import router from 'angular-ui-router';
import components from './components';
import services from './services';
import md from 'angular-material';
import 'angular-ui-router/release/stateEvents';
import ngDialog from 'ng-dialog';
import 'ng-dialog/css/ngDialog.css';
import 'ng-dialog/css/ngDialog-theme-default.css';

const app = angular.module('myApp', [
  router,
  angular.module('ui.router.state.events').name,
  ngDialog,
  components,
  services,
  md
]);

app.config(['$mdThemingProvider', function($mdThemingProvider){
  $mdThemingProvider.theme('default').dark();
}]);

export default app;
