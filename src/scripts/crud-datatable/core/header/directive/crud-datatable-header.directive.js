(function() {

    angular
        .module('crud.datatable.header')
        .directive('wrCrudDatatableHeader', crudDatatableHeader);

    crudDatatableHeader.$inject = ['RouteHelpers', '$timeout'];

    function crudDatatableHeader(helper, $timeout) {
        var directive = {
            scope: {
                dt: "=",
                hasCheckbox: "=",
                hasDropdown: "=",
                columns: "=",
                sortColumn: "=",
                sortColumnAsc: "=",
                onSelectAll: "&",
                refresh: "&"
            },
            templateUrl: helper.basepath('datatable-core/crud-datatable-header.directive.html'),
            restrict: 'EA',
            link: link
        };
        return directive;

        function link(scope, element, attr) {

            scope.getSortClass = getSortClass;
            scope.sortByIndex = sortByIndex;
            scope.selectRow = selectRow;

            // Implementation

            function getSortClass(index) {
                if (scope.columns[index].sortable) {
                    if (index === scope.sortColumn) {
                        if (scope.sortColumnAsc) {
                            return 'sorting_asc';
                        }
                        return 'sorting_desc';
                    }
                    return 'sorting';
                }
            }

            function sortByIndex(index) {
                if (scope.columns[index].sortable) {
                    if (index === scope.sortColumn) {
                        scope.sortColumnAsc = !scope.sortColumnAsc;
                    } else {
                        scope.sortColumnAsc = true;
                        scope.sortColumn = index;
                    }
                    $timeout(function() {
                        scope.refresh({
                            goToFirst: true
                        });
                    }, 0);
                }
            }

            function selectRow() {
                scope.onSelectAll();
            }
        }
    }

})();
