'use strict';

module.exports = function(app) {
	// Routing logic   
	// ...

	var devolucaos=require('../../app/controllers/devolucaos.server.controller');

	//Every request without a parameter
	app.route('/devolucaos')
		.get(devolucaos.list)
		.post(devolucaos.create);

		/**
		*every request with a devolucaoId parameter
		*/ 
	app.route('/devolucaos/:devolucaoId')
		.get(devolucaos.read)
		.put(devolucaos.update)
		.delete(devolucaos.delete);
};