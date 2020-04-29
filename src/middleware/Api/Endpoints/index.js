import express from 'express';
const r = express.Router();

r.route('/wallet/new')
.post(require('./wallet_new'));



module.exports = r;