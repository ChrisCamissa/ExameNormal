'use strict';

//Alugueres service used to communicate Alugueres REST endpoints
angular.module('alugueres').factory('Alugueres', ['$resource',
	function($resource) {
		return $resource('alugueres/:aluguereId', { aluguereId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);