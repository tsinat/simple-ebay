'use strict';

var app = angular.module('simpleEbay', ['ui.router']);

// app.run(function(Auth) {
//   Auth.getProfile();
// });

app.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('home', { url: '/', templateUrl: '/html/home.html', controller: 'homeCtrl' })
    .state('register', {
      url: '/register',
      templateUrl: '/html/authForm.html',
      controller: 'authFormCtrl'
    })
    .state('login', {
      url: '/login',
      templateUrl: '/html/login.html',
      controller: 'loginCtrl'
    })
    .state('auction', {
      url: '/auction',
      templateUrl: '/html/auctionList.html',
      controller: 'auctionCtrl'
    })
    .state('auctionDetail', {
      url: '/auctionDetail',
      templateUrl: '/html/auctionDetail.html',
      controller: 'auctionDetailCtrl'
    })
    .state('newAuction', {
      url: '/newAuction',
      templateUrl: '/html/newAuction.html',
      controller: 'newAuctionCtrl',
      resolve: {
        profile: function(Auth, $q, $state) {
          return Auth.getProfile()
          .catch(() => {
            $state.go('home');
            return $q.reject();
          });
        }
      }
    })

  $urlRouterProvider.otherwise('/');
});

app.filter('titlecase', function() {
  return function(input) {
    return input[0].toUpperCase() + input.slice(1).toLowerCase();
  };
});
