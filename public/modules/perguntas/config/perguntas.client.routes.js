'use strict';

//Setting up route
angular.module('perguntas').config(['$stateProvider',
	function($stateProvider) {
		// Perguntas state routing
		$stateProvider.
		state('listPerguntas', {
			url: '/perguntas',
			templateUrl: 'modules/perguntas/views/list-perguntas.client.view.html'
		}).
		state('createPergunta', {
			url: '/perguntas/create',
			templateUrl: 'modules/perguntas/views/create-pergunta.client.view.html'
		}).
		state('viewPergunta', {
			url: '/perguntas/:perguntaId',
			templateUrl: 'modules/perguntas/views/view-pergunta.client.view.html'
		}).
		state('editPergunta', {
			url: '/perguntas/:perguntaId/edit',
			templateUrl: 'modules/perguntas/views/view-pergunta.client.view.html'
		});
	}
]);