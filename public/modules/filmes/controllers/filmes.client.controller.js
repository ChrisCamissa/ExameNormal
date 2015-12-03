'use strict';

// Filmes controller
angular.module('filmes').controller('FilmesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Filmes',
	function($scope, $stateParams, $location, Authentication, Filmes) {
		$scope.authentication = Authentication;

		// Create new Filme
		$scope.create = function() {
			// Create new Filme object
			var filme = new Filmes ({
				
 				titulo: this.titulo,
				sinopse: this.sinopse,
				categoria: this.categoria,
				actorPrincipal: this.actorPrincipal,
				actor: this.actor,
				estado: this.estado

			});

			// Redirect after save
			filme.$save(function(response) {
				$location.path('filmes/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Filme
		$scope.remove = function(filme) {
			if ( filme ) { 
				filme.$remove();

				for (var i in $scope.filmes) {
					if ($scope.filmes [i] === filme) {
						$scope.filmes.splice(i, 1);
					}
				}
			} else {
				$scope.filme.$remove(function() {
					$location.path('filmes');
				});
			}
		};

		// Update existing Filme
		$scope.update = function() {
			var filme = $scope.filme;

			filme.$update(function() {
				$location.path('filmes/' + filme._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Filmes
		$scope.find = function() {
			$scope.filmes = Filmes.query();
		};

		// Find existing Filme
		$scope.findOne = function() {
			$scope.filme = Filmes.get({ 
				filmeId: $stateParams.filmeId
			});
		};
	}
]);