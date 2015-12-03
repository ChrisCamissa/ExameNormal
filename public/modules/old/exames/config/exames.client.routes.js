'use strict';

//Setting up route
angular.module('exames').config(['$stateProvider',
	function($stateProvider) {
		// Exames state routing
		$stateProvider.
		state('listExames', {
			url: '/exames',
			templateUrl: 'modules/exames/views/list-exames.client.view.html',
			//css: 'css/badge.css'
		}).
		state('createExame', {
			url: '/exames/create',
			templateUrl: 'modules/exames/views/create-exame.client.view.html'
		}).
		state('viewExame', {
			url: '/exames/:exameId',
			templateUrl: 'modules/exames/views/view-exame.client.view.html'
		}).
		state('editExame', {
			url: '/exames/edit/:exameId',
			templateUrl: 'modules/exames/views/edit-exame.client.view.html'
		});
	}
]);