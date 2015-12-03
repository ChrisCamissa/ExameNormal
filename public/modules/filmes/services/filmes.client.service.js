'use strict';

//Filmes service used to communicate Filmes REST endpoints
angular.module('filmes').factory('Filmes', ['$resource',
	function($resource) {
		return $resource('filmes/:filmeId', { filmeId: '@_id'
		}, {
			update: {
				method: 'PUT'
			},

			listar:{
				method : 'GET',
				url : 'filmes/listar',
				isArray : true
			}
		});
	}
]);