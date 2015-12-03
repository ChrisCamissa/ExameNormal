'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Filme = mongoose.model('Filme'),
	_ = require('lodash');

/**
 * Create a Filme
 */
exports.create = function(req, res) {
	var filme = new Filme(req.body);
	filme.user = req.user;

	filme.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(filme);
		}
	});
};


exports.listar = function(req, res) {

Filme.find().select('id titulo').exec(function (err,filmes) {
	// body...
	if(err){
		return res.status(400).send({message:errorHandler.getErrorMessage(err)});
	}
	else{
		res.jsonp(filmes);
	}
});
};

/**
 * Show the current Filme
 */
exports.read = function(req, res) {
	res.jsonp(req.filme);
};

/**
 * Update a Filme
 */
exports.update = function(req, res) {
	var filme = req.filme ;

	filme = _.extend(filme , req.body);

	filme.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(filme);
		}
	});
};

/**
 * Delete an Filme
 */
exports.delete = function(req, res) {
	var filme = req.filme ;

	filme.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(filme);
		}
	});
};

/**
 * List of Filmes
 */
exports.list = function(req, res) { 
	Filme.find().sort('-created').populate('user', 'displayName').exec(function(err, filmes) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(filmes);
		}
	});
};

/**
 * Filme middleware
 */
exports.filmeByID = function(req, res, next, id) { 
	Filme.findById(id).populate('user', 'displayName').exec(function(err, filme) {
		if (err) return next(err);
		if (! filme) return next(new Error('Failed to load Filme ' + id));
		req.filme = filme ;
		next();
	});
};

/**
 * Filme authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.filme.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
