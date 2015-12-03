'use strict';

(function() {
	// Ajudas Controller Spec
	describe('Ajudas Controller Tests', function() {
		// Initialize global variables
		var AjudasController,
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

			// Initialize the Ajudas controller.
			AjudasController = $controller('AjudasController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Ajuda object fetched from XHR', inject(function(Ajudas) {
			// Create sample Ajuda using the Ajudas service
			var sampleAjuda = new Ajudas({
				name: 'New Ajuda'
			});

			// Create a sample Ajudas array that includes the new Ajuda
			var sampleAjudas = [sampleAjuda];

			// Set GET response
			$httpBackend.expectGET('ajudas').respond(sampleAjudas);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.ajudas).toEqualData(sampleAjudas);
		}));

		it('$scope.findOne() should create an array with one Ajuda object fetched from XHR using a ajudaId URL parameter', inject(function(Ajudas) {
			// Define a sample Ajuda object
			var sampleAjuda = new Ajudas({
				name: 'New Ajuda'
			});

			// Set the URL parameter
			$stateParams.ajudaId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/ajudas\/([0-9a-fA-F]{24})$/).respond(sampleAjuda);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.ajuda).toEqualData(sampleAjuda);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Ajudas) {
			// Create a sample Ajuda object
			var sampleAjudaPostData = new Ajudas({
				name: 'New Ajuda'
			});

			// Create a sample Ajuda response
			var sampleAjudaResponse = new Ajudas({
				_id: '525cf20451979dea2c000001',
				name: 'New Ajuda'
			});

			// Fixture mock form input values
			scope.name = 'New Ajuda';

			// Set POST response
			$httpBackend.expectPOST('ajudas', sampleAjudaPostData).respond(sampleAjudaResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Ajuda was created
			expect($location.path()).toBe('/ajudas/' + sampleAjudaResponse._id);
		}));

		it('$scope.update() should update a valid Ajuda', inject(function(Ajudas) {
			// Define a sample Ajuda put data
			var sampleAjudaPutData = new Ajudas({
				_id: '525cf20451979dea2c000001',
				name: 'New Ajuda'
			});

			// Mock Ajuda in scope
			scope.ajuda = sampleAjudaPutData;

			// Set PUT response
			$httpBackend.expectPUT(/ajudas\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/ajudas/' + sampleAjudaPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid ajudaId and remove the Ajuda from the scope', inject(function(Ajudas) {
			// Create new Ajuda object
			var sampleAjuda = new Ajudas({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Ajudas array and include the Ajuda
			scope.ajudas = [sampleAjuda];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/ajudas\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleAjuda);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.ajudas.length).toBe(0);
		}));
	});
}());