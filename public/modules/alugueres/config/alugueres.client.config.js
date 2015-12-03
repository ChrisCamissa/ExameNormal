'use strict';

// Configuring the Articles module
angular.module('alugueres').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Alugueres', 'alugueres', 'dropdown', '/alugueres(/create)?');
		Menus.addSubMenuItem('topbar', 'alugueres', 'List Alugueres', 'alugueres');
		Menus.addSubMenuItem('topbar', 'alugueres', 'New Aluguere', 'alugueres/create');
	}
]);