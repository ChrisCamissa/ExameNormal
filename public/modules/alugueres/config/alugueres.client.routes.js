'use strict';

//Setting up route
angular.module('alugueres').config(['$stateProvider',
	function($stateProvider) {
		// Alugueres state routing
		$stateProvider.
		state('listAlugueres', {
			url: '/alugueres',
			templateUrl: 'modules/alugueres/views/list-alugueres.client.view.html'
		}).
		state('createAluguere', {
			url: '/alugueres/create',
			templateUrl: 'modules/alugueres/views/create-aluguere.client.view.html'
		}).
		state('viewAluguere', {
			url: '/alugueres/:aluguereId',
			templateUrl: 'modules/alugueres/views/view-aluguere.client.view.html'
		}).
		state('editAluguere', {
			url: '/alugueres/:aluguereId/edit',
			templateUrl: 'modules/alugueres/views/edit-aluguere.client.view.html'
		});
	}
]);