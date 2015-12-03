'use strict';

//Setting up route
angular.module('membros').config(['$stateProvider',
	function($stateProvider) {
		// Membros state routing
		$stateProvider.
		state('create-membros', {
			url: '/membros/create',
			templateUrl: 'modules/membros/views/create-membros.client.view.html'
		}).
		state('membros', {
			url: '/membros',
			templateUrl: 'modules/membros/views/membros.client.view.html'
		}).
		state('edit',{
			url:'/membros/:membroId/edit',
			templateUrl:'modules/membros/views/edit-membro.client.view.html'
		}).
		state('delete',{
			url:'/membros/delete',
			templateUrl:'modules/membros/views/delete-membro.client.view.html'
		}).
		state('view',{
			url:'/membros/:membroId',
			templateUrl:'modules/membros/views/view-membro.client.view.html'
		});
	}
]);