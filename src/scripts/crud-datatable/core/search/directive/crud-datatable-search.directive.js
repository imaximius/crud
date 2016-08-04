(function() {

    angular
        .module('crud.datatable.search')
        .directive('wrCrudDatatableSearch', crudDatatableSearch);

    crudDatatableSearch.$inject = ['RouteHelpers', '$timeout'];

    function crudDatatableSearch(helper, $timeout) {
        var directive = {
            scope: {
                search: "=",
                language: "=",
                refresh: "&"
            },
            templateUrl: helper.basepath('datatable-core/crud-datatable-search.directive.html'),
            restrict: 'EA',
            link: link
        };
        return directive;

        function link(scope, element, attr) {
            scope.onChange = onChange;

            // Implementation

            function onChange() {
                $timeout(function() {
                    scope.refresh({
                        goToFirst: true
                    });
                }, 0);
            }
        }
    }

})();
