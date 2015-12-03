'use strict';

(function() {
	// Disciplinas Controller Spec
	describe('Disciplinas Controller Tests', function() {
		// Initialize global variables
		var DisciplinasController,
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

			// Initialize the Disciplinas controller.
			DisciplinasController = $controller('DisciplinasController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Disciplina object fetched from XHR', inject(function(Disciplinas) {
			// Create sample Disciplina using the Disciplinas service
			var sampleDisciplina = new Disciplinas({
				name: 'New Disciplina'
			});

			// Create a sample Disciplinas array that includes the new Disciplina
			var sampleDisciplinas = [sampleDisciplina];

			// Set GET response
			$httpBackend.expectGET('disciplinas').respond(sampleDisciplinas);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.disciplinas).toEqualData(sampleDisciplinas);
		}));

		it('$scope.findOne() should create an array with one Disciplina object fetched from XHR using a disciplinaId URL parameter', inject(function(Disciplinas) {
			// Define a sample Disciplina object
			var sampleDisciplina = new Disciplinas({
				name: 'New Disciplina'
			});

			// Set the URL parameter
			$stateParams.disciplinaId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/disciplinas\/([0-9a-fA-F]{24})$/).respond(sampleDisciplina);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.disciplina).toEqualData(sampleDisciplina);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Disciplinas) {
			// Create a sample Disciplina object
			var sampleDisciplinaPostData = new Disciplinas({
				name: 'New Disciplina'
			});

			// Create a sample Disciplina response
			var sampleDisciplinaResponse = new Disciplinas({
				_id: '525cf20451979dea2c000001',
				name: 'New Disciplina'
			});

			// Fixture mock form input values
			scope.name = 'New Disciplina';

			// Set POST response
			$httpBackend.expectPOST('disciplinas', sampleDisciplinaPostData).respond(sampleDisciplinaResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Disciplina was created
			expect($location.path()).toBe('/disciplinas/' + sampleDisciplinaResponse._id);
		}));

		it('$scope.update() should update a valid Disciplina', inject(function(Disciplinas) {
			// Define a sample Disciplina put data
			var sampleDisciplinaPutData = new Disciplinas({
				_id: '525cf20451979dea2c000001',
				name: 'New Disciplina'
			});

			// Mock Disciplina in scope
			scope.disciplina = sampleDisciplinaPutData;

			// Set PUT response
			$httpBackend.expectPUT(/disciplinas\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/disciplinas/' + sampleDisciplinaPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid disciplinaId and remove the Disciplina from the scope', inject(function(Disciplinas) {
			// Create new Disciplina object
			var sampleDisciplina = new Disciplinas({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Disciplinas array and include the Disciplina
			scope.disciplinas = [sampleDisciplina];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/disciplinas\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleDisciplina);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.disciplinas.length).toBe(0);
		}));
	});
}());