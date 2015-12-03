'use strict';

// Configuring the Articles module
angular.module('disciplinas').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Disciplinas', 'disciplinas', 'dropdown', '/disciplinas(/create)?');
		Menus.addSubMenuItem('topbar', 'disciplinas', 'List Disciplinas', 'disciplinas');
		Menus.addSubMenuItem('topbar', 'disciplinas', 'New Disciplina', 'disciplinas/create');
	}
]);