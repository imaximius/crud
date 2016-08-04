(function() {

    angular
        .module('crud.datatable')
        .directive('wrCrudDatatable', crudDatatable);

    crudDatatable.$inject = ['RouteHelpers', 'datatableService', 'TranslateDatatablesService', '$rootScope', '$timeout', 'CrudDatatableDataParser', '$uibModal', '$filter'];

    function crudDatatable(helper, dataservice, translate, $rootScope, $timeout, parser, $uibModal, $filter) {
        var directive = {
            scope: {
                options: "=",
                customDatatableView: "="
            },
            templateUrl: helper.basepath('directives/crud-datatable.directive.html'),
            restrict: 'EA',
            link: link
        };
        return directive;

        function link(scope, element, attr) {
            var vm = this;

            vm.dt = {
                refresh: refresh
            };
            scope.busy = false;
            scope.serverOptions = {};
            scope.isThereAtListOneRequestForRefresh = false;
            scope.language = translate.translateTable();
            scope.refresh = refresh;
            scope.isLoaded = true;
            scope.dt = {
                selectAll: false,
                options: {
                    columns: [],
                    page: 1,
                    pagination: "10",
                    total: 0,
                    echo: 0
                }
            };
            scope.dt.customDatatableView = scope.customDatatableView || {};
            scope.onSelectAll = onSelectAll;
            scope.onSelectRow = onSelectRow;
            scope.limitData = [];
            scope.openModal = openModal;

            scope.options.build = build;
            scope.options.filter = filter;
            scope.options.reset = reset;
            scope.options.refresh = refresh;
            scope.options.getSelectedRows = getSelectedRows;

            // Implementation

            function activate(serverData) {
                if (serverData) {
                    scope.serverOptions = parser.parseServerOptions(serverData, scope.dt.customDatatableView.initOptions);
                    scope.dt.options.columns = getColumnsOptions(serverData.columns);
                    scope.dt.options.sortColumn = scope.customDatatableView && scope.customDatatableView.defaultSortColumn ?
                        scope.customDatatableView.defaultSortColumn :
                        undefined;
                    scope.dt.options.sortColumnAsc = true;
                    scope.dt.source = serverData.source;
                    scope.refresh();
                }
                $rootScope.$on("$translateChangeStart", function() {
                    scope.language = translate.translateTable();
                })
            }

            function onSelectAll() {
                $timeout(function() {
                    for (var i = 0; i < scope.rows.length; i++) {
                        scope.rows[i].checked = scope.dt.selectAll;
                    }
                    scope.options.events.onSelectRow(getSelectedRows());
                }, 0);
            }

            function onSelectRow() {
                $timeout(function() {
                    var isAllChecked = true;
                    for (var i = 0; i < scope.rows.length; i++) {
                        isAllChecked = isAllChecked && scope.rows[i].checked;
                    }
                    scope.dt.selectAll = isAllChecked;
                    scope.options.events.onSelectRow(getSelectedRows());
                    if (scope.$$phase) {
                        scope.$apply();
                    }
                }, 0);
            }

            function getSelectedRows() {
                var selectedRows = [];
                for (var i = 0; i < scope.rows.length; i++) {
                    if (scope.rows[i].checked) {
                        selectedRows.push(scope.rows[i].id);
                    }
                }
                return selectedRows;
            }

            function parseRowData(row, i) {
                var value = row;

                if (!!scope.dt.customDatatableView && !!scope.dt.customDatatableView.textLimit && i >= 0 && !!scope.dt.customDatatableView.textLimit[i]) {
                    if (value.length > scope.dt.customDatatableView.textLimit[i]) {
                        scope.limitData.push(value);
                        value = '<div class="limit-text-popover" ng-click="openModal(' + (scope.limitData.length - 1) + ')" uib-popover="{{limitData[' + (scope.limitData.length - 1) + '].substr(0, 500)+(limitData[' + (scope.limitData.length - 1) + '].length>500?\'...\':\'\')}}" popover-trigger="mouseenter">' + value.substr(0, scope.dt.customDatatableView.textLimit[i]) + '...' + '</div>';
                    }
                }
                if (!!scope.dt.customDatatableView && !!scope.dt.customDatatableView.icons && !!scope.dt.customDatatableView.icons[i]) {
                    if (!scope.dt.customDatatableView.icons[i][value]) {
                        value = 'undefined';
                    }
                    value = '<div class="text-center"><em class="fa fa-' + scope.dt.customDatatableView.icons[i][value].icon + ' text-' + scope.dt.customDatatableView.icons[i][value].textType + '" data-toggle="tooltip" title="' + scope.dt.customDatatableView.icons[i][value].tooltip + '"></em></div>';
                }

                return value;
            }

            function parseRow(rowData) {
                var row = {};

                if (scope.serverOptions.hasCheckboxes || scope.serverOptions.hasDropdowns) {
                    row.id = rowData.pop();
                }

                row.data = rowData;

                for (var i = 0; i < row.data.length; i++) {
                    row.data[i] = parseRowData(row.data[i], i);
                }

                if (scope.serverOptions.hasCheckboxes) {
                    row.data.unshift("<wr-crud-datatable-widgets-checkbox class='text-center' select-row='onSelectRow()' row='row.checked'>");
                }
                if (scope.serverOptions.hasDropdowns) {
                    row.data.push("<wr-crud-datatable-widgets-dropdown actions='actions' row='row.id'>");
                }

                row.hasCheckbox = scope.serverOptions.hasCheckboxes;
                row.hasDropdown = scope.serverOptions.hasDropdowns;

                return row;
            }

            function getColumnsOptions(columns) {
                var columnsOptions = [];
                for (var i = 0; i < columns.length; i++) {
                    columnsOptions.push({
                        sortable: !scope.customDatatableView || !scope.customDatatableView.notSortable || !scope.customDatatableView.notSortable[i],
                        searchable: true,
                        data: columns[i],
                        type: "text"
                    });
                }

                return columnsOptions;
            }

            function filter(data) {
                setActionBlocked(true);
                scope.dt.filterData = data;
                scope.refresh(true);
            }

            function reset() {
                setActionBlocked(true);
                scope.dt.filterData = undefined;
                scope.refresh(true);
            }

            function refresh(goToFirst) {

                scope.isLoaded = false;
                if (goToFirst) {
                    scope.dt.options.page = 1;
                }

                if (!scope.busy) {
                    scope.busy = true;
                    scope.dt.options.echo++;
                    dataservice.get(scope.dt.source, scope.dt.options, scope.dt.filterData).then(
                        function onSuccess(response) {
                            if (response.data.sEcho === scope.dt.options.echo) {
                                scope.dt.options.total = response.data.iTotalRecords;
                                scope.dt.pagesCount = Math.ceil(response.data.iTotalRecords / parseInt(scope.dt.options.pagination));
                                scope.rows = response.data.aaData.map(function(row) {
                                    return parseRow(row);
                                });
                                if (!scope.isThereAtListOneRequestForRefresh) {
                                    scope.isLoaded = true;
                                    setActionBlocked(false);
                                }
                                scope.options.events.onSelectRow(getSelectedRows());
                            }
                            scope.busy = false;
                        },
                        function onError(response) {
                            console.error(response);
                            if (!scope.isThereAtListOneRequestForRefresh) {
                                scope.isLoaded = true;
                                setActionBlocked(false);
                            }
                            scope.busy = false;
                        }
                    );
                } else if (!scope.isThereAtListOneRequestForRefresh) {
                    scope.isThereAtListOneRequestForRefresh = true;
                    $timeout(function() {
                        scope.isThereAtListOneRequestForRefresh = false;
                        refresh(true);
                    }, 300);
                }
            }

            /**
             * Block action buttons and add spiner
             *
             * @param isBlocked, actions
             */
            function setActionBlocked(isBlocked) {
                if (isBlocked) {
                    $("#filter").addClass("traditional whirl");
                } else {
                    $("#filter").removeClass("traditional whirl");
                }
            }

            /**
             * openModal - open modal for big data
             *
             * @param  {Number} contentIndex  index of limit data
             */
            function openModal(contentIndex) {
                var content = scope.limitData[contentIndex];
                if (typeof content == 'string' && /^[\],:{}\s]*$/.test(content.replace(/\\["\\\/bfnrtu]/g, '@').replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {
                    content = "<pre>" + $filter('json')(decodeJSON(content)) + "</pre>";
                }
                $uibModal.open({
                    template: content,
                    size: 'lg'
                });
            }

            /**
             * decodeJSON - decode JSON
             *
             * @param  {JSON} json   json for decode
             * @return {Object}      decoded JSON
             */
            function decodeJSON(json) {
                if (typeof json == 'string' && /^[\],:{}\s]*$/.test(json.replace(/\\["\\\/bfnrtu]/g, '@').replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {
                    return decodeJSON(JSON.parse(json));
                } else {
                    return json;
                }
            }

            function build(data) {
                activate(data);
            }
        }
    }

})();
