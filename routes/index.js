var express = require('express');
var router = express.Router();

var User = require('../models/user');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', {
        title: 'Express'
    });
});


// router.get('/secret', User.auth(), (req, res) => {
//     console.log('req.user:', req.user);
//     res.send('SECRET STUFF!!!');
// });
//
// router.get('/admin', User.auth('admin'), (req, res) => {
//     console.log('req.user:', req.user);
//     res.send('ADMIN STUFF!!!');
// });


module.exports = router;
