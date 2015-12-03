'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Utente = mongoose.model('Utente'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, utente;

/**
 * Utente routes tests
 */
describe('Utente CRUD tests', function() {
	beforeEach(function(done) {
		// Create user credentials
		credentials = {
			username: 'username',
			password: 'password'
		};

		// Create a new user
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: credentials.username,
			password: credentials.password,
			provider: 'local'
		});

		// Save a user to the test db and create new Utente
		user.save(function() {
			utente = {
				name: 'Utente Name'
			};

			done();
		});
	});

	it('should be able to save Utente instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Utente
				agent.post('/utentes')
					.send(utente)
					.expect(200)
					.end(function(utenteSaveErr, utenteSaveRes) {
						// Handle Utente save error
						if (utenteSaveErr) done(utenteSaveErr);

						// Get a list of Utentes
						agent.get('/utentes')
							.end(function(utentesGetErr, utentesGetRes) {
								// Handle Utente save error
								if (utentesGetErr) done(utentesGetErr);

								// Get Utentes list
								var utentes = utentesGetRes.body;

								// Set assertions
								(utentes[0].user._id).should.equal(userId);
								(utentes[0].name).should.match('Utente Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Utente instance if not logged in', function(done) {
		agent.post('/utentes')
			.send(utente)
			.expect(401)
			.end(function(utenteSaveErr, utenteSaveRes) {
				// Call the assertion callback
				done(utenteSaveErr);
			});
	});

	it('should not be able to save Utente instance if no name is provided', function(done) {
		// Invalidate name field
		utente.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Utente
				agent.post('/utentes')
					.send(utente)
					.expect(400)
					.end(function(utenteSaveErr, utenteSaveRes) {
						// Set message assertion
						(utenteSaveRes.body.message).should.match('Please fill Utente name');
						
						// Handle Utente save error
						done(utenteSaveErr);
					});
			});
	});

	it('should be able to update Utente instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Utente
				agent.post('/utentes')
					.send(utente)
					.expect(200)
					.end(function(utenteSaveErr, utenteSaveRes) {
						// Handle Utente save error
						if (utenteSaveErr) done(utenteSaveErr);

						// Update Utente name
						utente.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Utente
						agent.put('/utentes/' + utenteSaveRes.body._id)
							.send(utente)
							.expect(200)
							.end(function(utenteUpdateErr, utenteUpdateRes) {
								// Handle Utente update error
								if (utenteUpdateErr) done(utenteUpdateErr);

								// Set assertions
								(utenteUpdateRes.body._id).should.equal(utenteSaveRes.body._id);
								(utenteUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Utentes if not signed in', function(done) {
		// Create new Utente model instance
		var utenteObj = new Utente(utente);

		// Save the Utente
		utenteObj.save(function() {
			// Request Utentes
			request(app).get('/utentes')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Utente if not signed in', function(done) {
		// Create new Utente model instance
		var utenteObj = new Utente(utente);

		// Save the Utente
		utenteObj.save(function() {
			request(app).get('/utentes/' + utenteObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', utente.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Utente instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Utente
				agent.post('/utentes')
					.send(utente)
					.expect(200)
					.end(function(utenteSaveErr, utenteSaveRes) {
						// Handle Utente save error
						if (utenteSaveErr) done(utenteSaveErr);

						// Delete existing Utente
						agent.delete('/utentes/' + utenteSaveRes.body._id)
							.send(utente)
							.expect(200)
							.end(function(utenteDeleteErr, utenteDeleteRes) {
								// Handle Utente error error
								if (utenteDeleteErr) done(utenteDeleteErr);

								// Set assertions
								(utenteDeleteRes.body._id).should.equal(utenteSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Utente instance if not signed in', function(done) {
		// Set Utente user 
		utente.user = user;

		// Create new Utente model instance
		var utenteObj = new Utente(utente);

		// Save the Utente
		utenteObj.save(function() {
			// Try deleting Utente
			request(app).delete('/utentes/' + utenteObj._id)
			.expect(401)
			.end(function(utenteDeleteErr, utenteDeleteRes) {
				// Set message assertion
				(utenteDeleteRes.body.message).should.match('User is not logged in');

				// Handle Utente error error
				done(utenteDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		Utente.remove().exec();
		done();
	});
});