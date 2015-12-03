'use strict';

(function() {
	// Utentes Controller Spec
	describe('Utentes Controller Tests', function() {
		// Initialize global variables
		var UtentesController,
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

			// Initialize the Utentes controller.
			UtentesController = $controller('UtentesController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Utente object fetched from XHR', inject(function(Utentes) {
			// Create sample Utente using the Utentes service
			var sampleUtente = new Utentes({
				name: 'New Utente'
			});

			// Create a sample Utentes array that includes the new Utente
			var sampleUtentes = [sampleUtente];

			// Set GET response
			$httpBackend.expectGET('utentes').respond(sampleUtentes);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.utentes).toEqualData(sampleUtentes);
		}));

		it('$scope.findOne() should create an array with one Utente object fetched from XHR using a utenteId URL parameter', inject(function(Utentes) {
			// Define a sample Utente object
			var sampleUtente = new Utentes({
				name: 'New Utente'
			});

			// Set the URL parameter
			$stateParams.utenteId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/utentes\/([0-9a-fA-F]{24})$/).respond(sampleUtente);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.utente).toEqualData(sampleUtente);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Utentes) {
			// Create a sample Utente object
			var sampleUtentePostData = new Utentes({
				name: 'New Utente'
			});

			// Create a sample Utente response
			var sampleUtenteResponse = new Utentes({
				_id: '525cf20451979dea2c000001',
				name: 'New Utente'
			});

			// Fixture mock form input values
			scope.name = 'New Utente';

			// Set POST response
			$httpBackend.expectPOST('utentes', sampleUtentePostData).respond(sampleUtenteResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Utente was created
			expect($location.path()).toBe('/utentes/' + sampleUtenteResponse._id);
		}));

		it('$scope.update() should update a valid Utente', inject(function(Utentes) {
			// Define a sample Utente put data
			var sampleUtentePutData = new Utentes({
				_id: '525cf20451979dea2c000001',
				name: 'New Utente'
			});

			// Mock Utente in scope
			scope.utente = sampleUtentePutData;

			// Set PUT response
			$httpBackend.expectPUT(/utentes\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/utentes/' + sampleUtentePutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid utenteId and remove the Utente from the scope', inject(function(Utentes) {
			// Create new Utente object
			var sampleUtente = new Utentes({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Utentes array and include the Utente
			scope.utentes = [sampleUtente];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/utentes\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleUtente);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.utentes.length).toBe(0);
		}));
	});
}());