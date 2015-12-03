'use strict';

// Configuring the Articles module
angular.module('perguntas').run(['Menus',
	function(Menus) {
		// // Set top bar menu items
		// Menus.addMenuItem('topbar', 'Perguntas', 'perguntas', 'dropdown', '/perguntas(/create)?');
		// Menus.addSubMenuItem('topbar', 'perguntas', 'List Perguntas', 'perguntas');
		// Menus.addSubMenuItem('topbar', 'perguntas', 'New Pergunta', 'perguntas/create');
	}
]);