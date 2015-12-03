'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Utente = mongoose.model('Utente');

/**
 * Globals
 */
var user, utente;

/**
 * Unit tests
 */
describe('Utente Model Unit Tests:', function() {
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
			utente = new Utente({
				name: 'Utente Name',
				idade: 'Utente idade',
				sexo: 'Utente sexo',
				bairro: 'Utente bairro',
				distrito: 'Utente distrito',
				bi: 'Utente bi',
				user: user
			});

			done();
		});
	});

	describe('Method Save', function() {
		it('should be able to save without problems', function(done) {
			return utente.save(function(err) {
				should.not.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without name', function(done) { 
			utente.name = '';

			return utente.save(function(err) {
				should.exist(err);
				done();
			});
		});
	});

	afterEach(function(done) { 
		Utente.remove().exec();
		User.remove().exec();

		done();
	});
});