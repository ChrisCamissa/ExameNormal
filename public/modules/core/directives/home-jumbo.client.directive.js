'use strict';

angular.module('core').directive("homeJumbo", function ($window) {
    return function(scope, element, attrs) {
        angular.element($window).bind("scroll", function() {
             // if (this.pageYOffset >= 100) {
             //     scope.boolChangeClass = true;
             //     console.log('Scrolled below header.');

             // }
             var jumb= document.querySelector(".bg");
             jumb.style.height=this.pageYOffset;
             console.log(jumb);
             console.log(this.pageYOffset);
            //scope.$apply();
        });
    };
});