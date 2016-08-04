(function(){

    angular
        .module('crud.widgets.checkbox')
        .directive('wrCrudWidgetsCheckbox', crudWidgetsCheckbox);

    crudWidgetsCheckbox.$inject = ['RouteHelpers'];

    function crudWidgetsCheckbox(helper) {
        var directive = {
            scope: {
                options: '=',
                name: '=',
                value: '='
            },
            templateUrl: helper.basepath('widgets/crud-widgets-checkbox.directive.html'),
            restrict: 'EA'
        };
        return directive;
    }

})();
