export default {
  template: `
	<md-dialog-content>
    <md-radio-group ng-model="$ctrl.action" layout="row">
      <md-radio-button class="md-accent" ng-model="$ctrl.action" value="signin">
          Signin
      </md-radio-button>
      <md-radio-button class="md-accent" ng-model="$ctrl.action" value="signup">
          Signup
      </md-radio-button>
    </md-radio-group>
	<signin ng-if="$ctrl.action==='signin'" success="$ctrl.success()"></signin>
	<signup ng-if="$ctrl.action==='signup'" success="$ctrl.success()"></signup>
  `,
  bindings: {
    success: '&'
  },
  controller
};

function controller() {
  this.action = 'signin';
}
