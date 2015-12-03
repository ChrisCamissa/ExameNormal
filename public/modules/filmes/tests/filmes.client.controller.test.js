'use strict';

(function() {
	// Filmes Controller Spec
	describe('Filmes Controller Tests', function() {
		// Initialize global variables
		var FilmesController,
		scope,
		$httpBackend,
		$stateParams,
		$location;

		// The $resource service augments the response object with methods for updating and deleting the resource.
		// If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
		// the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
		// When the toEqualData matcher compares two objects, it takes only object properties into
		// account and ignores methods.
		beforeEach(function() {
			jasmine.addMatchers({
				toEqualData: function(util, customEqualityTesters) {
					return {
						compare: function(actual, expected) {
							return {
								pass: angular.equals(actual, expected)
							};
						}
					};
				}
			});
		});

		// Then we can start by loading the main application module
		beforeEach(module(ApplicationConfiguration.applicationModuleName));

		// The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
		// This allows us to inject a service but then attach it to a variable
		// with the same name as the service.
		beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {
			// Set a new global scope
			scope = $rootScope.$new();

			// Point global variables to injected services
			$stateParams = _$stateParams_;
			$httpBackend = _$httpBackend_;
			$location = _$location_;

			// Initialize the Filmes controller.
			FilmesController = $controller('FilmesController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Filme object fetched from XHR', inject(function(Filmes) {
			// Create sample Filme using the Filmes service
			var sampleFilme = new Filmes({
				name: 'New Filme'
			});

			// Create a sample Filmes array that includes the new Filme
			var sampleFilmes = [sampleFilme];

			// Set GET response
			$httpBackend.expectGET('filmes').respond(sampleFilmes);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.filmes).toEqualData(sampleFilmes);
		}));

		it('$scope.findOne() should create an array with one Filme object fetched from XHR using a filmeId URL parameter', inject(function(Filmes) {
			// Define a sample Filme object
			var sampleFilme = new Filmes({
				name: 'New Filme'
			});

			// Set the URL parameter
			$stateParams.filmeId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/filmes\/([0-9a-fA-F]{24})$/).respond(sampleFilme);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.filme).toEqualData(sampleFilme);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Filmes) {
			// Create a sample Filme object
			var sampleFilmePostData = new Filmes({
				name: 'New Filme'
			});

			// Create a sample Filme response
			var sampleFilmeResponse = new Filmes({
				_id: '525cf20451979dea2c000001',
				name: 'New Filme'
			});

			// Fixture mock form input values
			scope.name = 'New Filme';

			// Set POST response
			$httpBackend.expectPOST('filmes', sampleFilmePostData).respond(sampleFilmeResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Filme was created
			expect($location.path()).toBe('/filmes/' + sampleFilmeResponse._id);
		}));

		it('$scope.update() should update a valid Filme', inject(function(Filmes) {
			// Define a sample Filme put data
			var sampleFilmePutData = new Filmes({
				_id: '525cf20451979dea2c000001',
				name: 'New Filme'
			});

			// Mock Filme in scope
			scope.filme = sampleFilmePutData;

			// Set PUT response
			$httpBackend.expectPUT(/filmes\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/filmes/' + sampleFilmePutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid filmeId and remove the Filme from the scope', inject(function(Filmes) {
			// Create new Filme object
			var sampleFilme = new Filmes({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Filmes array and include the Filme
			scope.filmes = [sampleFilme];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/filmes\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleFilme);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.filmes.length).toBe(0);
		}));
	});
}());