(function(){

    angular
        .module('crud.widgets.hidden')
        .directive('wrCrudWidgetsHidden', crudWidgetsHidden);

    crudWidgetsHidden.$inject = ['RouteHelpers'];

    function crudWidgetsHidden(helper) {
        var directive = {
            scope: {
                options: '=',
                name: '=',
                value: '='
            },
            templateUrl: helper.basepath('widgets/crud-widgets-hidden.directive.html'),
            restrict: 'EA'
        };
        return directive;
    }

})();
