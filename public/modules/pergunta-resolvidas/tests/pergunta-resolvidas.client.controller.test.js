'use strict';

(function() {
	// Pergunta resolvidas Controller Spec
	describe('Pergunta resolvidas Controller Tests', function() {
		// Initialize global variables
		var PerguntaResolvidasController,
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

			// Initialize the Pergunta resolvidas controller.
			PerguntaResolvidasController = $controller('PerguntaResolvidasController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Pergunta resolvida object fetched from XHR', inject(function(PerguntaResolvidas) {
			// Create sample Pergunta resolvida using the Pergunta resolvidas service
			var samplePerguntaResolvida = new PerguntaResolvidas({
				name: 'New Pergunta resolvida'
			});

			// Create a sample Pergunta resolvidas array that includes the new Pergunta resolvida
			var samplePerguntaResolvidas = [samplePerguntaResolvida];

			// Set GET response
			$httpBackend.expectGET('pergunta-resolvidas').respond(samplePerguntaResolvidas);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.perguntaResolvidas).toEqualData(samplePerguntaResolvidas);
		}));

		it('$scope.findOne() should create an array with one Pergunta resolvida object fetched from XHR using a perguntaResolvidaId URL parameter', inject(function(PerguntaResolvidas) {
			// Define a sample Pergunta resolvida object
			var samplePerguntaResolvida = new PerguntaResolvidas({
				name: 'New Pergunta resolvida'
			});

			// Set the URL parameter
			$stateParams.perguntaResolvidaId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/pergunta-resolvidas\/([0-9a-fA-F]{24})$/).respond(samplePerguntaResolvida);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.perguntaResolvida).toEqualData(samplePerguntaResolvida);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(PerguntaResolvidas) {
			// Create a sample Pergunta resolvida object
			var samplePerguntaResolvidaPostData = new PerguntaResolvidas({
				name: 'New Pergunta resolvida'
			});

			// Create a sample Pergunta resolvida response
			var samplePerguntaResolvidaResponse = new PerguntaResolvidas({
				_id: '525cf20451979dea2c000001',
				name: 'New Pergunta resolvida'
			});

			// Fixture mock form input values
			scope.name = 'New Pergunta resolvida';

			// Set POST response
			$httpBackend.expectPOST('pergunta-resolvidas', samplePerguntaResolvidaPostData).respond(samplePerguntaResolvidaResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Pergunta resolvida was created
			expect($location.path()).toBe('/pergunta-resolvidas/' + samplePerguntaResolvidaResponse._id);
		}));

		it('$scope.update() should update a valid Pergunta resolvida', inject(function(PerguntaResolvidas) {
			// Define a sample Pergunta resolvida put data
			var samplePerguntaResolvidaPutData = new PerguntaResolvidas({
				_id: '525cf20451979dea2c000001',
				name: 'New Pergunta resolvida'
			});

			// Mock Pergunta resolvida in scope
			scope.perguntaResolvida = samplePerguntaResolvidaPutData;

			// Set PUT response
			$httpBackend.expectPUT(/pergunta-resolvidas\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/pergunta-resolvidas/' + samplePerguntaResolvidaPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid perguntaResolvidaId and remove the Pergunta resolvida from the scope', inject(function(PerguntaResolvidas) {
			// Create new Pergunta resolvida object
			var samplePerguntaResolvida = new PerguntaResolvidas({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Pergunta resolvidas array and include the Pergunta resolvida
			scope.perguntaResolvidas = [samplePerguntaResolvida];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/pergunta-resolvidas\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(samplePerguntaResolvida);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.perguntaResolvidas.length).toBe(0);
		}));
	});
}());