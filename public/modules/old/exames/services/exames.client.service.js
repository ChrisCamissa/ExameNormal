'use strict';

//Exames service used to communicate Exames REST endpoints
angular.module('exames').factory('Exames', ['$resource',
	function($resource) {
		return $resource('exames/:exameId', { exameId: '@_id'
		}, {
			update: {
				method: 'PUT'
			},


			 listar:{
				      	method:'GET',
				      	url:'/exames/listar',
				      	isArray:true

				      }
		});
	}
]);