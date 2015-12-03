'use strict';

(function() {
	// Alugueres Controller Spec
	describe('Alugueres Controller Tests', function() {
		// Initialize global variables
		var AlugueresController,
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

			// Initialize the Alugueres controller.
			AlugueresController = $controller('AlugueresController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Aluguere object fetched from XHR', inject(function(Alugueres) {
			// Create sample Aluguere using the Alugueres service
			var sampleAluguere = new Alugueres({
				name: 'New Aluguere'
			});

			// Create a sample Alugueres array that includes the new Aluguere
			var sampleAlugueres = [sampleAluguere];

			// Set GET response
			$httpBackend.expectGET('alugueres').respond(sampleAlugueres);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.alugueres).toEqualData(sampleAlugueres);
		}));

		it('$scope.findOne() should create an array with one Aluguere object fetched from XHR using a aluguereId URL parameter', inject(function(Alugueres) {
			// Define a sample Aluguere object
			var sampleAluguere = new Alugueres({
				name: 'New Aluguere'
			});

			// Set the URL parameter
			$stateParams.aluguereId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/alugueres\/([0-9a-fA-F]{24})$/).respond(sampleAluguere);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.aluguere).toEqualData(sampleAluguere);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Alugueres) {
			// Create a sample Aluguere object
			var sampleAluguerePostData = new Alugueres({
				name: 'New Aluguere'
			});

			// Create a sample Aluguere response
			var sampleAluguereResponse = new Alugueres({
				_id: '525cf20451979dea2c000001',
				name: 'New Aluguere'
			});

			// Fixture mock form input values
			scope.name = 'New Aluguere';

			// Set POST response
			$httpBackend.expectPOST('alugueres', sampleAluguerePostData).respond(sampleAluguereResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Aluguere was created
			expect($location.path()).toBe('/alugueres/' + sampleAluguereResponse._id);
		}));

		it('$scope.update() should update a valid Aluguere', inject(function(Alugueres) {
			// Define a sample Aluguere put data
			var sampleAluguerePutData = new Alugueres({
				_id: '525cf20451979dea2c000001',
				name: 'New Aluguere'
			});

			// Mock Aluguere in scope
			scope.aluguere = sampleAluguerePutData;

			// Set PUT response
			$httpBackend.expectPUT(/alugueres\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/alugueres/' + sampleAluguerePutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid aluguereId and remove the Aluguere from the scope', inject(function(Alugueres) {
			// Create new Aluguere object
			var sampleAluguere = new Alugueres({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Alugueres array and include the Aluguere
			scope.alugueres = [sampleAluguere];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/alugueres\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleAluguere);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.alugueres.length).toBe(0);
		}));
	});
}());