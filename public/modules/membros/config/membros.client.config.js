'use strict';

// Membros module config
angular.module('membros').run(['Menus',
	function(Menus) {
		// Config logic
		// ...

		//this.addMenuItem = function(menuId, menuItemTitle, menuItemURL, menuItemType, menuItemUIRoute, isPublic, roles, position)
		// Menus.addMenuItem('topbar', 'Membros', 'membro', 'dropdown', '/membros(/create)?');
		// Menus.addSubMenuItem('topbar', 'membros', 'List Membros', 'membros');
		// Menus.addSubMenuItem('topbar', 'membros', 'New Membro', 'membros/create');
	}
]);