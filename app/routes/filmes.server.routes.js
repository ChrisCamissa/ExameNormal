'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var filmes = require('../../app/controllers/filmes.server.controller');

	// Filmes Routes
	app.route('/filmes')
		.get(filmes.list)
		.post(users.requiresLogin, filmes.create);

	//Filmes List
	app.route('/filmes/listar')
	.get(filmes.listar)

	app.route('/filmes/:filmeId')
		.get(filmes.read)
		.put(users.requiresLogin, filmes.hasAuthorization, filmes.update)
		.delete(users.requiresLogin, filmes.hasAuthorization, filmes.delete);

	// Finish by binding the Filme middleware
	app.param('filmeId', filmes.filmeByID);
};