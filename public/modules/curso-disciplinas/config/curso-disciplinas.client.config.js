'use strict';

// Configuring the Articles module
angular.module('curso-disciplinas').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		// Menus.addMenuItem('topbar', 'Curso disciplinas', 'curso-disciplinas', 'dropdown', '/curso-disciplinas(/create)?');
		// Menus.addSubMenuItem('topbar', 'curso-disciplinas', 'Lista Curso disciplinas', 'curso-disciplinas');
		// Menus.addSubMenuItem('topbar', 'curso-disciplinas', 'Novo Curso disciplina', 'curso-disciplinas/create');
	}
]);