'use strict';

//Setting up route
angular.module('filmes').config(['$stateProvider',
	function($stateProvider) {
		// Filmes state routing
		$stateProvider.
		state('listFilmes', {
			url: '/filmes',
			templateUrl: 'modules/filmes/views/list-filmes.client.view.html'
		}).
		state('createFilme', {
			url: '/filmes/create',
			templateUrl: 'modules/filmes/views/create-filme.client.view.html'
		}).
		state('viewFilme', {
			url: '/filmes/:filmeId',
			templateUrl: 'modules/filmes/views/view-filme.client.view.html'
		}).
		state('editFilme', {
			url: '/filmes/:filmeId/edit',
			templateUrl: 'modules/filmes/views/edit-filme.client.view.html'
		});
	}
]);