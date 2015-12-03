'use strict';

//Setting up route
angular.module('curso-disciplinas').config(['$stateProvider',
	function($stateProvider) {
		// Curso disciplinas state routing
		$stateProvider.
		state('listCursoDisciplinas', {
			url: '/curso-disciplinas',
			templateUrl: 'modules/curso-disciplinas/views/list-curso-disciplinas.client.view.html'
		}).
		state('createCursoDisciplina', {
			url: '/curso-disciplinas/create',
			templateUrl: 'modules/curso-disciplinas/views/create-curso-disciplina.client.view.html'
		}).
		state('viewCursoDisciplina', {
			url: '/curso-disciplinas/:cursoDisciplinaId',
			templateUrl: 'modules/curso-disciplinas/views/view-curso-disciplina.client.view.html'
		}).
		state('editCursoDisciplina', {
			url: '/curso-disciplinas/:cursoDisciplinaId/edit',
			templateUrl: 'modules/curso-disciplinas/views/edit-curso-disciplina.client.view.html'
		});
	}
]);