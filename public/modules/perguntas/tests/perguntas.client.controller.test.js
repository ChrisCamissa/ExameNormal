'use strict';

(function() {
	// Perguntas Controller Spec
	describe('Perguntas Controller Tests', function() {
		// Initialize global variables
		var PerguntasController,
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

			// Initialize the Perguntas controller.
			PerguntasController = $controller('PerguntasController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Pergunta object fetched from XHR', inject(function(Perguntas) {
			// Create sample Pergunta using the Perguntas service
			var samplePergunta = new Perguntas({
				name: 'New Pergunta'
			});

			// Create a sample Perguntas array that includes the new Pergunta
			var samplePerguntas = [samplePergunta];

			// Set GET response
			$httpBackend.expectGET('perguntas').respond(samplePerguntas);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.perguntas).toEqualData(samplePerguntas);
		}));

		it('$scope.findOne() should create an array with one Pergunta object fetched from XHR using a perguntaId URL parameter', inject(function(Perguntas) {
			// Define a sample Pergunta object
			var samplePergunta = new Perguntas({
				name: 'New Pergunta'
			});

			// Set the URL parameter
			$stateParams.perguntaId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/perguntas\/([0-9a-fA-F]{24})$/).respond(samplePergunta);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.pergunta).toEqualData(samplePergunta);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Perguntas) {
			// Create a sample Pergunta object
			var samplePerguntaPostData = new Perguntas({
				name: 'New Pergunta'
			});

			// Create a sample Pergunta response
			var samplePerguntaResponse = new Perguntas({
				_id: '525cf20451979dea2c000001',
				name: 'New Pergunta'
			});

			// Fixture mock form input values
			scope.name = 'New Pergunta';

			// Set POST response
			$httpBackend.expectPOST('perguntas', samplePerguntaPostData).respond(samplePerguntaResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Pergunta was created
			expect($location.path()).toBe('/perguntas/' + samplePerguntaResponse._id);
		}));

		it('$scope.update() should update a valid Pergunta', inject(function(Perguntas) {
			// Define a sample Pergunta put data
			var samplePerguntaPutData = new Perguntas({
				_id: '525cf20451979dea2c000001',
				name: 'New Pergunta'
			});

			// Mock Pergunta in scope
			scope.pergunta = samplePerguntaPutData;

			// Set PUT response
			$httpBackend.expectPUT(/perguntas\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/perguntas/' + samplePerguntaPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid perguntaId and remove the Pergunta from the scope', inject(function(Perguntas) {
			// Create new Pergunta object
			var samplePergunta = new Perguntas({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Perguntas array and include the Pergunta
			scope.perguntas = [samplePergunta];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/perguntas\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(samplePergunta);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.perguntas.length).toBe(0);
		}));
	});
}());