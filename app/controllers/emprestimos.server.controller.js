'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler=require('./errors.server.controller'),
	Emprestimo=mongoose.model('Emprestimo'),
    _ = require('lodash');

/**
 * Create a Emprestimo
 */
 var countEmp=function(clienteId,cb){

 	Emprestimo.count({'cliente':clienteId}).exec(function(err,nrEmp){
 		if(err){
 			return errorHandler.getErrorMessage(err);
 		}
 		console.log(nrEmp);
 		if(nrEmp>3)
 		return cb(false);
 		else return cb(true);
 	});
 // return true;
 };

exports.create = function(req, res) {
	var emprestimo = new Emprestimo(req.body);
	console.log(emprestimo.cliente);
	//verificar nr de emprestimos
		countEmp(emprestimo.cliente,function(estado){

			if(estado===true){ console.log('entrou');
					emprestimo.save(function(err) {
					if (err) {
						return res.status(400).send({
							message: errorHandler.getErrorMessage(err)
						});
					} else {
						res.jsonp(emprestimo);
					}
				});
			}
			else { console.log('nada');
				return res.status(400).send({message:'nr de emp maior q 3'});}
		}); 

};

/**
 * Show the current Emprestimo
 */
exports.read = function(req, res) {
	Emprestimo.findById(req.params.emprestimoId).populate('actorPrincipal').exec(function(err,emprestimo){
		if(err){
			return res.status(400).send({message:errorHandler.getErrorMessage(err)});
		}
		if(!emprestimo){
			return res.status(404).send({message:'Emprestimo nao encontrado'});
		}
		 
		 res.status(201).json(emprestimo);

	});
};

/**
 * Update a Emprestimo
 */
exports.update = function(req, res) {
	var emprestimo=req.emprestimo;
	emprestimo=_.extend(emprestimo,req.body);
	emprestimo.save(function(err){
		if(err){
			return res.status(400).send({message:errorHandler.getErrorMessage(err)});
		}
		res.status(201).json(emprestimo);
	});
};

/**
 * Delete an Emprestimo
 */
exports.delete = function(req, res) {

	var emprestimo=req.emprestimo;
	emprestimo.remove(function(err){
		if(err){
			return res.status(201).send({message:errorHandler.getErrorMessage(err)});
		}
		if(!emprestimo){
			return res.status(404).send({message:'O emprestimo n foi encontrado'});
		}
		res.status(201).json(emprestimo);
	});
};

/**
 * List of Emprestimos
 */
exports.list = function(req, res) {
	Emprestimo.find().exec(function(err,emprestimos){
		if(err){
			return res.status(201).send({message:errorHandler.getErrorMessage(err)});
		}
		res.json(emprestimos);

	});

};

//marca o estado do emprestimo como devolvido
exports.devolve=function(emprestimoId){
	Emprestimo.findById(emprestimoId).exec(function(err,emp){
		if(err){
			console.log('erro finding loan');
			return;
		}
		else{
			if(!emp){
			console.log('erro finding loan');
			return;
			}
			var emp1=emp.toObject();
			emp1.devolvido=true;
			emp = _.extend(emp ,emp1);

			emp.save(function(err) {
				if (err) {
					console.log('erro ao salvar');
					return; 
					
				} else {
					console.log('sucesso');
				}
			});

		}
	});
};

exports.byData = function(req, res) {
	console.log("data"+req.query.data);
	Emprestimo.find({'dataDev':req.query.data}).populate('actorPrincipal').exec(function(err,emprestimo){
		if(err){
			return res.status(400).send({message:errorHandler.getErrorMessage(err)});
		}
		if(!emprestimo){
			return res.status(404).send({message:'Emprestimo nao encontrado'});
		}
		 
		 res.status(201).json(emprestimo);

	});
};

/*
var countEmp=function(clienteId){

	Emprestimo.count({'cliente':clienteId}).exec(function(err,nrEmp){
		if(err){
			return errorHandler.getErrorMessage(err);
		}
		console.log(nrEmp);
		console.log(clienteId);
		return nrEmp>=3;
	});
// return true;
};
*/