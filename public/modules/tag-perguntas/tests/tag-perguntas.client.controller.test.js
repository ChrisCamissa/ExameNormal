'use strict';

(function() {
	// Tag perguntas Controller Spec
	describe('Tag perguntas Controller Tests', function() {
		// Initialize global variables
		var TagPerguntasController,
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

			// Initialize the Tag perguntas controller.
			TagPerguntasController = $controller('TagPerguntasController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Tag pergunta object fetched from XHR', inject(function(TagPerguntas) {
			// Create sample Tag pergunta using the Tag perguntas service
			var sampleTagPergunta = new TagPerguntas({
				name: 'New Tag pergunta'
			});

			// Create a sample Tag perguntas array that includes the new Tag pergunta
			var sampleTagPerguntas = [sampleTagPergunta];

			// Set GET response
			$httpBackend.expectGET('tag-perguntas').respond(sampleTagPerguntas);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.tagPerguntas).toEqualData(sampleTagPerguntas);
		}));

		it('$scope.findOne() should create an array with one Tag pergunta object fetched from XHR using a tagPerguntaId URL parameter', inject(function(TagPerguntas) {
			// Define a sample Tag pergunta object
			var sampleTagPergunta = new TagPerguntas({
				name: 'New Tag pergunta'
			});

			// Set the URL parameter
			$stateParams.tagPerguntaId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/tag-perguntas\/([0-9a-fA-F]{24})$/).respond(sampleTagPergunta);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.tagPergunta).toEqualData(sampleTagPergunta);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(TagPerguntas) {
			// Create a sample Tag pergunta object
			var sampleTagPerguntaPostData = new TagPerguntas({
				name: 'New Tag pergunta'
			});

			// Create a sample Tag pergunta response
			var sampleTagPerguntaResponse = new TagPerguntas({
				_id: '525cf20451979dea2c000001',
				name: 'New Tag pergunta'
			});

			// Fixture mock form input values
			scope.name = 'New Tag pergunta';

			// Set POST response
			$httpBackend.expectPOST('tag-perguntas', sampleTagPerguntaPostData).respond(sampleTagPerguntaResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Tag pergunta was created
			expect($location.path()).toBe('/tag-perguntas/' + sampleTagPerguntaResponse._id);
		}));

		it('$scope.update() should update a valid Tag pergunta', inject(function(TagPerguntas) {
			// Define a sample Tag pergunta put data
			var sampleTagPerguntaPutData = new TagPerguntas({
				_id: '525cf20451979dea2c000001',
				name: 'New Tag pergunta'
			});

			// Mock Tag pergunta in scope
			scope.tagPergunta = sampleTagPerguntaPutData;

			// Set PUT response
			$httpBackend.expectPUT(/tag-perguntas\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/tag-perguntas/' + sampleTagPerguntaPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid tagPerguntaId and remove the Tag pergunta from the scope', inject(function(TagPerguntas) {
			// Create new Tag pergunta object
			var sampleTagPergunta = new TagPerguntas({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Tag perguntas array and include the Tag pergunta
			scope.tagPerguntas = [sampleTagPergunta];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/tag-perguntas\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleTagPergunta);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.tagPerguntas.length).toBe(0);
		}));
	});
}());