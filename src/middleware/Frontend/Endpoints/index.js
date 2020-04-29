import express from 'express';
const r = express.Router();

r.route('/')
.get(require('./home'));



module.exports = r;