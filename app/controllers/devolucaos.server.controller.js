'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler=require('./errors.server.controller'),
	Devolucao=mongoose.model('Devolucao'),
	Emprestimo=require('./emprestimos.server.controller'),
    _ = require('lodash');

/**
 * Create a Devolucao
 */
exports.create = function(req, res) {
	var devolucao = new Devolucao(req.body);

		devolucao.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(devolucao);
			Emprestimo.devolve(devolucao.emprestimo);
		}
	});
};

/**
 * Show the current Devolucao
 */
exports.read = function(req, res) {
	Devolucao.findById(req.params.devolucaoId).populate('actorPrincipal').exec(function(err,devolucao){
		if(err){
			return res.status(400).send({message:errorHandler.getErrorMessage(err)});
		}
		if(!devolucao){
			return res.status(404).send({message:'Devolucao nao encontrado'});
		}
		 
		 res.status(201).json(devolucao);

	});
};

/**
 * Update a Devolucao
 */
exports.update = function(req, res) {
	var devolucao=req.devolucao;
	devolucao=_.extend(devolucao,req.body);
	devolucao.save(function(err){
		if(err){
			return res.status(400).send({message:errorHandler.getErrorMessage(err)});
		}
		res.status(201).json(devolucao);
	});
};

/**
 * Delete an Devolucao
 */
exports.delete = function(req, res) {

	var devolucao=req.devolucao;
	devolucao.remove(function(err){
		if(err){
			return res.status(201).send({message:errorHandler.getErrorMessage(err)});
		}
		if(!devolucao){
			return res.status(404).send({message:'O devolucao n foi encontrado'});
		}
		res.status(201).json(devolucao);
	});
};

/**
 * List of Devolucaos
 */
exports.list = function(req, res) {
	Devolucao.find().exec(function(err,devolucaos){
		if(err){
			return res.status(201).send({message:errorHandler.getErrorMessage(err)});
		}
		res.json(devolucaos);

	});

};