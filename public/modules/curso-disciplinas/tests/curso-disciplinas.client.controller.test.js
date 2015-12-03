'use strict';

(function() {
	// Curso disciplinas Controller Spec
	describe('Curso disciplinas Controller Tests', function() {
		// Initialize global variables
		var CursoDisciplinasController,
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

			// Initialize the Curso disciplinas controller.
			CursoDisciplinasController = $controller('CursoDisciplinasController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Curso disciplina object fetched from XHR', inject(function(CursoDisciplinas) {
			// Create sample Curso disciplina using the Curso disciplinas service
			var sampleCursoDisciplina = new CursoDisciplinas({
				name: 'New Curso disciplina'
			});

			// Create a sample Curso disciplinas array that includes the new Curso disciplina
			var sampleCursoDisciplinas = [sampleCursoDisciplina];

			// Set GET response
			$httpBackend.expectGET('curso-disciplinas').respond(sampleCursoDisciplinas);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.cursoDisciplinas).toEqualData(sampleCursoDisciplinas);
		}));

		it('$scope.findOne() should create an array with one Curso disciplina object fetched from XHR using a cursoDisciplinaId URL parameter', inject(function(CursoDisciplinas) {
			// Define a sample Curso disciplina object
			var sampleCursoDisciplina = new CursoDisciplinas({
				name: 'New Curso disciplina'
			});

			// Set the URL parameter
			$stateParams.cursoDisciplinaId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/curso-disciplinas\/([0-9a-fA-F]{24})$/).respond(sampleCursoDisciplina);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.cursoDisciplina).toEqualData(sampleCursoDisciplina);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(CursoDisciplinas) {
			// Create a sample Curso disciplina object
			var sampleCursoDisciplinaPostData = new CursoDisciplinas({
				name: 'New Curso disciplina'
			});

			// Create a sample Curso disciplina response
			var sampleCursoDisciplinaResponse = new CursoDisciplinas({
				_id: '525cf20451979dea2c000001',
				name: 'New Curso disciplina'
			});

			// Fixture mock form input values
			scope.name = 'New Curso disciplina';

			// Set POST response
			$httpBackend.expectPOST('curso-disciplinas', sampleCursoDisciplinaPostData).respond(sampleCursoDisciplinaResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Curso disciplina was created
			expect($location.path()).toBe('/curso-disciplinas/' + sampleCursoDisciplinaResponse._id);
		}));

		it('$scope.update() should update a valid Curso disciplina', inject(function(CursoDisciplinas) {
			// Define a sample Curso disciplina put data
			var sampleCursoDisciplinaPutData = new CursoDisciplinas({
				_id: '525cf20451979dea2c000001',
				name: 'New Curso disciplina'
			});

			// Mock Curso disciplina in scope
			scope.cursoDisciplina = sampleCursoDisciplinaPutData;

			// Set PUT response
			$httpBackend.expectPUT(/curso-disciplinas\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/curso-disciplinas/' + sampleCursoDisciplinaPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid cursoDisciplinaId and remove the Curso disciplina from the scope', inject(function(CursoDisciplinas) {
			// Create new Curso disciplina object
			var sampleCursoDisciplina = new CursoDisciplinas({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Curso disciplinas array and include the Curso disciplina
			scope.cursoDisciplinas = [sampleCursoDisciplina];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/curso-disciplinas\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleCursoDisciplina);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.cursoDisciplinas.length).toBe(0);
		}));
	});
}());