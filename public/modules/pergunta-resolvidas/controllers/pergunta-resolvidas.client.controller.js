'use strict';

// Pergunta resolvidas controller
angular.module('pergunta-resolvidas').controller('PerguntaResolvidasController', ['$scope', '$stateParams', '$location', 'Authentication', 'PerguntaResolvidas','Resolucaos',
	function($scope, $stateParams, $location, Authentication, PerguntaResolvidas,Resolucaos) {
		$scope.authentication = Authentication;

		// Create new Pergunta resolvida
		$scope.create = function() {
			// Create new Pergunta resolvida object
			var perguntaResolvida = new PerguntaResolvidas ({
				estado: this.estado,
				resolucao: this.resolucao._id
			});

			// Redirect after save
			perguntaResolvida.$save(function(response) {
				$location.path('pergunta-resolvidas/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

          $scope.listResolucao=function(){
			$scope.resolucaos=Resolucaos.listar();
			};
		// Remove existing Pergunta resolvida
		$scope.remove = function(perguntaResolvida) {
			if ( perguntaResolvida ) { 
				perguntaResolvida.$remove();

				for (var i in $scope.perguntaResolvidas) {
					if ($scope.perguntaResolvidas [i] === perguntaResolvida) {
						$scope.perguntaResolvidas.splice(i, 1);
					}
				}
			} else {
				$scope.perguntaResolvida.$remove(function() {
					$location.path('pergunta-resolvidas');
				});
			}
		};

		// Update existing Pergunta resolvida
		$scope.update = function() {
			var perguntaResolvida = $scope.perguntaResolvida;

			perguntaResolvida.$update(function() {
				$location.path('pergunta-resolvidas/' + perguntaResolvida._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Pergunta resolvidas
		$scope.find = function() {
			$scope.perguntaResolvidas = PerguntaResolvidas.query();
		};

		// Find existing Pergunta resolvida
		$scope.findOne = function() {
			$scope.perguntaResolvida = PerguntaResolvidas.get({ 
				perguntaResolvidaId: $stateParams.perguntaResolvidaId
			});
		};
	}
]);