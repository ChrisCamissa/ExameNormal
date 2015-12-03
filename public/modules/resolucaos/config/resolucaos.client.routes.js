'use strict';

//Setting up route
angular.module('resolucaos').config(['$stateProvider',
	function($stateProvider) {
		// Resolucaos state routing
		$stateProvider.
		state('listResolucaos', {
			url: '/resolucaos',
			templateUrl: 'modules/resolucaos/views/list-resolucaos.client.view.html'
		}).
		state('createResolucao', {
			url: '/resolucaos/create',
			templateUrl: 'modules/resolucaos/views/create-resolucao.client.view.html'
		}).
		state('viewResolucao', {
			url: '/resolucaos/:resolucaoId',
			templateUrl: 'modules/resolucaos/views/view-resolucao.client.view.html'
		}).
		state('editResolucao', {
			url: '/resolucaos/:resolucaoId/edit',
			templateUrl: 'modules/resolucaos/views/edit-resolucao.client.view.html'
		});
	}
]);