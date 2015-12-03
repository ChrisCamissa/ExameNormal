'use strict';

//Setting up route
angular.module('disciplinas').config(['$stateProvider',
	function($stateProvider) {
		// Disciplinas state routing
		$stateProvider.
		state('listDisciplinas', {
			url: '/disciplinas',
			templateUrl: 'modules/disciplinas/views/list-disciplinas.client.view.html'
		}).
		state('createDisciplina', {
			url: '/disciplinas/create',
			templateUrl: 'modules/disciplinas/views/create-disciplina.client.view.html'
		}).
		state('viewDisciplina', {
			url: '/disciplinas/:disciplinaId',
			templateUrl: 'modules/disciplinas/views/view-disciplina.client.view.html'
		}).
		state('editDisciplina', {
			url: '/disciplinas/:disciplinaId/edit',
			templateUrl: 'modules/disciplinas/views/edit-disciplina.client.view.html'
		});
	}
]);