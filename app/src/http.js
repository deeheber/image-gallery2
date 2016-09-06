configHttp.$inject = ['$httpProvider'];

export default function configHttp($httpProvider){
  $httpProvider.interceptors.push(interceptor);
}

interceptor.$inject = ['$window', 'tokenService', '$state'];

function interceptor($window, tokenService, $state){

  return {
    request(config){
      config.headers = config.headers || {};

      const token = tokenService.get();

      if (token){
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    },
    responseError(response) {
      if (response.status >= 400 && response.status < 500){
        tokenService.remove();
        $state.go('home');
      }
      return Promise.reject(response);
    }
  };
}
