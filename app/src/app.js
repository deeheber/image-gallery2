import angular from 'angular';
import router from 'angular-ui-router';
import components from './components';
import services from './services';
import md from 'angular-material';
import messages from 'angular-messages';
import 'angular-ui-router/release/stateEvents';

const app = angular.module('myApp', [
  router,
  angular.module('ui.router.state.events').name,
  messages,
  components,
  services,
  md
]);

app.config(['$mdThemingProvider', function($mdThemingProvider){
  $mdThemingProvider.theme('default')
  .accentPalette('cyan')
  .warnPalette('amber')
  .dark();
}]);

export default app;
