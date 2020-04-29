require('../../../models/users');

const Wallet = require('ethereumjs-wallet');
const mongoose = require('mongoose');
const Users = mongoose.model('usersModel');


module.exports = (req, res, next) => {

	const { email } = req.body;
	const EthWallet = Wallet.generate();

	Users.findOne({email: email}, (e, data) => {

		
		if(data){
			res.json({
				status: 'exist',
				data: data
			});
		} else {

			let us = new Users({
				email: email,
				publicKey: EthWallet.getAddressString(),
				privateKey: EthWallet.getPrivateKeyString()
			});

			us.save(() => {
				res.json({
					status: 'done',
					data: us
				})
			});

		}



	});

}