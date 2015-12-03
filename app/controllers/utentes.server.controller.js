'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Utente = mongoose.model('Utente'),
	_ = require('lodash');

/**
 * Create a Utente
 */
exports.create = function(req, res) {
	var utente = new Utente(req.body);
	utente.user = req.user;

	utente.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(utente);
		}
	});
};


exports.listar = function(req, res) {

Utente.find().select('id name').exec(function (err,utentes) {
	// body...
	if(err){
		return res.status(400).send({message:errorHandler.getErrorMessage(err)});
	}
	else{
		res.jsonp(utentes);
	}
});
};

/**
 * Show the current Utente
 */
exports.read = function(req, res) {
	res.jsonp(req.utente);
};

/**
 * Update a Utente
 */
exports.update = function(req, res) {
	var utente = req.utente ;

	utente = _.extend(utente , req.body);

	utente.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(utente);
		}
	});
};

/**
 * Delete an Utente
 */
exports.delete = function(req, res) {
	var utente = req.utente ;

	utente.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(utente);
		}
	});
};

/**
 * List of Utentes
 */
exports.list = function(req, res) { 
	Utente.find().sort('-created').populate('user', 'displayName').exec(function(err, utentes) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(utentes);
		}
	});
};

/**
 * Utente middleware
 */
exports.utenteByID = function(req, res, next, id) { 
	Utente.findById(id).populate('user', 'displayName').exec(function(err, utente) {
		if (err) return next(err);
		if (! utente) return next(new Error('Failed to load Utente ' + id));
		req.utente = utente ;
		next();
	});
};

/**
 * Utente authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.utente.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
