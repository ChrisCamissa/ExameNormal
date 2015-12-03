'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Utente Schema
 */
var UtenteSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Participante name',
		trim: true
	},
	apelido: {
		type: Number,
		default: '',
		required: 'Please fill Participante apelido',
		trim: true
	},
	gAcademico: {
		type: String,
		default: '',
		required: 'Please fill Participante gAcademico',
		trim: true
	},
	empresa: {
		type: String,
		default: '',
		required: 'Please fill Participante empresa',
		trim: true
	},
	dataNascimento: {
		type: String,
		default: '',
		required: 'Please fill Participante dataNascimento',
		trim: true
	},
	sexo: {
		type: String,
		default: '',
		required: 'Please fill Participante sexo',
		trim: true
	},
	telefone: {
		type: String,
		default: '',
		required: 'Please fill Participante telefone',
		trim: true
	},
	email: {
		type: String,
		default: '',
		required: 'Please fill Participante email',
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

mongoose.model('Utente', UtenteSchema);