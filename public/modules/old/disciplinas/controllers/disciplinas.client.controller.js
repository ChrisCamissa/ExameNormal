'use strict';

// Disciplinas controller
angular.module('disciplinas').controller('DisciplinasController', ['$scope', '$stateParams', '$location', 'Authentication', 'Disciplinas',
	function($scope, $stateParams, $location, Authentication, Disciplinas) {
		$scope.authentication = Authentication;

		// Create new Disciplina
		$scope.create = function() {
			// Create new Disciplina object
			var disciplina = new Disciplinas ({
				name: this.name,
				plano: this.plano
			});

			// Redirect after save
			disciplina.$save(function(response) {
				

				// Clear form fields
				$scope.name = '';
				$scope.plano='';

				$location.path('disciplinas/' + response._id);
				
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Disciplina
		$scope.remove = function(disciplina) {
			if ( disciplina ) { 
				disciplina.$remove();

				for (var i in $scope.disciplinas) {
					if ($scope.disciplinas [i] === disciplina) {
						$scope.disciplinas.splice(i, 1);
					}
				}
			} else {
				$scope.disciplina.$remove(function() {
					$location.path('disciplinas');
				});
			}
		};

		// Update existing Disciplina
		$scope.update = function() {
			var disciplina = $scope.disciplina;

			disciplina.$update(function() {
				$location.path('disciplinas/' + disciplina._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Disciplinas
		$scope.find = function() {
			$scope.disciplinas = Disciplinas.query();
		};

		// Find existing Disciplina
		$scope.findOne = function() {
			$scope.disciplina = Disciplinas.get({ 
				disciplinaId: $stateParams.disciplinaId
			});
		};

		//direct to create
		$scope.direct= function(){
			$location.path('disciplinas/create');
		};
	}
]);