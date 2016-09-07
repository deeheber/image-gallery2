import styles from './app-nav.scss';
import template from './app-nav.html';

export default {
  template,
  controller
};

controller.$inject = ['userService', '$state'];

function controller (userService, $state){
  this.styles = styles;
  this.logout = ()=>{
    userService.logout();
    $state.go('welcome');
  };
  this.isAuthenticated = userService.isAuthenticated;
}
