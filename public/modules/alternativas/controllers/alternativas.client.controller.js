'use strict';

// Alternativas controller
angular.module('alternativas').controller('AlternativasController', ['$scope', '$stateParams', '$location', 'Authentication', 'Alternativas','Perguntas',
	function($scope, $stateParams, $location, Authentication, Alternativas, Perguntas) {
		$scope.authentication = Authentication;

		// Create new Alternativa
		$scope.create = function() {
			// Create new Alternativa object
			var alternativa = new Alternativas ({
				conteudo: this.conteudo,
				isCorrecte: this.isCorrecte,
				letra: this.letra,
				imagem: this.imagem,
				pergunta: this.pergunta._id
				//pergunta: 'primeiro nome?'

			});

			// Redirect after save
			alternativa.$save(function(response) {
				

				// Clear form fields
				$scope.conteudo = '';
				$scope.isCorrecte = '';
				$scope.letra = '';
				$scope.imagem = '';

				$location.path('alternativas/create');
				
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Alternativa
		$scope.remove = function(alternativa) {
			if ( alternativa ) { 
				alternativa.$remove();

				for (var i in $scope.alternativas) {
					if ($scope.alternativas [i] === alternativa) {
						$scope.alternativas.splice(i, 1);
					}
				}
			} else {
				$scope.alternativa.$remove(function() {
					$location.path('alternativas');
				});
			}
		};


            $scope.listPerguntas=function(){
			$scope.perguntas=Perguntas.listar();

			$scope.perguntas2 = Perguntas.byExame({ 
				perguntaId: '562679b05cea858510e475e5'
			});
			};

		// Update existing Alternativa
		$scope.update = function() {
			var alternativa = $scope.alternativa;

			alternativa.$update(function() {
				$location.path('alternativas/' + alternativa._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Alternativas
		$scope.find = function() {
			$scope.alternativas = Alternativas.query();
		};

		// Find existing Alternativa
		$scope.findOne = function() {
			$scope.alternativa = Alternativas.get({ 
				alternativaId: $stateParams.alternativaId
			});
		};

		$scope.direct= function(){
			$location.path('alternativas/create');
		};
	}
]);