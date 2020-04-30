'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Users = new Schema({
	email: String,
	publicKey: String,
	privateKey: String,
	client: String,
	balance: Number,
	createdAt : {type: Date, default: Date.now}
});

module.exports = mongoose.model('usersModel', Users);