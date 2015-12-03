'use strict';

//Tag perguntas service used to communicate Tag perguntas REST endpoints
angular.module('tag-perguntas').factory('TagPerguntas', ['$resource',
	function($resource) {
		return $resource('tag-perguntas/:tagPerguntaId', { tagPerguntaId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);