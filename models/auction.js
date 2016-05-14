'use strict';

var mongoose = require('mongoose');

var auctionSchema = new mongoose.Schema({
    description: {type: String, required: true},
    image: {type: String, required: true},
    startTime:{type: Date, default: Date.now},
    endTime: {type: Date, required: true},
    category: {type: String, required: true},
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    initialBid: {type: Number, required: true},
    highestBid: [{
        value: {type: Number},
        bider: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
    }]
});


auctionSchema.statics.getOne = (id, cb) => {
    Auction.findById(id, (err, auction) => {
        if(err) return cb(err);

        else   cb(null, auction);
    });
};

auctionSchema.statics.create = (auctionObj, cb) => {
    var auction = new Auction({
        description: auctionObj.description,
        image: auctionObj.image,
        endTime: auctionObj.endTime,
        category: auctionObj.category,
        initialBid: auctionObj.initialBid,
    });
}

var Auction = mongoose.model('Auction', auctionSchema);

module.exports = Auction;
