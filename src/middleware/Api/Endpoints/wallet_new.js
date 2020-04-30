const wctr = require('../../../controllers/walletController');

module.exports = (req, res, next) => {

	var wt = wctr(req);
	
	wt.then((data) => {

		res.json(data);

	});
	

}