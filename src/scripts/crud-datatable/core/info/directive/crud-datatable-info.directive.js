(function() {

    angular
        .module('crud.datatable.info')
        .directive('wrCrudDatatableInfo', crudDatatableInfo);

    crudDatatableInfo.$inject = ['RouteHelpers'];

    function crudDatatableInfo(helper) {
        var directive = {
            scope: {
                language: "=",
                pagination: "=",
                page: "=",
                total: "="
            },
            templateUrl: helper.basepath('datatable-core/crud-datatable-info.directive.html'),
            restrict: 'EA'
        };
        return directive;
    }

})();
