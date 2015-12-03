'use strict';

//Utentes service used to communicate Utentes REST endpoints
angular.module('utentes').factory('Utentes', ['$resource',
	function($resource) {
		return $resource('utentes/:utenteId', { utenteId: '@_id'
		}, {
			update: {
				method: 'PUT'
			},

			listar:{
				method : 'GET',
				url : 'utentes/listar',
				isArray : true
			}
		});
	}
]);