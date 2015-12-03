'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Devolucao Schema
 */
var DevolucaoSchema = new Schema({
	// Devolucao model fields   
	// ...
	emprestimo:{
		type:Schema.ObjectId,
		ref:'Emprestimo',
		required:'associar a um loan'
	},
	data:{
		type:Date,
		default:Date.now
	}
});

mongoose.model('Devolucao', DevolucaoSchema);