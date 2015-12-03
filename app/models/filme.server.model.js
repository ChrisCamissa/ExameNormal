'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Filme Schema
 */
var FilmeSchema = new Schema({
	
	titulo: {
		type: String,
		default: '',
		required: 'Please fill Evento titulo',
		trim: true
	},
	tipo: {
		type: String,
		default: '',
		required: 'Please fill Evento tipo',
		trim: true
	},

	descricao: {
		type: String,
		default: '',
		required: 'Please fill Evento descricao',
		trim: true
	},

	local: {
		type: String,
		default: '',
		required: 'Please fill Evento local',
		trim: true
	},

	programa: {
		type: String,
		default: '',
		required: 'Please fill Evento programa',
		trim: true
	},
	orador: {
		type: String,
		default: '',
		required: 'Please fill Evento orador',
		trim: true
	},
	palestrante: {
		type: String,
		default: '',
		required: 'Please fill Evento palestrante',
		trim: true
	},
	convidado: {
		type: String,
		default: '',
		required: 'Please fill Evento convidado',
		trim: true
	}
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Filme', FilmeSchema);