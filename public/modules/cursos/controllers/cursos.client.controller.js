'use strict';

// Cursos controller
angular.module('cursos').controller('CursosController', ['$scope', '$stateParams', '$location', 'Authentication', 'Cursos',
	function($scope, $stateParams, $location, Authentication, Cursos) {
		$scope.authentication = Authentication;

		// Create new Curso
		$scope.create = function() {
			// Create new Curso object
			var curso = new Cursos ({
				designacao: this.designacao
			});

			// Redirect after save
			curso.$save(function(response) {
				

				// Clear form fields
				$scope.designacao = '';

				$location.path('cursos/create');
			
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Curso
		$scope.remove = function(curso) {
			if ( curso ) { 
				curso.$remove();

				for (var i in $scope.cursos) {
					if ($scope.cursos [i] === curso) {
						$scope.cursos.splice(i, 1);
					}
				}
			} else {
				$scope.curso.$remove(function() {
					$location.path('cursos');
				});
			}
		};

		// Update existing Curso
		$scope.update = function() {
			var curso = $scope.curso;

			curso.$update(function() {
				$location.path('cursos/' + curso._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Cursos
		$scope.find = function() {
			$scope.cursos = Cursos.query();
		};

		// Find existing Curso
		$scope.findOne = function() {
			$scope.curso = Cursos.get({ 
				cursoId: $stateParams.cursoId
			});
		};
	}
]);