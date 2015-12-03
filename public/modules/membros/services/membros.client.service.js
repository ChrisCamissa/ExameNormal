'use strict';

angular.module('membros').factory('Membros', ['$resource',
	function($resource) {
		// Membros service logic
		// ...
	  return $resource(
		    'membros/:membroId', 
		     {
			membroId: '@_id'
		     }, 
		     {
			    update: {
				   method: 'PUT'
			          },
			          listar:{
				      	method:'GET',
				      	url:'/membros/listar',
				      	isArray:true

				      }

		      }

		       
		); 

	//getLista:function(){ return $resource('membros/lista');}
		//return $resource('membros/:membroId',{membroId:'@_id'},{update:{method:'PUT'}});


   // var membros=this;
   // membros.lista= $resource('membros/:membroId',{membroId:'@_id'},{update:{method:'PUT'}});	
  // membros.lista= $resource('membros/');

/*    membros.getLista = function () {
    	membros.lista=$resource('membros');
    //     membros.lista= [
				// {_id:'id1',username:'osvaldoM'},
				// {_id:'id1',username:'osvaldoM'},
				// {_id:'id1',username:'osvaldoM'},
			 // ];

    }; */

 //  return membros;
	}
]);