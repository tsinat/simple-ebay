'use strict';

var app = angular.module('simpleEbay');

app.service('Auth', function($http, $q) {

  this.register = userObj => {
    return $http.post('/api/users/register', userObj);
  };

  this.login = userObj => {
    return $http.post('/api/users/authenticate', userObj)
      .then(res => {
          console.log(res.data);
         this.currentUser = res.data;
        // return this.getProfile(res.data._id);
      });
  };

  this.logout = () => {
    return $http.post('/api/users/logout')
      .then(res => {
        this.currentUser = null;
        return $q.resolve();
      });
  };

  this.getProfile = id => {
    return $http.get('/api/users/${id}')
      .then(res => {
        this.currentUser = res.data;
        return $q.resolve(res.data);
      })
      .catch(res => {
        this.currentUser = null;
        return $q.reject(res.data);
      });
  };
});

app.service('Auction', function($http, $q) {
    this.create = auction => {
        return $http.post('/api/auctions/', auction);
    };

    this.getAll = () => {
        return $http.get('/api/auctions');
    }
    this.getOne = id => {
        return $http.get(`/api/auctions/${id}`)
    }
});
