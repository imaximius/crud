(function(){

    angular
        .module('crud.widgets.dynamic')
        .directive('wrCrudWidgetsDynamic', crudWidgetsDynamic);

    crudWidgetsDynamic.$inject = ['$compile'];

    function crudWidgetsDynamic($compile) {
        var directive = {
            link: link,
            replace: false,
            terminal: true,
            priority: 1000,
            restrict: 'EA'
        };
        return directive;

        function link(scope, element, attrs) {
            element.attr("wr-crud-widgets-"+scope.$eval(attrs.wrCrudWidgetsDynamic),"");//add dynamic directive

            element.removeAttr("wr-crud-widgets-dynamic"); //remove the attribute to avoid indefinite loop
            element.removeAttr("data-wr-crud-widgets-dynamic");

            $compile(element)(scope);
        }
    }

})();
