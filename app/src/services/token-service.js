tokenService.$inject = ['$window'];

const TOKEN_NAME = 'token';
const ID = 'id';

export default function tokenService($window) {

  return {
    get(){
      return $window.localStorage.getItem(TOKEN_NAME);
    },
    set(payload){
      $window.localStorage.setItem(TOKEN_NAME, payload.token);
      $window.localStorage.setItem(ID, payload.id);
    },
    remove(){
      $window.localStorage.removeItem(TOKEN_NAME);
      $window.localStorage.removeItem(ID);
    }
  };

}
