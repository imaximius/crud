(function(){

    angular
        .module('crud.widgets.compileit')
        .directive('compileIt', crudWidgetsCompileIt);

    crudWidgetsCompileIt.$inject = ['$compile', '$timeout'];

    function crudWidgetsCompileIt($compile, $timeout) {
        var directive = {
            link: link,
            replace: false,
            terminal: true,
            priority: 1000,
            restrict: 'EA'
        };
        return directive;

        function link(scope, element, attrs) {
            $timeout(function(){
                if(/<[a-z][\s\S]*>/i.test(scope.$eval(attrs.compileIt))){
                    element.replaceWith($compile(scope.$eval(attrs.compileIt))(scope.$parent));
                } else {
                    element.replaceWith(scope.$eval(attrs.compileIt));
                }
            }, 0);
        }
    }

})();
