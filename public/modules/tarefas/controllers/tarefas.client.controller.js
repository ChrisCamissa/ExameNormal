'use strict';

angular.module('tarefas').controller('TarefasController', ['$scope','$stateParams','$location','Tarefas','Membros',
	function($scope,$stateParams,$location,Tarefas,Membros) {
		// Controller Logic
		// ...

		//Criar categoria
		$scope.create= function(){
			
			//Criamos a tarefa
			var tarefa = new  Tarefas({
				titulo:this.titulo,
				descriccao:this.descriccao,
				prazo:this.prazo,
				membro:this.membro._id
			});

			tarefa.$save(function(response){
				//redireccionamos para a pag. tarefas
				$location.path('tarefas');
			},function(errorResponse){
				$location.path('tarefas');
				$scope.error=errorResponse.data.message;
			});

		};

		$scope.delete= function(tarefa){
			if(tarefa){
				tarefa.$remove();
				
				for(var i in $scope.tarefas){
					if($scope.tarefas[i]===tarefa)
						$scope.tarefas.splice(i,1);
				}

			} else{
				$scope.tarefa.$remove(function(){
					$location.path('tarefas');
				});
			} 
		};

		$scope.update= function(){
			var tarefa = $scope.tarefa;
			tarefa.$update(function(response){
				$location.path('tarefas');
			},function(errorResponse){
				$scope.error=errorResponse.data.message;
			});
		};

		$scope.find= function(){
			//$scope.tarefas=[{titulo:'meu titulo',descriccao:'uma tarefa'},{titulo:'meu titulo',descriccao:'uma tarefa'},{titulo:'meu titulo',descriccao:'uma tarefa'}];
			$scope.tarefas=Tarefas.query();

		};

		$scope.findOne= function(){
			var tarefa=Tarefas.get({
				tarefaId:$stateParams.tarefaId
			});
			//var d = new Date();
			//tarefa.falta=$scope.diferenca(tarefa.prazo);
			$scope.tarefa= tarefa;
		};

		$scope.tarefaSearch=function(item){
			$location.path('tarefas/'+item._id);
		};

		$scope.listaMembros=function(){
			$scope.membros=Membros.listar();
			//console.log(Membros.listar());
	/*	$scope.membros=	[
				{id:'id1',nome:'osvaldoM'},
				{id:'id1',nome:'osvaldo M'},
				{id:'id1',nome:'osvaldoM'},
			 ]; */
			 //$scope.membros=$listas;
		};

		$scope.open = function($event) {
		  $scope.status.opened = true;
		};


    $scope.sort = function(keyname){
        $scope.sortKey = keyname;   //set the sortKey to the param passed
        $scope.reverse = !$scope.reverse; //if true make it false and vice versa
    };


     $scope.diferenca = function(prazo) {
     		
         var data= prazo.split('/'),
         	 dt1 = data.split('/'),
             dt2 = prazo.split('/'),
             one = new Date(dt1[2], dt1[1]-1, dt1[0]),
             two = new Date(dt2[2], dt2[1]-1, dt2[0]);

         var millisecondsPerDay = 1000 * 60 * 60 * 24;
         var millisBetween = two.getTime() - one.getTime();
         var days = millisBetween / millisecondsPerDay;

         return Math.floor(days);      
     };

	}
]);