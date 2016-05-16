'use strict';

var app = angular.module('simpleEbay');


app.controller('mainCtrl', function($scope, $state, Auth) {

    $scope.$watch(function() {
        return Auth.currentUser;
    }, function(newVal, oldVal) {
        $scope.currentUser = newVal;
    });

    $scope.logout = () => {
        Auth.logout()
            .then(res => {
                $state.go('home');
            })
    }
});

app.controller('homeCtrl', function($scope, Auth) {
    console.log('homeCtrl!');

});
app.controller('auctionCtrl', function($scope, Auction,  $state) {
    console.log('auctionCtrl!');

    getAllAuctions();

    function getAllAuctions() {
        Auction.getAll()
            .then(res => {
                $scope.auctions = res.data;
            })
            .catch(err => {
                console.log(err);
            })
    }
});

app.controller('auctionDetailCtrl', function($scope, Auction, name) {
    console.log('auctionDetailCtrl');
    $scope.auction = name.data;
});
app.controller('newAuctionCtrl', function($scope, Auction) {
    console.log('newAuctionCtrl!');

    $scope.addAuction = () => {
        $scope.auction.owner= $scope.currentUser._id;
        Auction.create($scope.auction)
            .then(res => {
                $scope.auction = {};
                Auction.getAll();
            })
            .catch(err => {
                console.log(err);
            })
    }
});

app.controller('authFormCtrl', function($scope, $state, Auth) {
    console.log('authFormCtrl!');

    $scope.currentState = $state.current.name;

    $scope.submitForm = (user) => {
        // register user
        if ($scope.user.password !== $scope.user.password2) {
            $scope.user.password = '';
            $scope.user.password2 = '';
            alert('Passwords must match.')
        } else {
            console.log(user)
            Auth.register($scope.user)
                .then(res => {
                    return Auth.login($scope.user);
                })
                .then(res => {

                    $state.go('newAuction');
                })
                .catch(res => {
                    alert(res.data.error);
                });
        }

    };
});
app.controller('loginCtrl', function($scope, $state, Auth) {
    console.log('loginCtrl');
    $scope.loginForm = () => {
        Auth.login($scope.user)
            .then(res => {
                $state.go('newAuction');
            })
            .catch(res => {
                alert(res.data.error);
            })

    }
});
