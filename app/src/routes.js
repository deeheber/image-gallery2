configRoutes.$inject = ['$stateProvider', '$urlRouterProvider'];

export default function configRoutes($stateProvider, $urlRouterProvider){

  $stateProvider
    .state('welcome', {
      url: '/',
      views: {
        header: {
          component: 'appNav'
        },
        main: {
          component: 'welcome'
        }
      }
    })

    .state('list-albums', {
      url: '/albums',
      data: {
        requiresAuth: true
      },
      views: {
        header: {
          component: 'appNav'
        },
        main: {
          component: 'listAlbums'
        }
      }
    })

    .state('view-album', {
      url: '/album/:albumId?display',
      data: {
        requiresAuth: true
      },
      params: {display: {dynamic: true}},
      resolve: {
        albumId: ['$stateParams', (params)=>params.albumId],
        display: ['$stateParams', (params)=>params.display || 'list']
      },
      views: {
        header: {
          component: 'appNav'
        },
        main: {
          component: 'album'
        }
      }
    });

  $urlRouterProvider.otherwise( '/' );
}
