(function () {
    'use strict';

    angular
        .module('crud')
        .controller('CRUDController', CRUDController);

    CRUDController.$inject = ['$scope', '$state', 'transport', 'supervisor', 'ngDialog', 'SweetAlert', '$filter', 'toaster'];

    /**
     * CRUD Controller
     *
     * @constructor
     */
    function CRUDController($scope, $state, transport, supervisor, Dialog, SweetAlert, $filter, toaster) {
        /* jshint validthis: true */
        var vm = this,
            translate = $filter('translate'),
            parseFormat = $filter('date');

        $scope.icon = $state.$current.crud.icon;
        $scope.title = $state.$current.crud.title;
        $scope.customDatatableView = $state.$current.customDatatableView;

        vm.initSrc = $state.$current.initialize;
        vm.initLoader = true;

        vm.filter = filter();
        vm.toolbar = toolbar();
        vm.datatable = datatable();

        $scope.$on('panel-refresh',
            /**
             * Refresh filters
             *
             * @param {Object} event
             * @param {String} id
             */
            function (event, id) {
                $scope.$broadcast('removeSpinner', id);
                if (id !== 'filter')
                    return;
                vm.filter.actions.reset.call(vm.filter);
            }
        );

        activate();

        /**
         * Activation
         */
        function activate() {
            supervisor
                .loader('config')
                .load($state.$current.initialize)
                .onLoaded({
                    onSuccess: function (response) {
                        vm.initLoader = false;
                        // set filter.form data
                        vm.filter.build(response.filter);
                        // set toolbar data
                        vm.toolbar.build((response.action && response.action.top) ? response.action.top : []);
                        // set datatable data
                        vm.datatable.build(response.grid);

                        if(!$scope.$$phase){
                            $scope.$apply();
                        }
                    },
                    onError: function (response) {
                        vm.initLoader = false;
                        toaster.pop('error', 'Error', response.message);
                    }
                });
        }

        /**
         * Get filter manifest
         *
         * @returns {*}
         */
        function filter() {
            return {
                useFormTransformer: 'symfony',
                layout: 'grid',
                actionBar: [
                    {$$: 'search', icon: 'fa fa-search', title: 'admin.general.SEARCH', class: 'primary'},
                    {$$: 'reset', icon: 'fa fa-refresh', title: 'admin.general.RESET'}
                ],
                actions: {
                    search: search,
                    reset: reset
                }
            };

            function renderResultDate(date, format){
                return parseFormat(date.getTime(),format.replace(/Y+/g,"yyyy")
                                                   .replace(/m+/g,"MM")
                                                   .replace(/d+/g,"dd")
                                                   .replace(/H+/g,"HH")
                                                   .replace(/i+/g,"mm")
                                                   .replace(/s+/g,"ss"));
            }

            /**
             * Parce widgets multiple value choices
             * @param widgets
             * @param field
             * @returns {Array}
             */
            function getWidgetsEntityChoicesData(widgets, field) {
                var data = [];
                if (widgets.length) {
                    widgets.forEach(function(value, key) {
                        data[ key ] = (typeof value[field] !== "undefined") ? value[field] : (value.id) ? value.id : value;
                    });
                }

                return data;
            }

            /**
             * Parce widgets multiple value choice
             * @param widget
             * @param field
             * @returns {undefined}
             */
            function getWidgetsEntityChoiceData(widget, field) {
                var result = undefined;
                if (typeof field !== "undefined" && typeof widget[field] !== "undefined") {
                    result = widget[field];
                } else {
                    result = (typeof widget.id !== "undefined") ? widget.id : undefined;
                }
                return result;
            }

            /**
             * Parce Data Widgets
             * @param widgets
             * @returns {{}}
             */
            function getWidgetsData(widgets){
                var data = {};
                for(var i=0; i<widgets.length; i++){
                    if(widgets[i].type === "datetimerangepicker" && widgets[i].value.startDate){
                        data[widgets[i].options.fullName] = {};
                        data[widgets[i].options.fullName][widgets[i].options.leftDatetime.name] = renderResultDate(widgets[i].value.startDate.toDate(), widgets[i].options.date_format);
                        data[widgets[i].options.fullName][widgets[i].options.rightDatetime.name] = renderResultDate(widgets[i].value.endDate.toDate(), widgets[i].options.date_format);
                    } else if (widgets[i].type === "range") {
                        data[widgets[i].options.fullName] = {};
                        data[widgets[i].options.fullName][widgets[i].options.range_min.field_name] = widgets[i].value.min;
                        data[widgets[i].options.fullName][widgets[i].options.range_max.field_name] = widgets[i].value.max;
                    } else {
                        if(typeof widgets[i].value == "object" && widgets[i].type !== "datetimerangepicker"){
                            if (widgets[i].value.widgets) {
                                data[widgets[i].options.fullName] = widgets[i].value.value;
                                angular.extend(data, getWidgetsData(widgets[i].value.widgets))
                            } else if (widgets[i].value.choices) {
                                data[widgets[i].options.fullName] = getWidgetsEntityChoicesData(widgets[i].value.choices, widgets[i].options.field_value);
                            } else {
                                data[widgets[i].options.fullName] = getWidgetsEntityChoiceData(widgets[i].value, widgets[i].options.field_value);
                            }
                        } else {
                            data[widgets[i].options.fullName] = widgets[i].value;
                        }
                    }
                }
                return data;
            }

            function search(widgets) {
                var data = getWidgetsData(widgets);
                vm.datatable.filter(data);

                return data;

            }

            function reset() {
                vm.datatable.reset();
            }
        }

        /**
         * Get ToolBar manifest
         *
         * @returns {{
         *  useActionTransformer: String
         *  actions: {
         *      create: create,
         *      setState: setState,
         *      remove: remove
         *  }
         * }}
         */
        function toolbar() {
            return {
                useActionTransformer: 'symfony',
                actions: {
                    create: create,
                    edit: setState,
                    remove: remove
                }
            };

            /**
             * Create row
             *
             * @param data
             */
            function create(data) {
                Dialog.open({
                    template: 'crud/dialog.html',
                    className: 'crudDialog ngdialog-theme-default',
                    data: {
                        icon: data.view.dialogIcon ||  data.view.icon,
                        title: data.view.label,
                        datatable: vm.datatable,
                        form: {
                            source: data.source
                        }
                    }
                });
            }
        }

        /**
         * Create DataTable manifest
         *
         * @returns {{
         *  actions: {
         *      update: update,
         *      setState: setState,
         *      remove: remove
         *  }
         * }}
         */
        function datatable() {
            return {
                events: {
                    onRenderRows: refreshToolBar,
                    onSelectRow: refreshToolBar
                },
                actions: {
                    update: update,
                    setState: setState,
                    remove: remove,
                    show: show
                }
            };

            /**
             * Refresh ToolBar
             */
            function refreshToolBar(selectedRows) {
                vm.toolbar.refreshButtonsAccessibility(selectedRows.length > 0);
            }

            /**
             * Edit row data
             *
             * @param data
             */
            function update(data) {
                Dialog.open({
                    template: 'crud/dialog.html',
                    className: 'crudDialog ngdialog-theme-default',
                    data: {
                        icon: data.view.icon,
                        title: data.view.label,
                        datatable: vm.datatable,
                        form: {
                            source: data.form.source + '/' + data.row.id
                        }
                    }
                });
            }

            /**
             * View row data
             *
             * @param data
             */
            function show(data) {
                Dialog.open({
                    template: 'crud/show.html',
                    className: 'crudDialog ngdialog-theme-default',
                    data: {
                        icon: data.view.icon,
                        title: data.view.label,
                        datatable: vm.datatable,
                        form: {
                            source: data.form.source + '/' + data.row.id
                        }
                    }
                });
            }
        }

        /**
         * Set row enable|disable state
         *
         * @param data
         */
        function setState(data) {
            var idx = [];
            if (data.hasOwnProperty('row'))
                idx.push(data.row.id);

            if (idx.length !== 1)
                idx = vm.datatable.getSelectedRows();
            transport.send({
                url: data.source,
                method: 'POST',
                data: {
                    data: idx
                },
                notify: true
            }, function () {
                vm.datatable.refresh();
            });
        }

        /**
         * Remove row
         *
         * @param {{
         *  row: Object,
         *  confirm: {
         *      title: String,
         *      actions: {
         *          confirm: String
         *      },
         *      buttons: {
         *          confirm: String,
         *          cancel: String
         *      }
         *  }
         * }} data
         */
        function remove(data) {
            var idx = [];

            if (data.hasOwnProperty('row'))
                idx.push(data.row.id);

            if (idx.length !== 1)
                idx = vm.datatable.getSelectedRows();

            SweetAlert.swal({
                title: translate(data.confirm.title),
                type: 'warning',
                showCancelButton: true,
                cancelButtonText: translate(data.confirm.buttons.cancel),
                confirmButtonText: translate(data.confirm.buttons.confirm),
                confirmButtonColor: '#dd6b55'
            }, function (confirmed) {
                if (!confirmed)
                    return;
                transport.send({
                    url: data.source,
                    method: 'POST',
                    data: {
                        data: idx
                    },
                    notify: true
                }, function () {
                    vm.datatable.refresh();
                });
            });
        }
    }

})();
