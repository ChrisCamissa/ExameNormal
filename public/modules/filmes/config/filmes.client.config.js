'use strict';

// Configuring the Articles module
angular.module('filmes').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Filmes', 'filmes', 'dropdown', '/filmes(/create)?');
		Menus.addSubMenuItem('topbar', 'filmes', 'List Filmes', 'filmes');
		Menus.addSubMenuItem('topbar', 'filmes', 'New Filme', 'filmes/create');
	}
]);