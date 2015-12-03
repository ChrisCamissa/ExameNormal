'use strict';

//Curso disciplinas service used to communicate Curso disciplinas REST endpoints
angular.module('curso-disciplinas').factory('CursoDisciplinas', ['$resource',
	function($resource) {
		return $resource('curso-disciplinas/:cursoDisciplinaId', { cursoDisciplinaId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);