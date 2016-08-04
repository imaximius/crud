(function() {

    angular
        .module('crud.datatable.pagination')
        .directive('wrCrudDatatablePagination', crudDatatablePagination);

    crudDatatablePagination.$inject = ['RouteHelpers', '$timeout'];

    function crudDatatablePagination(helper, $timeout) {
        var directive = {
            scope: {
                pagination: "=",
                language: "=",
                refresh: "&"
            },
            templateUrl: helper.basepath('datatable-core/crud-datatable-pagination.directive.html'),
            restrict: 'EA',
            link: link
        };
        return directive;

        function link(scope, element, attr) {
            scope.onPaginationChanged = onPaginationChanged;
            scope.availableOptions = [
                10,
                25,
                50,
                100
            ]

            // Implementation

            function onPaginationChanged() {
                $timeout(function() {
                    scope.refresh({
                        goToFirst: true
                    });
                }, 0);
            }
        }
    }

})();
