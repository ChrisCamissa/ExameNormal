'use strict';

//Alternativas service used to communicate Alternativas REST endpoints
angular.module('alternativas').factory('Alternativas', ['$resource',
	function($resource) {
		return $resource('alternativas/:alternativaId', { alternativaId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);