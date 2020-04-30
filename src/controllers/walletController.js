require('../models/users');
const Wallet = require('ethereumjs-wallet');
const mongoose = require('mongoose');
const Users = mongoose.model('usersModel');
const Web3 = require('web3');

let web3 = new Web3(new Web3.providers.HttpProvider('https://mainnet.infura.io/v3/c03841c3f32e45d28b0704b508c248b5'));

module.exports = (req) => {

	let { email } = req.body;
	const EthWallet = Wallet.generate();

	return new Promise((resolve, reject) => {

		Users.findOne({email: email}, (e, data) => {

			if(data){

				var addr = (data.publicKey);
				var contractAddr = ('0x48a57FDF37EAD873F472Bb257508Ea38989FcA57');
				var tknAddress = (addr).substring(2);
				var contractData = ('0x70a08231000000000000000000000000' + tknAddress);

				web3.eth.call({
				    to: contractAddr, 
				    data: contractData 
				    }, function(err, result) {
					if (result) { 

						var tokens = web3.utils.toBN(result).toString();
						var balance = web3.utils.fromWei(tokens, 'ether')

						Users.findOneAndUpdate({email: email}, 
						{ $set: {balance} }, 
						(e, data) => {

							resolve({
								status: 'done',
								data: data
							});
						
						});
						
					}
					else {
						console.log(err); 
					}
				});

				
			} else {

				let us = new Users({
					email: email,
					publicKey: EthWallet.getAddressString(),
					privateKey: EthWallet.getPrivateKeyString(),
					balance: 0
				});

				us.save(() => {
					resolve({
						status: 'done',
						data: us
					});
				});

			}


		});


	});


}