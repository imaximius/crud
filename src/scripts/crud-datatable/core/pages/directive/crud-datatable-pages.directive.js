(function() {

    angular
        .module('crud.datatable.pages')
        .directive('wrCrudDatatablePages', crudDatatablePages);

    crudDatatablePages.$inject = ['RouteHelpers', '$timeout'];

    function crudDatatablePages(helper, $timeout) {
        var directive = {
            scope: {
                page: "=",
                pagesCount: "=",
                language: "=",
                refresh: "&"
            },
            templateUrl: helper.basepath('datatable-core/crud-datatable-pages.directive.html'),
            restrict: 'EA',
            link: link
        };
        return directive;

        function link(scope, element, attr) {
            scope.goTo = goTo;
            scope.getNumber = getNumber;
            scope.maxStickyPages = 5;

            // Implementation

            function goTo(page) {
                scope.page = page;
                $timeout(function() {
                    scope.refresh();
                }, 0);
            }

            function getNumber(num) {
                if (num) {
                    return new Array(num);
                }
            }
        }
    }

})();
