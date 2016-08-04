(function(){

    angular
        .module('crud.widgets.text')
        .directive('wrCrudWidgetsText', crudWidgetsText);

    crudWidgetsText.$inject = ['RouteHelpers'];

    function crudWidgetsText(helper) {
        var directive = {
            scope: {
                options: '=',
                name: '=',
                value: '='
            },
            templateUrl: helper.basepath('widgets/crud-widgets-text.directive.html'),
            restrict: 'EA'
        };
        return directive;
    }

})();
