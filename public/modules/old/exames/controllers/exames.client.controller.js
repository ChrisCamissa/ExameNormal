'use strict';

// Exames controller
angular.module('exames').controller('ExamesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Exames','Disciplinas','Perguntas',
	function($scope, $stateParams, $location, Authentication, Exames, Disciplinas,Perguntas) {
		$scope.authentication = Authentication;

		//colocar tempo padrao
		$scope.tempo=120;

		// Create new Exame
		$scope.create = function() {
			// Create new Exame object
			var exame = new Exames ({
				ano: this.ano,
				instruccoes:this.instruccoes,
				tempo:this.tempo,
				disciplina:this.disciplina._id
			});

			// Redirect after save
			exame.$save(function(response) {
				

				// Clear form fields
				$scope.ano = '';
				$scope.instruccoes='';
				$scope.disciplina='-- Escolher disciplina --';

				$location.path('exames/create');
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Exame
		$scope.remove = function(exame) {
			if ( exame ) { 
				exame.$remove();

				for (var i in $scope.exames) {
					if ($scope.exames [i] === exame) {
						$scope.exames.splice(i, 1);
					}
				}
			} else {
				$scope.exame.$remove(function() {
					$location.path('exames');
				});
			}
		};


		$scope.listaDisciplinas=function(){
			$scope.disciplinas=Disciplinas.listar();
			};

		// Update existing Exame
		$scope.update = function() {
			var exame = $scope.exame;

			exame.$update(function() {
				$location.path('exames/' + exame._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Exames
		$scope.find = function() {
			$scope.exames = Exames.query();
		};

		// Find existing Exame
		$scope.findOne = function() {
			$scope.exame = Exames.get({ 
				exameId: $stateParams.exameId
			});
		// console.log('id da pergunta '+$scope.exame._id);
		// $scope.exame.perguntas=Perguntas.byExame({
		// 	//console.log('id pergunta '+$scope.exame._id);
		// 	perguntaId:'562679b05cea858510e475e5'
		// });
		    // $scope.exame.perguntas=Perguntas.query();
		};

			//inicio da resolucao do exame

		$scope.perguntasResolvidas=[{}];
		$scope.addResolvida= function(Pergunta,alternativa){
			resolvida={};
		};


		//clear fields
		$scope.limpaCampos=function(){
			$scope.instruccoes='';
			$scope.disciplina='';
			disciplina:'-- Escolher disciplina --';
		};

		//Year Picker action
		$scope.today = function() {
		  $scope.dt = new Date();
		};
		$scope.today();

		$scope.clear = function () {
		  $scope.dt = null;
		};

		// Disable weekend selection
		$scope.disabled = function(date, mode) {
		  return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
		};

		$scope.toggleMin = function() {
		  $scope.minDate = $scope.minDate ? null : new Date();
		};
		//$scope.toggleMin();

		$scope.open = function($event) {
		  $event.preventDefault();
		  $event.stopPropagation();

		  $scope.opened = true;
		};



		$scope.initDate = new Date();
		$scope.formats = ['yyyy','dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
		$scope.format = $scope.formats[0];

		$scope.datepickerOptions = {
		  datepickerMode:"'year'",
		  minMode:"'year'",
		  minDate:"minDate",
		  showWeeks:"false",
		  clearText:"limpar",
		  currentText:"hoje",
		  closeText:"fechar"
		};


		//direct to create
		$scope.direct= function(){
			$location.path('exames/create');
		};
	}
]);