'use strict';

(function() {
	// Exames Controller Spec
	describe('Exames Controller Tests', function() {
		// Initialize global variables
		var ExamesController,
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

			// Initialize the Exames controller.
			ExamesController = $controller('ExamesController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Exame object fetched from XHR', inject(function(Exames) {
			// Create sample Exame using the Exames service
			var sampleExame = new Exames({
				name: 'New Exame'
			});

			// Create a sample Exames array that includes the new Exame
			var sampleExames = [sampleExame];

			// Set GET response
			$httpBackend.expectGET('exames').respond(sampleExames);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.exames).toEqualData(sampleExames);
		}));

		it('$scope.findOne() should create an array with one Exame object fetched from XHR using a exameId URL parameter', inject(function(Exames) {
			// Define a sample Exame object
			var sampleExame = new Exames({
				name: 'New Exame'
			});

			// Set the URL parameter
			$stateParams.exameId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/exames\/([0-9a-fA-F]{24})$/).respond(sampleExame);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.exame).toEqualData(sampleExame);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Exames) {
			// Create a sample Exame object
			var sampleExamePostData = new Exames({
				name: 'New Exame'
			});

			// Create a sample Exame response
			var sampleExameResponse = new Exames({
				_id: '525cf20451979dea2c000001',
				name: 'New Exame'
			});

			// Fixture mock form input values
			scope.name = 'New Exame';

			// Set POST response
			$httpBackend.expectPOST('exames', sampleExamePostData).respond(sampleExameResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Exame was created
			expect($location.path()).toBe('/exames/' + sampleExameResponse._id);
		}));

		it('$scope.update() should update a valid Exame', inject(function(Exames) {
			// Define a sample Exame put data
			var sampleExamePutData = new Exames({
				_id: '525cf20451979dea2c000001',
				name: 'New Exame'
			});

			// Mock Exame in scope
			scope.exame = sampleExamePutData;

			// Set PUT response
			$httpBackend.expectPUT(/exames\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/exames/' + sampleExamePutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid exameId and remove the Exame from the scope', inject(function(Exames) {
			// Create new Exame object
			var sampleExame = new Exames({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Exames array and include the Exame
			scope.exames = [sampleExame];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/exames\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleExame);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.exames.length).toBe(0);
		}));
	});
}());