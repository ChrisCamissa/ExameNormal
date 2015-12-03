'use strict';

// Configuring the Articles module
angular.module('exames').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Exames', 'exames', 'dropdown', '/exames(/create)?');
		Menus.addSubMenuItem('topbar', 'exames', 'List Exames', 'exames');
		Menus.addSubMenuItem('topbar', 'exames', 'New Exame', 'exames/create');
		
	}
]);