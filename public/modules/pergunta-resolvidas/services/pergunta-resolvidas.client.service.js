'use strict';

//Pergunta resolvidas service used to communicate Pergunta resolvidas REST endpoints
angular.module('pergunta-resolvidas').factory('PerguntaResolvidas', ['$resource',
	function($resource) {
		return $resource('pergunta-resolvidas/:perguntaResolvidaId', { perguntaResolvidaId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);