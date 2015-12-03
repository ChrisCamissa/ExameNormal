'use strict';

//Ajudas service used to communicate Ajudas REST endpoints
angular.module('ajudas').factory('Ajudas', ['$resource',
	function($resource) {
		return $resource('ajudas/:ajudaId', { ajudaId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);