'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Aluguere = mongoose.model('Aluguere'),
	_ = require('lodash');

/**
 * Create a Aluguere
 */
exports.create = function(req, res) {
	var aluguere = new Aluguere(req.body);
	aluguere.user = req.user;

	aluguere.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(aluguere);
		}
	});
};

/**
 * Show the current Aluguere
 */
exports.read = function(req, res) {
	res.jsonp(req.aluguere);
};

/**
 * Update a Aluguere
 */
exports.update = function(req, res) {
	var aluguere = req.aluguere ;

	aluguere = _.extend(aluguere , req.body);

	aluguere.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(aluguere);
		}
	});
};

/**
 * Delete an Aluguere
 */
exports.delete = function(req, res) {
	var aluguere = req.aluguere ;

	aluguere.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(aluguere);
		}
	});
};

/**
 * List of Alugueres
 */
exports.list = function(req, res) { 
	Aluguere.find().sort('-created').populate('user', 'displayName').exec(function(err, alugueres) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(alugueres);
		}
	});
};

/**
 * Aluguere middleware
 */
exports.aluguereByID = function(req, res, next, id) { 
	Aluguere.findById(id).populate('user', 'displayName').exec(function(err, aluguere) {
		if (err) return next(err);
		if (! aluguere) return next(new Error('Failed to load Aluguere ' + id));
		req.aluguere = aluguere ;
		next();
	});
};

/**
 * Aluguere authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.aluguere.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
