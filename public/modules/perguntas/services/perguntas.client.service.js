'use strict';

//Perguntas service used to communicate Perguntas REST endpoints
angular.module('perguntas').factory('Perguntas', ['$resource',
	function($resource) {
		return $resource('perguntas/:perguntaId', 
			{ perguntaId: '@_id' }, 
		           
		   {
			update: {
				method: 'PUT'
			},


			 listar:{
				      	method:'GET',
				      	url:'/perguntas/listar',
				      	isArray:true

				      }
		});
	}
]);