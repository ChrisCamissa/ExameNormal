'use strict';

// Tag perguntas controller
angular.module('tag-perguntas').controller('TagPerguntasController', ['$scope', '$stateParams', '$location', 'Authentication', 'TagPerguntas',
	function($scope, $stateParams, $location, Authentication, TagPerguntas) {
		$scope.authentication = Authentication;

		// Create new Tag pergunta
		$scope.create = function() {
			// Create new Tag pergunta object
			var tagPergunta = new TagPerguntas ({
				name: this.name
			});

			// Redirect after save
			tagPergunta.$save(function(response) {
				$location.path('tag-perguntas/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Tag pergunta
		$scope.remove = function(tagPergunta) {
			if ( tagPergunta ) { 
				tagPergunta.$remove();

				for (var i in $scope.tagPerguntas) {
					if ($scope.tagPerguntas [i] === tagPergunta) {
						$scope.tagPerguntas.splice(i, 1);
					}
				}
			} else {
				$scope.tagPergunta.$remove(function() {
					$location.path('tag-perguntas');
				});
			}
		};

		// Update existing Tag pergunta
		$scope.update = function() {
			var tagPergunta = $scope.tagPergunta;

			tagPergunta.$update(function() {
				$location.path('tag-perguntas/' + tagPergunta._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Tag perguntas
		$scope.find = function() {
			$scope.tagPerguntas = TagPerguntas.query();
		};

		// Find existing Tag pergunta
		$scope.findOne = function() {
			$scope.tagPergunta = TagPerguntas.get({ 
				tagPerguntaId: $stateParams.tagPerguntaId
			});
		};
	}
]);