'use strict';

angular.module('membros').controller('MembrosController', ['$scope','$stateParams','$location','Membros',
	function($scope,$stateParams,$location,Membros) {
		// Controller Logic


		 $scope.currentPage = 1;
        $scope.pageSize = 10;
        $scope.offset = 0;

       // Page changed handler
       $scope.pageChanged = function() {
            $scope.offset = ($scope.currentPage - 1) * $scope.pageSize;
       }; 

//logica para criar
		$scope.create=function(){
			//criamos um novo membro
			var memb= new Membros({
				nome:this.nome,
				cargo:this.cargo,
				username:this.username,
				password:this.password
			});
			memb.$save(function(response){
				$scope.membroActual=response._id;
				$location.path('tarefas/create');
				//$location.path('membros/'+response._id);
				$scope.nome='';
				$scope.cargo='';
			}, function(errorResponse){
				$scope.error=errorResponse.data.message;
			});
		};

//Logica para remover		
		$scope.remove=function(membro){
			if(membro){
				membro.$remove();
				for (var i  in $scope.membros) {
				 if($scope.membros[i]===membro){
				 	$scope.membros.splice(i,1);
				 }
				}

				
			}else{
				$scope.membro.$remove(function(){
					$location.path('membros/'+membro._id);
				});
			}
			$location.path('membros');
		};

//logica para update
		$scope.update= function(){
			var $membro=$scope.membro;
			$membro.update(function(){
				$location.path('membros/'+$membro._id);
			},function(errorResponse){
				$scope.error=errorResponse.data.message;
			});
		};



		//Devolver a lista de membros
		$scope.find=function(){
			//$scope.membros=[{'nome':'camilo','cargo':'fiteiro','username':'chemanaG','password':'allooo'},
			//{'nome':'Chris Anne','cargo':'fala fala','username':'chemanaG','password':'chris'}]

			$scope.membros=Membros.query();
		};

		//encontrar um membro
		$scope.findOne= function(){
			$scope.membro=Membros.get({
				membroId:$stateParams.membroId
			});
		};

      // Search for a category
        $scope.membroSearch = function(membro) {
            $location.path('membros/'+membro._id);
        }; 
	}
]);