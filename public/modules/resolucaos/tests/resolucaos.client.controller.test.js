'use strict';

(function() {
	// Resolucaos Controller Spec
	describe('Resolucaos Controller Tests', function() {
		// Initialize global variables
		var ResolucaosController,
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

			// Initialize the Resolucaos controller.
			ResolucaosController = $controller('ResolucaosController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Resolucao object fetched from XHR', inject(function(Resolucaos) {
			// Create sample Resolucao using the Resolucaos service
			var sampleResolucao = new Resolucaos({
				name: 'New Resolucao'
			});

			// Create a sample Resolucaos array that includes the new Resolucao
			var sampleResolucaos = [sampleResolucao];

			// Set GET response
			$httpBackend.expectGET('resolucaos').respond(sampleResolucaos);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.resolucaos).toEqualData(sampleResolucaos);
		}));

		it('$scope.findOne() should create an array with one Resolucao object fetched from XHR using a resolucaoId URL parameter', inject(function(Resolucaos) {
			// Define a sample Resolucao object
			var sampleResolucao = new Resolucaos({
				name: 'New Resolucao'
			});

			// Set the URL parameter
			$stateParams.resolucaoId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/resolucaos\/([0-9a-fA-F]{24})$/).respond(sampleResolucao);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.resolucao).toEqualData(sampleResolucao);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Resolucaos) {
			// Create a sample Resolucao object
			var sampleResolucaoPostData = new Resolucaos({
				name: 'New Resolucao'
			});

			// Create a sample Resolucao response
			var sampleResolucaoResponse = new Resolucaos({
				_id: '525cf20451979dea2c000001',
				name: 'New Resolucao'
			});

			// Fixture mock form input values
			scope.name = 'New Resolucao';

			// Set POST response
			$httpBackend.expectPOST('resolucaos', sampleResolucaoPostData).respond(sampleResolucaoResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Resolucao was created
			expect($location.path()).toBe('/resolucaos/' + sampleResolucaoResponse._id);
		}));

		it('$scope.update() should update a valid Resolucao', inject(function(Resolucaos) {
			// Define a sample Resolucao put data
			var sampleResolucaoPutData = new Resolucaos({
				_id: '525cf20451979dea2c000001',
				name: 'New Resolucao'
			});

			// Mock Resolucao in scope
			scope.resolucao = sampleResolucaoPutData;

			// Set PUT response
			$httpBackend.expectPUT(/resolucaos\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/resolucaos/' + sampleResolucaoPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid resolucaoId and remove the Resolucao from the scope', inject(function(Resolucaos) {
			// Create new Resolucao object
			var sampleResolucao = new Resolucaos({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Resolucaos array and include the Resolucao
			scope.resolucaos = [sampleResolucao];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/resolucaos\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleResolucao);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.resolucaos.length).toBe(0);
		}));
	});
}());