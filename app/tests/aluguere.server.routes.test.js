'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Aluguere = mongoose.model('Aluguere'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, aluguere;

/**
 * Aluguere routes tests
 */
describe('Aluguere CRUD tests', function() {
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

		// Save a user to the test db and create new Aluguere
		user.save(function() {
			aluguere = {
				name: 'Aluguere Name'
			};

			done();
		});
	});

	it('should be able to save Aluguere instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Aluguere
				agent.post('/alugueres')
					.send(aluguere)
					.expect(200)
					.end(function(aluguereSaveErr, aluguereSaveRes) {
						// Handle Aluguere save error
						if (aluguereSaveErr) done(aluguereSaveErr);

						// Get a list of Alugueres
						agent.get('/alugueres')
							.end(function(alugueresGetErr, alugueresGetRes) {
								// Handle Aluguere save error
								if (alugueresGetErr) done(alugueresGetErr);

								// Get Alugueres list
								var alugueres = alugueresGetRes.body;

								// Set assertions
								(alugueres[0].user._id).should.equal(userId);
								(alugueres[0].name).should.match('Aluguere Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Aluguere instance if not logged in', function(done) {
		agent.post('/alugueres')
			.send(aluguere)
			.expect(401)
			.end(function(aluguereSaveErr, aluguereSaveRes) {
				// Call the assertion callback
				done(aluguereSaveErr);
			});
	});

	it('should not be able to save Aluguere instance if no name is provided', function(done) {
		// Invalidate name field
		aluguere.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Aluguere
				agent.post('/alugueres')
					.send(aluguere)
					.expect(400)
					.end(function(aluguereSaveErr, aluguereSaveRes) {
						// Set message assertion
						(aluguereSaveRes.body.message).should.match('Please fill Aluguere name');
						
						// Handle Aluguere save error
						done(aluguereSaveErr);
					});
			});
	});

	it('should be able to update Aluguere instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Aluguere
				agent.post('/alugueres')
					.send(aluguere)
					.expect(200)
					.end(function(aluguereSaveErr, aluguereSaveRes) {
						// Handle Aluguere save error
						if (aluguereSaveErr) done(aluguereSaveErr);

						// Update Aluguere name
						aluguere.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Aluguere
						agent.put('/alugueres/' + aluguereSaveRes.body._id)
							.send(aluguere)
							.expect(200)
							.end(function(aluguereUpdateErr, aluguereUpdateRes) {
								// Handle Aluguere update error
								if (aluguereUpdateErr) done(aluguereUpdateErr);

								// Set assertions
								(aluguereUpdateRes.body._id).should.equal(aluguereSaveRes.body._id);
								(aluguereUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Alugueres if not signed in', function(done) {
		// Create new Aluguere model instance
		var aluguereObj = new Aluguere(aluguere);

		// Save the Aluguere
		aluguereObj.save(function() {
			// Request Alugueres
			request(app).get('/alugueres')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Aluguere if not signed in', function(done) {
		// Create new Aluguere model instance
		var aluguereObj = new Aluguere(aluguere);

		// Save the Aluguere
		aluguereObj.save(function() {
			request(app).get('/alugueres/' + aluguereObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', aluguere.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Aluguere instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Aluguere
				agent.post('/alugueres')
					.send(aluguere)
					.expect(200)
					.end(function(aluguereSaveErr, aluguereSaveRes) {
						// Handle Aluguere save error
						if (aluguereSaveErr) done(aluguereSaveErr);

						// Delete existing Aluguere
						agent.delete('/alugueres/' + aluguereSaveRes.body._id)
							.send(aluguere)
							.expect(200)
							.end(function(aluguereDeleteErr, aluguereDeleteRes) {
								// Handle Aluguere error error
								if (aluguereDeleteErr) done(aluguereDeleteErr);

								// Set assertions
								(aluguereDeleteRes.body._id).should.equal(aluguereSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Aluguere instance if not signed in', function(done) {
		// Set Aluguere user 
		aluguere.user = user;

		// Create new Aluguere model instance
		var aluguereObj = new Aluguere(aluguere);

		// Save the Aluguere
		aluguereObj.save(function() {
			// Try deleting Aluguere
			request(app).delete('/alugueres/' + aluguereObj._id)
			.expect(401)
			.end(function(aluguereDeleteErr, aluguereDeleteRes) {
				// Set message assertion
				(aluguereDeleteRes.body.message).should.match('User is not logged in');

				// Handle Aluguere error error
				done(aluguereDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		Aluguere.remove().exec();
		done();
	});
});