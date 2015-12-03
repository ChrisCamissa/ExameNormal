'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var alugueres = require('../../app/controllers/alugueres.server.controller');

	// Alugueres Routes
	app.route('/alugueres')
		.get(alugueres.list)
		.post(users.requiresLogin, alugueres.create);

	app.route('/alugueres/:aluguereId')
		.get(alugueres.read)
		.put(users.requiresLogin, alugueres.hasAuthorization, alugueres.update)
		.delete(users.requiresLogin, alugueres.hasAuthorization, alugueres.delete);

	// Finish by binding the Aluguere middleware
	app.param('aluguereId', alugueres.aluguereByID);
};
