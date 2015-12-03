'use strict';

//Setting up route
angular.module('tarefas').config(['$stateProvider',
	function($stateProvider) {
		// Tarefas state routing
		$stateProvider.
		state('create-tarefa', {
			url: '/tarefas/create',
			templateUrl: 'modules/tarefas/views/create-tarefa.client.view.html'
		}).
		state('tarefas', {
			url: '/tarefas',
			templateUrl: 'modules/tarefas/views/tarefas.client.view.html'
		}).
		state('viewTarefa',{
			url:'/tarefas/:tarefaId',
			templateUrl:'modules/tarefas/views/view-tarefa.client.view.html'
		});
	}
]);
