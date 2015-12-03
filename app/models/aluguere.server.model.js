'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Aluguere Schema
 */
/*var AluguereSchema = new Schema({
	_utente: [{
	type: Schema.ObjectId,
		ref: 'Utente'
	}],
	
	_filmes: [{
		type: Schema.ObjectId,
		ref: 'Filme'
	}],*/

	descricaoNatureza: {
		type: String,
		default: '',
		required: 'Please fill Natureza descricaoNatureza',
		trim: true
	},
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Aluguere', AluguereSchema);