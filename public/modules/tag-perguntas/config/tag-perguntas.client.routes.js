'use strict';

//Setting up route
angular.module('tag-perguntas').config(['$stateProvider',
	function($stateProvider) {
		// Tag perguntas state routing
		$stateProvider.
		state('listTagPerguntas', {
			url: '/tag-perguntas',
			templateUrl: 'modules/tag-perguntas/views/list-tag-perguntas.client.view.html'
		}).
		state('createTagPergunta', {
			url: '/tag-perguntas/create',
			templateUrl: 'modules/tag-perguntas/views/create-tag-pergunta.client.view.html'
		}).
		state('viewTagPergunta', {
			url: '/tag-perguntas/:tagPerguntaId',
			templateUrl: 'modules/tag-perguntas/views/view-tag-pergunta.client.view.html'
		}).
		state('editTagPergunta', {
			url: '/tag-perguntas/:tagPerguntaId/edit',
			templateUrl: 'modules/tag-perguntas/views/edit-tag-pergunta.client.view.html'
		});
	}
]);