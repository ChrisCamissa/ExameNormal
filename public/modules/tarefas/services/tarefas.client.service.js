'use strict';

angular.module('tarefas').factory('Tarefas', ['$resource',
	function($resource) {
		// Membros service logic
		// ...

		// Public API

	return $resource('tarefas/:tarefaId', {
			tarefaId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
		//return $resource('membros/:membroId',{membroId:'@_id'},{update:{method:'PUT'}});
	}
]);