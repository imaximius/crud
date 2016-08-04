(function() {

    angular
        .module('crud.datatable.widgets.checkbox')
        .directive('wrCrudDatatableWidgetsCheckbox', crudDatatableWidgetsCheckbox);

    crudDatatableWidgetsCheckbox.$inject = ['RouteHelpers', '$timeout'];

    function crudDatatableWidgetsCheckbox(helper, $timeout) {
        var directive = {
            scope: {
                selectRow: "&",
                row: "="
            },
            templateUrl: helper.basepath('datatable-widgets/crud-datatable-widgets-checkbox.directive.html'),
            restrict: 'EA',
            link: link
        };
        return directive;

        function link(scope, element, attr) {
            scope.onChange = onChange;

            // Implementation

            /**
             * onChange - trigger on change checkbox status
             *
             */
            function onChange() {
                $timeout(function() {
                    scope.selectRow();
                }, 0);
            }
        }
    }

})();
