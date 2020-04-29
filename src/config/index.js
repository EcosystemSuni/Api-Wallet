'use strict';

import mongoose from 'mongoose';


class Database{

	constructor(){
	}

	connect(){
		 mongoose.set('useCreateIndex', true);
		 mongoose.connect('mongodb://localhost:27017/suni', {useNewUrlParser: true, useUnifiedTopology: true}, function(err, res) {
	        if (err) throw err;
	        console.log(`Database connect`);
	    });
	}


}

export default Database;