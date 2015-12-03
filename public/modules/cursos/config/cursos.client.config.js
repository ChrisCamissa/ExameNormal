'use strict';

// Configuring the Articles module
angular.module('cursos').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		// Menus.addMenuItem('topbar', 'Cursos', 'cursos', 'dropdown', '/cursos(/create)?');
		// Menus.addSubMenuItem('topbar', 'cursos', 'Lista de Cursos', 'cursos');
		// Menus.addSubMenuItem('topbar', 'cursos', 'Novo Curso', 'cursos/create');
	}
]);