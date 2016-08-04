(function() {

    angular
        .module('crud.datatable.row')
        .directive('wrCrudDatatableRow', crudDatatableRow);

    crudDatatableRow.$inject = ['RouteHelpers'];

    function crudDatatableRow(helper) {
        var directive = {
            scope: {
                onSelectRow: "&",
                row: "=",
                actions: "=",
                hasDropdown: "="
            },
            templateUrl: helper.basepath('datatable-core/crud-datatable-row.directive.html'),
            restrict: 'EA'
        };
        return directive;
    }

})();
