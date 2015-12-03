'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Filme = mongoose.model('Filme');

/**
 * Globals
 */
var user, filme;

/**
 * Unit tests
 */
describe('Filme Model Unit Tests:', function() {
	beforeEach(function(done) {
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: 'username',
			password: 'password'
		});

		user.save(function() { 
			filme = new Filme({
				titulo: 'Filme titulo',
				sinopse: 'Filme sinopse',
				categoria: 'Filme categoria',
				actorPrincipal: 'Filme actorPrincipal',
				actor: 'Filme actor',
				estado: 'Filme estado',
				titulo: 'Filme titulo',
				user: user
			});

			done();
		});
	});

	describe('Method Save', function() {
		it('should be able to save without problems', function(done) {
			return filme.save(function(err) {
				should.not.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without name', function(done) { 
			filme.name = '';

			return filme.save(function(err) {
				should.exist(err);
				done();
			});
		});
	});

	afterEach(function(done) { 
		Filme.remove().exec();
		User.remove().exec();

		done();
	});
});