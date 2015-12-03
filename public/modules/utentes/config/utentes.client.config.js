'use strict';

// Configuring the Articles module
angular.module('utentes').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Utentes', 'utentes', 'dropdown', '/utentes(/create)?');
		Menus.addSubMenuItem('topbar', 'utentes', 'List Utentes', 'utentes');
		Menus.addSubMenuItem('topbar', 'utentes', 'New Utente', 'utentes/create');
	}
]);