var express = require('express');
var router = express.Router();

var Auction = require('../models/auction');

router.get('/', (req, res) => {
    Auction.find({}, (err, auctions) => {
        if(err) return res.status(400).send(err);

        else res.send(auctions);
    });
});

router.get('/:id', (req, res) => {
    Auction.getOne(req.params.id, (err, auction) => {
        if(err){
            res.status(400).send(err);
        } else {
            res.send(auction);
        }
    });

});

router.put('/', (req, res) => {
    Auction.create(req.body, (err, auction) => {
        if(err) {
            res.status(400).send(err);
        } else {
            res.send(auction);
        }
    })
})
module.exports = router;
