(function() {
  'use strict';

  angular.
    module('phonecatApp').
    animation('.phone', phoneAnimationFactory);
    
    /**
     * @name phoneAnimationFactory
     * @desc Service handling phone animations
     * @ngInject
     */
    function phoneAnimationFactory() {

      var service = {
        addClass: animateIn,
        removeClass: animateOut
      };

      return service;

      /**
       * @name animateIn
       * @desc Animation for sliding in
       * @param {String} element
       * @param {String} className
       * @param {Boolean} done
       */
      function animateIn(element, className, done) {
        if (className !== 'selected') {return;}

        element.css({
          display: 'block',
          position: 'absolute',
          top: 500,
          left: 0
        }).animate({
          top: 0
        }, done);

        return function animateInEnd(wasCanceled) {
          if (wasCanceled) {element.stop();}
        };
      }

      /**
       * @name animateOut
       * @desc Animation for sliding out
       * @param {String} element
       * @param {String} className
       * @param {Boolean} done
       */
      function animateOut(element, className, done) {
        if (className !== 'selected') {return;}

        element.css({
          position: 'absolute',
          top: 0,
          left: 0
        }).animate({
          top: -500
        }, done);

        return function animateOutEnd(wasCanceled) {
          if (wasCanceled) {element.stop();}
        };
      }
    }
})();

