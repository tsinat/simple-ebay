'use strict';

var app = angular.module('simpleEbay', ['ui.router']);


app.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('home', {
            url: '/',
            templateUrl: '/html/home.html',
            controller: 'homeCtrl'
        })
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
            url: '/auctionDetail/:id',
            templateUrl: '/html/auctionDetail.html',
            controller: 'auctionDetailCtrl',
            resolve: {
                name: function(Auction, $stateParams) {
                    console.log('$stateParams.id:', $stateParams.id);
                    return Auction.getOne($stateParams.id);
                }
            }
        })
        .state('newAuction', {
            url: '/newAuction',
            templateUrl: '/html/newAuction.html',
            controller: 'newAuctionCtrl',
            resolve: {
                profile: function(Auth, $q, $state) {
                    return Auth.getProfile()
                        .catch(() => {
                            $state.go('newAuction');
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
