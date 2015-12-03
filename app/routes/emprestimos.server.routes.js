'use strict';

module.exports = function(app) {
	// Routing logic   
	// ...

	var emprestimos=require('../../app/controllers/emprestimos.server.controller');


	//for dates
	// app.route('/emprestimos/:data?')
	// 	.get(emprestimos.data);



	//Every request without a parameter
	app.route('/emprestimos')
		.get(emprestimos.list)
		.post(emprestimos.create);


	app.route('/emprestimos/:data?')
		.get(emprestimos.byData);

		/**
		*every request with a emprestimoId parameter
		*/ 
	app.route('/emprestimos/:emprestimoId')
		.get(emprestimos.read)
		.put(emprestimos.update)
		.delete(emprestimos.delete);

};