import express from 'express';
import bodyParser from 'body-parser';
import mongodb from 'mongodb';
import mongoose from 'mongoose';
import database from '../config/';


const db = new database().connect();
const app = express();
const { PORT = 80 } = process.env;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
require('../middleware')(app)


app.listen(PORT, () => {
	console.log(`Servidor Ready`);
});


/*
var Wallet = require('ethereumjs-wallet');
const EthWallet = Wallet.generate();


console.log("address: " + EthWallet.getAddressString());
console.log("privateKey: " + EthWallet.getPrivateKeyString());*/