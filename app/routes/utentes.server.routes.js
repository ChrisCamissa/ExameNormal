'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var utentes = require('../../app/controllers/utentes.server.controller');

	// Utentes Routes
	app.route('/utentes')
		.get(utentes.list)
		.post(users.requiresLogin, utentes.create);

	// Utentes List
	app.route('/utentes/listar')
		.get(utentes.listar)
		
	app.route('/utentes/:utenteId')
		.get(utentes.read)
		.put(users.requiresLogin, utentes.hasAuthorization, utentes.update)
		.delete(users.requiresLogin, utentes.hasAuthorization, utentes.delete);

	// Finish by binding the Utente middleware
	app.param('utenteId', utentes.utenteByID);
};
