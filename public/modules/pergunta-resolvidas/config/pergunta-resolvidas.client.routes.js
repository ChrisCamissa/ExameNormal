'use strict';

//Setting up route
angular.module('pergunta-resolvidas').config(['$stateProvider',
	function($stateProvider) {
		// Pergunta resolvidas state routing
		$stateProvider.
		state('listPerguntaResolvidas', {
			url: '/pergunta-resolvidas',
			templateUrl: 'modules/pergunta-resolvidas/views/list-pergunta-resolvidas.client.view.html'
		}).
		state('createPerguntaResolvida', {
			url: '/pergunta-resolvidas/create',
			templateUrl: 'modules/pergunta-resolvidas/views/create-pergunta-resolvida.client.view.html'
		}).
		state('viewPerguntaResolvida', {
			url: '/pergunta-resolvidas/:perguntaResolvidaId',
			templateUrl: 'modules/pergunta-resolvidas/views/view-pergunta-resolvida.client.view.html'
		}).
		state('editPerguntaResolvida', {
			url: '/pergunta-resolvidas/:perguntaResolvidaId/edit',
			templateUrl: 'modules/pergunta-resolvidas/views/edit-pergunta-resolvida.client.view.html'
		});
	}
]);