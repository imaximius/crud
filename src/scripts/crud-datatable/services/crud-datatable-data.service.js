angular
    .module('app')
    .service('datatableService', datatableService);

datatableService.$inject = ['$http'];

function datatableService($http) {

    var service = {
        get: get
    };
    return service;

    // Implementation

    function get(source, options, queryData) {

        var data = parseOptions(options);

        return $http({
            method: 'POST',
            url: source + (queryData ? "?" + $.param(queryData) : ""),
            data: data
        });

    }

    function parseOptions(options) {

        var data = {
            sEcho: options.echo,
            iColumns: options.columns.length,
            sColumns: new Array(options.columns.length),
            iDisplayStart: (options.page - 1) * options.pagination,
            iDisplayLength: options.pagination,
            sSearch: options.search,
            bRegex: false,
            iSortCol_0: options.sortColumn,
            sSortDir_0: options.sortColumnAsc ? "asc" : "desc",
            iSortingCols: 1
        };

        for (var i = 0; i < options.columns.length; i++) {
            data["sSearch_" + i] = undefined;
            data["mDataProp_" + i] = i;
            data["bRegex_" + i] = false;
            data["bSearchable_" + i] = options.columns[i].searchable;
            data["bSortable_" + i] = options.columns[i].sortable;
        }

        return data;
    }
}
