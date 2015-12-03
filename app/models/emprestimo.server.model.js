'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;


	// function validaNrEmprestimos (v) {
	//   // a custom validation function for checking string length to be used by the model
	  
	//   return v.length <= 15;
	// }

/**
 * Emprestimo Schema
 */
var EmprestimoSchema = new Schema({
	// Emprestimo model fields   
	// ...
	cliente:{
		type:Schema.ObjectId,
		ref:'User'
	},
	filme:{
		type:Schema.ObjectId,
		ref:'Filme'
	},
	dataDev:{
		type:Date,
		default:Date.now
	},
	devolvido:{
		type:Boolean,
		default:false
	}
});

mongoose.model('Emprestimo', EmprestimoSchema);