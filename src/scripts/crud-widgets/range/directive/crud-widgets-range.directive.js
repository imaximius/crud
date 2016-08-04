(function(){

    angular
        .module('crud.widgets.range')
        .directive('wrCrudWidgetsRange', crudWidgetsRange);

    crudWidgetsRange.$inject = ['RouteHelpers'];

    function crudWidgetsRange(helper) {
        var directive = {
            scope: {
                options: '=',
                name: '=',
                value: '='
            },
            link: link,
            templateUrl: helper.basepath('widgets/crud-widgets-range.directive.html'),
            restrict: 'EA'
        };
        return directive;

        function link(scope, element, attrs) {
            if (!scope.options.range_min.field_name) {
                scope.options.range_min.field_name = 'min';
            }

            if (!scope.options.range_max.field_name) {
                scope.options.range_max.field_name = 'max';
            }

            if (!scope.value) {
                scope.value = {
                    min: scope.options.range_min.value != undefined ? scope.options.range_min.value : scope.options.range_min.minValue,
                    max: scope.options.range_max.value != undefined ? scope.options.range_max.value : scope.options.range_max.maxValue
                };
            }
        }
    }

})();
