'use strict';


angular.module('core').controller('HomeController', ['$scope', 'Authentication',
	function($scope, Authentication) {
		// This provides Authentication context.
		$scope.authentication = Authentication;



		// $scope.myInterval = 5000;
		//  $scope.noWrapSlides = false;
		//  var slides = $scope.slides = [];
		//  $scope.addSlide = function() {
		//    var newWidth = 600 + slides.length + 1;
		//    slides.push({
		//      image: '//placekitten.com/' + newWidth + '/300',
		//      text: ['More','Extra','Lots of','Surplus'][slides.length % 4] + ' ' +
		//        ['Cats', 'Kittys', 'Felines', 'Cutes'][slides.length % 4]
		//    });
		//  };
		//  for (var i=0; i<4; i++) {
		//    $scope.addSlide();
		//  }
		

		$scope.slideUp = function () {
		    $(function () {
		    	// wait till load event fires so all resources are available
		    	var jumboHeight = $('.jumbotron').outerHeight();
		      	var scrolled = $(window).scrollTop();
		      	$('.bg').css('height', (jumboHeight-scrolled) + 'px');	
		    });

		};
		// 	$(window).scroll(function(e){
		//     parallax();
		// });

	}
	
]);