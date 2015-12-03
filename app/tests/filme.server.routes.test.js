'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Filme = mongoose.model('Filme'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, filme;

/**
 * Filme routes tests
 */
describe('Filme CRUD tests', function() {
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

		// Save a user to the test db and create new Filme
		user.save(function() {
			filme = {
				name: 'Filme Name'
			};

			done();
		});
	});

	it('should be able to save Filme instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Filme
				agent.post('/filmes')
					.send(filme)
					.expect(200)
					.end(function(filmeSaveErr, filmeSaveRes) {
						// Handle Filme save error
						if (filmeSaveErr) done(filmeSaveErr);

						// Get a list of Filmes
						agent.get('/filmes')
							.end(function(filmesGetErr, filmesGetRes) {
								// Handle Filme save error
								if (filmesGetErr) done(filmesGetErr);

								// Get Filmes list
								var filmes = filmesGetRes.body;

								// Set assertions
								(filmes[0].user._id).should.equal(userId);
								(filmes[0].name).should.match('Filme Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Filme instance if not logged in', function(done) {
		agent.post('/filmes')
			.send(filme)
			.expect(401)
			.end(function(filmeSaveErr, filmeSaveRes) {
				// Call the assertion callback
				done(filmeSaveErr);
			});
	});

	it('should not be able to save Filme instance if no name is provided', function(done) {
		// Invalidate name field
		filme.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Filme
				agent.post('/filmes')
					.send(filme)
					.expect(400)
					.end(function(filmeSaveErr, filmeSaveRes) {
						// Set message assertion
						(filmeSaveRes.body.message).should.match('Please fill Filme name');
						
						// Handle Filme save error
						done(filmeSaveErr);
					});
			});
	});

	it('should be able to update Filme instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Filme
				agent.post('/filmes')
					.send(filme)
					.expect(200)
					.end(function(filmeSaveErr, filmeSaveRes) {
						// Handle Filme save error
						if (filmeSaveErr) done(filmeSaveErr);

						// Update Filme name
						filme.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Filme
						agent.put('/filmes/' + filmeSaveRes.body._id)
							.send(filme)
							.expect(200)
							.end(function(filmeUpdateErr, filmeUpdateRes) {
								// Handle Filme update error
								if (filmeUpdateErr) done(filmeUpdateErr);

								// Set assertions
								(filmeUpdateRes.body._id).should.equal(filmeSaveRes.body._id);
								(filmeUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Filmes if not signed in', function(done) {
		// Create new Filme model instance
		var filmeObj = new Filme(filme);

		// Save the Filme
		filmeObj.save(function() {
			// Request Filmes
			request(app).get('/filmes')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Filme if not signed in', function(done) {
		// Create new Filme model instance
		var filmeObj = new Filme(filme);

		// Save the Filme
		filmeObj.save(function() {
			request(app).get('/filmes/' + filmeObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', filme.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Filme instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Filme
				agent.post('/filmes')
					.send(filme)
					.expect(200)
					.end(function(filmeSaveErr, filmeSaveRes) {
						// Handle Filme save error
						if (filmeSaveErr) done(filmeSaveErr);

						// Delete existing Filme
						agent.delete('/filmes/' + filmeSaveRes.body._id)
							.send(filme)
							.expect(200)
							.end(function(filmeDeleteErr, filmeDeleteRes) {
								// Handle Filme error error
								if (filmeDeleteErr) done(filmeDeleteErr);

								// Set assertions
								(filmeDeleteRes.body._id).should.equal(filmeSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Filme instance if not signed in', function(done) {
		// Set Filme user 
		filme.user = user;

		// Create new Filme model instance
		var filmeObj = new Filme(filme);

		// Save the Filme
		filmeObj.save(function() {
			// Try deleting Filme
			request(app).delete('/filmes/' + filmeObj._id)
			.expect(401)
			.end(function(filmeDeleteErr, filmeDeleteRes) {
				// Set message assertion
				(filmeDeleteRes.body.message).should.match('User is not logged in');

				// Handle Filme error error
				done(filmeDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		Filme.remove().exec();
		done();
	});
});