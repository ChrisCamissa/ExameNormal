'use strict';

// Configuring the Articles module
angular.module('resolucaos').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		// Menus.addMenuItem('topbar', 'Resolucaos', 'resolucaos', 'dropdown', '/resolucaos(/create)?');
		// Menus.addSubMenuItem('topbar', 'resolucaos', 'List Resolucaos', 'resolucaos');
		// Menus.addSubMenuItem('topbar', 'resolucaos', 'New Resolucao', 'resolucaos/create');
	}
]);