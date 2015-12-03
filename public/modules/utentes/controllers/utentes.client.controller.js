'use strict';

// Utentes controller
angular.module('utentes').controller('UtentesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Utentes',
	function($scope, $stateParams, $location, Authentication, Utentes) {
		$scope.authentication = Authentication;

		// Create new Utente
		$scope.create = function() {
			// Create new Utente object
			var utente = new Utentes ({
				name: this.name,
				idade: this.idade,
				sexo: this.sexo,
				distrito: this.distrito,
				bairro: this.bairro,
				bi: this.bi

			});

			// Redirect after save
			utente.$save(function(response) {
				$location.path('utentes/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Utente
		$scope.remove = function(utente) {
			if ( utente ) { 
				utente.$remove();

				for (var i in $scope.utentes) {
					if ($scope.utentes [i] === utente) {
						$scope.utentes.splice(i, 1);
					}
				}
			} else {
				$scope.utente.$remove(function() {
					$location.path('utentes');
				});
			}
		};

		// Update existing Utente
		$scope.update = function() {
			var utente = $scope.utente;

			utente.$update(function() {
				$location.path('utentes/' + utente._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Utentes
		$scope.find = function() {
			$scope.utentes = Utentes.query();
		};

		// Find existing Utente
		$scope.findOne = function() {
			$scope.utente = Utentes.get({ 
				utenteId: $stateParams.utenteId
			});
		};
	}
]);