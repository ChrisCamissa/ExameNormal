'use strict';

//Setting up route
angular.module('utentes').config(['$stateProvider',
	function($stateProvider) {
		// Utentes state routing
		$stateProvider.
		state('listUtentes', {
			url: '/utentes',
			templateUrl: 'modules/utentes/views/list-utentes.client.view.html'
		}).
		state('createUtente', {
			url: '/utentes/create',
			templateUrl: 'modules/utentes/views/create-utente.client.view.html'
		}).
		state('viewUtente', {
			url: '/utentes/:utenteId',
			templateUrl: 'modules/utentes/views/view-utente.client.view.html'
		}).
		state('editUtente', {
			url: '/utentes/:utenteId/edit',
			templateUrl: 'modules/utentes/views/edit-utente.client.view.html'
		});
	}
]);