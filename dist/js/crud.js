(function(){
    'use strict';

    angular
        .module('crud', [
            'ngDialog',
            'crud.form',
            'crud.toolbar',
            'crud.datatable',
            'ui.bootstrap',
            'crud.filter',
            'crud.dialog'
        ]);

})();

(function(){
    'use strict';

    angular
        .module('crud.datatable', [
            'crud.datatable.core',
            'crud.datatable.widgets'
        ]);

})();

(function(){
    'use strict';

    angular
        .module('crud.dialog', []);

})();

(function(){
    'use strict';

    angular
        .module('crud.filter', []);

})();

(function(){
    'use strict';

    angular
        .module('crud.form', ['crud.widgets']);

})();

(function(){
    'use strict';

    angular
        .module('crud.toolbar', []);

})();

(function(){
    'use strict';

    angular
        .module('crud.widgets', [
            'crud.widgets.dynamic',

            'crud.widgets.text',
            'crud.widgets.choice',
            'crud.widgets.multichoice',
            'crud.widgets.checkbox',
            'crud.widgets.hidden',
            'crud.widgets.subform',
            'crud.widgets.ajaxdata',
            'crud.widgets.range',
            'crud.widgets.jsonview'
        ]);

})();

(function(){
    'use strict';

    angular
        .module('crud.datatable.core', [
            'crud.datatable.header',
            'crud.datatable.row',
            'crud.datatable.search',
            'crud.datatable.pages',
            'crud.datatable.info',
            'crud.datatable.pagination',
            'crud.widgets.compileit'
        ]);

})();

(function(){
    'use strict';

    angular
        .module('crud.datatable.widgets', [
            'crud.datatable.widgets.checkbox',
            'crud.datatable.widgets.dropdown'
        ]);

})();

(function(){
    'use strict';

    angular
        .module('crud.widgets.ajaxdata', ['crud.widgets']);

})();

(function(){
    'use strict';

    angular
        .module('crud.widgets.checkbox', []);

})();

(function(){
    'use strict';

    angular
        .module('crud.widgets.choice', []);

})();

(function(){
    'use strict';

    angular
        .module('crud.widgets.compileit', []);

})();

(function(){
    'use strict';

    angular
        .module('crud.widgets.datetimerangepicker', []);

})();

(function(){
    'use strict';

    angular
        .module('crud.widgets.dynamic', []);

})();

(function(){
    'use strict';

    angular
        .module('crud.widgets.hidden', []);

})();

(function(){
    'use strict';

    angular
        .module('crud.widgets.jsonview', []);

})();

(function(){
    'use strict';

    angular
        .module('crud.widgets.multichoice', []);

})();

(function(){
    'use strict';

    angular
        .module('crud.widgets.range', ['ui-rangeSlider']);

})();

(function(){
    'use strict';

    angular
        .module('crud.widgets.subform', ['crud.widgets']);

})();

(function(){
    'use strict';

    angular
        .module('crud.widgets.text', []);

})();

(function(){
    'use strict';

    angular
        .module('crud.datatable.header', []);

})();

(function(){
    'use strict';

    angular
        .module('crud.datatable.info', []);

})();

(function(){
    'use strict';

    angular
        .module('crud.datatable.pages', []);

})();

(function(){
    'use strict';

    angular
        .module('crud.datatable.pagination', []);

})();

(function(){
    'use strict';

    angular
        .module('crud.datatable.row', []);

})();

(function(){
    'use strict';

    angular
        .module('crud.datatable.search', []);

})();

(function(){
    'use strict';

    angular
        .module('crud.datatable.widgets.checkbox', []);

})();

(function(){
    'use strict';

    angular
        .module('crud.datatable.widgets.dropdown', ['ui.bootstrap']);

})();

(function () {
    'use strict';

    angular
        .module('crud')
        .config(['$httpProvider', function ($httpProvider) {

            $httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

        }]);

})();
(function () {
    'use strict';

    angular
        .module('crud')
        .factory('EventsHandler', EventsHandlerFactory);

    /**
     * Events Handler Factory
     *
     * @returns {EventsHandler}
     * @constructor
     */
    function EventsHandlerFactory() {
        Events.prototype = Object.create(Array.prototype);
        return EventsHandler;
    }

    /**
     * Events Handler
     *
     * @param {Object<String, Function|Array<Function>>} events
     * @returns {{event: get}}
     * @constructor
     */
    function EventsHandler(events) {
        var $events,
            $this = angular.extend(this, {
                event: get
            });

        activate();

        return $this;

        /**
         * Events Handler Activation
         */
        function activate() {
            $events = {};
            Object.keys(events)
                .forEach(function (name) {
                    if (!(events[name] instanceof Array))
                        events[name] = [events[name]];
                    events[name].forEach(function (event) {
                        set(name, event);
                    });
                });
        }

        /**
         * Get array of events by name
         *
         * @param {String} name
         * @returns {Events|undefined}
         * @public
         */
        function get(name) {
            if (!$events.hasOwnProperty(name))
                $events[name] = new Events();
            return $events[name];
        }

        /**
         * Append event to array of events by name
         *
         * @param {String} name
         * @param {Function} event
         * @returns {EventsHandler}
         * @private
         */
        function set(name, event) {
            if (!$events.hasOwnProperty(name))
                $events[name] = new Events();
            $events[name].push(event);
            return $this;
        }
    }

    /**
     * Events
     *
     * @returns {{
     *  invoke: invoke
     * }}
     * @constructor
     */
    function Events() {
        /* jshint validthis: true */
        var $this = angular.extend(this, {
            invoke: invoke
        });

        return $this;

        /**
         * Invoke each event which was registered in this array of events
         *
         * @param {Object} [thisArg]
         * @param {...*} [args]
         */
        function invoke(thisArg, args) {
            args = arguments;
            $this.forEach(
                function (event) {
                    event.apply(thisArg, this);
                },
                Object.keys(args)
                    .filter(function (i) {
                        return thisArg !== args[i];
                    })
                    .map(function (i) {
                        return args[i];
                    })
            );
        }
    }

})();
(function () {
    'use strict';

    angular
        .module('crud')
        .factory('CRUDLoader', CRUDLoader);

    CRUDLoader.$inject = ['$http'];

    /**
     * Interface of CRUD Loader
     *
     * @param $http
     * @returns {Function}
     * @constructor
     */
    function CRUDLoader($http) {
        return function () {
            /* jshint validthis: true,
             eqeqeq: false */

            /** @typedef {Object} */
            var promise;

            return {
                load: load,
                onLoaded: onLoaded,
                clearPromise: clearPromise
            };

            /**
             * Load data by url
             *
             * @param {String} url
             * @return {{
             *     load: Function,
             *     onLoaded: Function,
             *     clearPromise: Function
             * }}
             */
            function load(url) {
                promise = $http({
                    url: url,
                    method: 'GET'
                });
                return this;
            }

            /**
             * Event of data loading
             *
             * @param {{
             *      onSuccess: <Function>,
             *      onError: <Function>
             * }} triggers
             * @returns {Object}
             */
            function onLoaded(triggers) {
                if (
                    triggers instanceof Object &&
                    promise !== undefined
                ) {
                    promise.then.apply(promise, ['onSuccess', 'onError']
                        .map(function (key) {
                            return triggers.hasOwnProperty(key) ?
                                function (r) {
                                    triggers[key](r.data, r.status, r);
                                } : undefined;
                        })
                    );
                }

                return this;
            }

            /**
             * Clear loader promise
             */
            function clearPromise() {
                promise = undefined;
            }
        };
    }

})();
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

(function () {
    'use strict';

    angular
        .module('crud')
        .controller('CRUDDialogController', CRUDDialogController);

    CRUDDialogController.$inject = ['$scope', 'transport', 'supervisor', '$filter', 'toaster'];

    function CRUDDialogController($scope, transport, supervisor, $filter, toaster) {
        /* jshint -W004, validthis: true */
        var vm = this,
            dt;

        vm.isLoaded = false;
        vm.icon = 'fa fa-file-o';
        vm.title = 'Dialog';
        vm.errors = [];
        vm.subforms = [];

        vm.form = {
            useFormTransformer: 'symfony',
            actionBar: [
                {$$: 'save', icon: 'fa fa-check', title: 'admin.general.SAVE', class: 'primary'},
                {$$: 'cancel', icon: 'fa fa-minus-circle', title: 'admin.general.CANCEL'}
            ],
            actions: {
                save: function (widgets, action, method) {
                    var data = {};
                    $scope.actionBlock = true;
                    for(var i=0; i<widgets.length; i++){
                        if(widgets[i].type === "subform"){
                            data[widgets[i].name] = widgets[i].value.value;
                            if(widgets[i].value.widgets){
                                if(!data.subforms)
                                    data.subforms = {};
                                data.subforms[widgets[i].name] = widgets[i].value.widgets.map(function(widget){
                                    return {
                                        id: widget.name,
                                        value: widget.value
                                    }
                                })
                            }
                        } else if(widgets[i].type === "multichoice"){
                            data[widgets[i].name] = widgets[i].value.choices;
                        } else {
                            data[widgets[i].name] = widgets[i].value;
                        }
                    }

                    transport.send({
                        url: action,
                        method: method,
                        data: data,
                        notify: {
                            skipIf: 'error'
                        }
                    }, function () {
                        $scope.actionBlock = false;
                        dt.refresh();
                        $scope.closeThisDialog();
                    }, function (data) {
                        if(data.errorFields){
                            vm.form.showErrorFields(data.errorFields);
                        }
                        $scope.actionBlock = false;
                        vm.errors = data.message.split(/\n/);
                    });
                },
                cancel: function () {
                    $scope.closeThisDialog();
                }
            }
        };

        activate();

        /**
         * Controller Activation
         */
        function activate() {
            if (
                !$scope.$parent.hasOwnProperty('ngDialogData') || !($scope.$parent.ngDialogData instanceof Object)
            )
                throw console.error('[ERROR]: Controller cannot access required initialisation data.');

            var $data = $scope.$parent.ngDialogData;

            ['icon', 'title']
                .forEach(function (key) {
                    if (!$data.hasOwnProperty(key))
                        return;
                    vm[key] = $data[key];
                });

            if ($data.hasOwnProperty('datatable'))
                activateDataTable($data.datatable);

            if ($data.hasOwnProperty('form'))
                activateForm($data.form);
        }

        /**
         * Form Activation
         *
         * @param {{
         *  source: String
         * }} data
         */
        function activateForm(data) {
            if (!(data instanceof Object) || !data.hasOwnProperty('source'))
                return;

            supervisor
                .loader('form')
                .load(data.source)
                .onLoaded({
                    onSuccess: function (response) {
                        vm.isLoaded = true;
                        vm.form.build(response);
                    },
                    onError: function (response) {
                        vm.isLoaded = true;
                        $scope.closeThisDialog();
                        toaster.pop('error', 'Error', response.message);
                    }
                });
        }

        /**
         * DataTable Activation
         *
         * @param {Object} data
         */
        function activateDataTable(data) {
            dt = data;
        }
    }

})();

(function () {
    'use strict';

    angular
        .module('crud')
        .controller('CRUDShowDialogController', CRUDShowDialogController);

    CRUDShowDialogController.$inject = ['$scope', 'transport', 'supervisor', '$filter', 'toaster'];

    function CRUDShowDialogController($scope, transport, supervisor, $filter, toaster) {
        /* jshint -W004, validthis: true */
        var vm = this,
            dt;

        vm.isLoaded = false;
        vm.icon = 'fa fa-file-o';
        vm.title = 'Dialog';
        vm.errors = [];

        vm.form = {
            useFormTransformer: 'symfony',
            actionBar: [
                {$$: 'cancel', icon: 'fa fa-minus-circle', title: 'admin.general.CANCEL'}
            ],
            actions: {
                cancel: function () {
                    $scope.closeThisDialog();
                }
            }
        };

        activate();

        /**
         * Controller Activation
         */
        function activate() {
            if (
                !$scope.$parent.hasOwnProperty('ngDialogData') || !($scope.$parent.ngDialogData instanceof Object)
            )
                throw console.error('[ERROR]: Controller cannot access required initialisation data.');

            var $data = $scope.$parent.ngDialogData;

            ['icon', 'title']
                .forEach(function (key) {
                    if (!$data.hasOwnProperty(key))
                        return;
                    vm[key] = $data[key];
                });

            if ($data.hasOwnProperty('datatable'))
                activateDataTable($data.datatable);

            if ($data.hasOwnProperty('form'))
                activateForm($data.form);
        }

        /**
         * Form Activation
         *
         * @param {{
         *  source: String
         * }} data
         */
        function activateForm(data) {
            if (!(data instanceof Object) || !data.hasOwnProperty('source'))
                return;

            supervisor
                .loader('form')
                .load(data.source)
                .onLoaded({
                    onSuccess: function (response) {
                        vm.isLoaded = true;
                        vm.form.build(response);
                    },
                    onError: function (response) {
                        vm.isLoaded = true;
                        $scope.closeThisDialog();
                        toaster.pop('error', 'Error', response.message);
                    }
                });
        }

        /**
         * DataTable Activation
         *
         * @param {Object} data
         */
        function activateDataTable(data) {
            dt = data;
        }
    }

})();
(function () {
    'use strict';

    angular
        .module('crud')
        .service('tf.action', transformer);

    /**
     * Action Transformer Service
     *
     * @returns {Function}
     */
    function transformer() {
        var transformers = {
            symfony: new SymfonyActionTransformer()
        };

        return function (name) {
            return transformers[name];
        };

        /**
         * Symfony Action Transformer
         *
         * @returns {*}
         * @constructor
         */
        function SymfonyActionTransformer() {
            var $helper,
                $this = angular.extend(this, {
                    transform: transform
                });

            return activate();

            /**
             * Activation
             *
             * @returns {*}
             */
            function activate() {
                $helper = helper();
                return $this;
            }

            /**
             * Get Transformer Helper
             *
             * @returns {{
             *  name: getName,
             *  confirm: getConfirm,
             *  form: getForm,
             *  source: getSource
             * }}
             */
            function helper() {
                return {
                    name: getName,
                    confirm: getConfirm,
                    form: getForm,
                    view: getView,
                    source: getSource
                };

                function getName(data) {
                    var fnMap = {
                        editRow: 'setState',
                        deleteRow: 'remove'
                    };

                    if (fnMap.hasOwnProperty(data.callback))
                        return fnMap[data.callback];

                    return data.callback;
                }

                /**
                 * Get confirm
                 *
                 * @param {{
                 *  resource: String
                 *  confirm: {
                 *      title: String,
                 *      yes: Object,
                 *      no: Object
                 *  }
                 * }} data
                 * @returns {undefined|{
                 *  title: String,
                 *  buttons: {
                 *      confirm: String,
                 *      cancel: String
                 *  }
                 * }}
                 */
                function getConfirm(data) {
                    if (!data.hasOwnProperty('confirm'))
                        return;
                    return {
                        title: data.confirm.title,
                        buttons: {
                            confirm: data.confirm.yes.title,
                            cancel: data.confirm.no.title
                        }
                    };
                }

                function getForm(data) {
                    if (!data.hasOwnProperty('form'))
                        return;
                    return {
                        source: data.form
                    };
                }

                function getSource(data) {
                    if (!data.hasOwnProperty('resource'))
                        return;
                    return data.resource;
                }

                function getView(data) {
                    if (!data.hasOwnProperty('display'))
                        return;
                    return data.display;
                }
            }

            /**
             * Transform data
             *
             * @param {Object} data
             * @returns {Object}
             */
            function transform(data) {
                return (function () {
                    var $this = this;
                    return Object
                            .keys(arguments)
                            .forEach(function (i) {
                                if (this[i][Object.keys(this[i])[0]] === undefined)
                                    return;
                                angular.extend($this, this[i]);
                            }, arguments) || $this;
                }).apply({
                    name: $helper.name(data)
                }, [
                    {confirm: $helper.confirm(data)},
                    {form: $helper.form(data)},
                    {source: $helper.source(data)},
                    {view: $helper.view(data)}
                ]);
            }
        }
    }

})();

(function () {
    'use strict';

    angular
        .module('crud.datatable')
        .service('CrudDatatableDataParser', DataParser);

    DataParser.$inject = [];

    /**
     * Data Parser
     *
     * @constructor
     */
    function DataParser($http, toaster) {
        var vm = this;

        vm.parseAction = parseAction;
        vm.parseServerOptions = parseServerOptions;

        // Implementation

        /**
        * Parse Actions
        *
        * @param {Array<Object>} bar
        * @param {Object} barActions
        * @returns {Array<Object|{
        *  class: String
        *  name: String
        *  icon: String
        *  title: String
        *  action: function
        * }>}
        */
        function parseAction(data, rowId){
            var action = {};
            action.callback = data.callback;

            switch (data.callback) {
                case "update":
                    action.callback = 'update';
                    action.data = {
                        view: data.display,
                        form: {
                            source: data.form
                        },
                        row: {
                            id: rowId
                        }
                    }
                    break;
                case "editRow":
                    action.callback = 'setState';
                    action.data = {
                        view: data.display,
                        form: {
                            source: data.form
                        },
                        source: data.resource,
                        row: {
                            id: rowId
                        }
                    };
                    break;
                case "deleteRow":
                    action.callback = 'remove';
                    action.data = {
                        view: data.display,
                        confirm:{
                            buttons:{
                                cancel: data.confirm.no.title,
                                confirm: data.confirm.yes.title,
                            },
                            title: data.confirm.title
                        },
                        source: data.resource,
                        row: {
                            id: rowId
                        }
                    };
                    break;
                case "show":
                    action.callback = 'show';
                    action.data = {
                        view: data.display,
                        form: {
                            source: data.form
                        },
                        row: {
                            id: rowId
                        }
                    }
                    break;
            }

            return action;
        }

        /**
         * Parse Server Options
         *
         * @param {Object} serverData
         * @returns Object{
        *  searching: Boolean
        *  paging: Boolean
        *  hasCheckboxes: Boolean
        *  hasDropdowns: Boolean
        * }
         */
        function parseServerOptions(serverData, initOptions){
            var options = {
                searching: initOptions && initOptions.hasOwnProperty("searching")
                    ? initOptions.searching
                    : true,
                paging:initOptions && initOptions.hasOwnProperty("paging")
                    ? initOptions.paging
                    : true,
                hasCheckboxes: initOptions && initOptions.hasOwnProperty("hasCheckboxes")
                    ? initOptions.hasCheckboxes
                    : true,
                hasDropdowns: initOptions && initOptions.hasOwnProperty("hasDropdowns")
                    ? initOptions.hasDropdowns
                    : true
            };
            if(serverData.hasOwnProperty('searching')) {
                options.searching = serverData.searching
            }
            if(serverData.hasOwnProperty('paging')) {
                options.paging = serverData.paging
            }
            if(serverData.hasOwnProperty('hasCheckboxes')) {
                options.hasCheckboxes = serverData.hasCheckboxes
            }
            if(serverData.hasOwnProperty('hasDropdowns')) {
                options.hasDropdowns = serverData.hasDropdowns
            }

            return options;
        }

    }

})();

(function () {
    'use strict';

    angular
        .module('crud.filter')
        .service('CrudFormDataParser', DataParser);

    DataParser.$inject = [];

    /**
     * Data Parser
     *
     * @constructor
     */
    function DataParser($http, toaster) {
        var vm = this;

        vm.parseActions = parseActions;
        vm.parseName = parseName;
        vm.parseOptions = parseOptions;
        vm.parseWidgets = parseWidgets;
        vm.parseSubformWidget = parseSubformWidget;

        // Implementation

        /**
        * Parse Subform Widget
        *
        * @param {Object} data
        * @returns {Object|{
        *  type: String
        *  name: String
        *  options: Object
        *  value: String|Object|Number|Array
        * }}
        */
        function parseSubformWidget(data, formName){
            var widget = {
                type: data.type || "text",
                name: data.id,
                options: {
                    translateLabel: data.name || data.label
                },
                value: data.value
            };

            widget.options = angular.extend(widget.options, data.attr);

            if(!widget.options.hasOwnProperty("editable")){
                widget.options.editable = true;
            }
            if(!widget.options.hasOwnProperty("fullName") && !!formName){
                widget.options.fullName = formName+"["+widget.name+"]";
            }
            return widget;
        }

        /**
        * Parse Actions
        *
        * @param {Array<Object>} bar
        * @param {Object} barActions
        * @returns {Array<Object|{
        *  class: String
        *  name: String
        *  icon: String
        *  title: String
        *  action: function
        * }>}
        */
        function parseActions(bar, barActions){
            var actions = [];

            for(var i=0; i<bar.length; i++){
                actions.push({
                    name: bar[i].$$,
                    class: bar[i].class,
                    icon: bar[i].icon,
                    title: bar[i].title,
                    action: barActions[bar[i].$$]
                });
            }

            return actions;
        }

        /**
        * Parse Name
        *
        * @param {Object} serverOptions
        * @returns {String}
        */
        function parseName(serverOptions){
            return serverOptions.name + "_form";
        }

        /**
        * Parse Options
        *
        * @param {Object} serverOptions
        * @returns {Object}
        */
        function parseOptions(serverOptions){
            return serverOptions.attr;
        }

        /**
         * Prce widget value
         *
         * @param values
         * @param field
         * @returns {undefined}
         */
        function getWidgetValue(values, field) {
            return values && values.hasOwnProperty(field.replace(/([A-Z])/g, '_$1').toLowerCase())
                ? values[field.replace(/([A-Z])/g, '_$1').toLowerCase()]
                : undefined;
        }

        /**
         * Validate item
         *
         * @param item
         * @returns {boolean}
         */
        function isObject(item) {
            return (typeof item == 'object');
        }

        /**
         * Validate type choice
         *
         * @param prefixes
         * @returns {boolean}
         */
        function isEntityType(prefixes)
        {
            if (prefixes.length) {
                for (var i = 0; i < prefixes.length; i++) {
                    if (prefixes[i] == "entity") {
                        return true;
                    }
                }
            }

            return false;
        }

        /**
        * Parse Widgets
        *
        * @param {Object} serverChildren
        * @param {Object} values
        * @returns {Array<Object|{
        *  type: String
        *  name: String
        *  options: Object
        *  value: String|Object|Number|Array
        * }>}
        */
        function parseWidgets(serverChildren, values, formName){
            var widgets = [];
            var options = {};
            for (var key in serverChildren){
                var widget = {
                    name: serverChildren[key].vars.name,
                    type: serverChildren[key].vars.block_prefixes[1],
                    entity: isEntityType(serverChildren[key].vars.block_prefixes),
                    value: getWidgetValue(values, serverChildren[key].vars.name)
                };
                switch (serverChildren[key].vars.block_prefixes[1]) {
                    case "text":
                        widget.options = serverChildren[key].vars.attr;
                        if(widget.options.isJson){
                            widget.type = "jsonview";
                        }
                        break;
                    case "choice":
                        widget.options = serverChildren[key].vars.attr;
                        widget.type = serverChildren[key].vars.multiple
                            ? "multichoice"
                            : (!!serverChildren[key].vars.attr.isSmartSelectedForm
                                ? "subform"
                                : (!!serverChildren[key].vars.attr.isSmartSelectedDymamicLoaderValues
                                    ? 'ajaxdata'
                                    : "choice"
                            )
                        );

                        if((widget.type === "subform" || widget.type === "ajaxdata") && widget.value){
                            widget.options.formId = widget.value.id;
                            widget.value = {value: widget.value.id, widgets: []}
                        } else if(serverChildren[key].vars.multiple && widget.value){
                            var choices = [];
                            if (typeof widget.value !== "undefined" && typeof widget.value === 'object') {
                                Object.keys(widget.value).forEach(function(choiceKey) {
                                    if (typeof widget.value[choiceKey][widget.options.field_value] !== "undefined") {
                                        choices[choiceKey] = {'id': widget.value[choiceKey].id, 'label': widget.value[choiceKey][widget.options.field_value]};
                                    } else {
                                        choices[choiceKey] = {'id': widget.value[choiceKey].id, 'label': widget.value[choiceKey].label};
                                    }
                                });
                            }

                            widget.value = {choices: choices};
                        } else if(typeof widget.value === 'object'){
                            var value = undefined;
                            if (typeof widget.value !== "undefined" && widget.value.length) {
                                Object.keys(widget.value).forEach(function(choiceKey) {
                                    if (typeof widget.value[choiceKey] !== "undefined"
                                        && widget.type == "choice") {
                                        if (typeof widget.value[choiceKey][widget.options.field_value] !== "undefined") {
                                            value = widget.value[choiceKey][widget.options.field_value];
                                        } else {
                                            value = widget.value[choiceKey].id;
                                        }
                                    }
                                });
                            } else {
                                if (typeof widget.value[widget.options.field_value] !== "undefined") {
                                    value = widget.value[widget.options.field_value];
                                } else {
                                    value = widget.value.id;
                                }
                            }

                            widget.value = value;
                        }
                        widget.options.choices = [];
                        Object.keys(serverChildren[key].vars.choices).forEach(function(choiceKey){
                            widget.options.choices.push({
                                id: isObject(serverChildren[key].vars.choices[choiceKey].data) ? serverChildren[key].vars.choices[choiceKey].data.id : serverChildren[key].vars.choices[choiceKey].data,
                                label: serverChildren[key].vars.choices[choiceKey].label
                            });
                        });
                        break;
                    case "filter_date_range":
                    case "filter_datetime_range":
                        widget.options = serverChildren[key].children.left_datetime.vars.attr;
                        widget.type = "datetimerangepicker";
                        widget.options.leftDatetime = {
                            name: serverChildren[key].children.left_datetime.vars.name
                        };
                        widget.options.rightDatetime = {
                            name: serverChildren[key].children.right_datetime.vars.name
                        };
                        break;
                    default:
                        widget.options = serverChildren[key].vars.attr;
                }

                if(!widget.options.hasOwnProperty("editable")){
                    widget.options.editable = true;
                }
                widget.options.fullName = serverChildren[key].vars.full_name;
                if(formName){
                    widget.options.formName = formName;
                }
                if(!widget.options.placeholder){
                    widget.options.placeholder = serverChildren[key].vars.placeholder;
                }

                widgets.push(widget);
            }

            return widgets;
        }

    }

})();

(function () {
    'use strict';

    angular
        .module('crud.toolbar')
        .service('CrudToolbarDataParser', DataParser);

    DataParser.$inject = [];

    /**
     * Data Parser
     *
     * @constructor
     */
    function DataParser() {
        var vm = this;

        vm.parseGroups = parseGroups;

        // Implementation

        /**
        * Parse Subform Widget
        *
        * @param {Object} data
        * @returns {Object|{
        *  type: String
        *  name: String
        *  options: Object
        *  value: String|Object|Number|Array
        * }}
        */
        function parseGroups(data){
            return Object.keys(data)
                        .reverse()
                        .map(function (key) {
                            return {
                                name: key,
                                buttons: parseButtons(data[key])
                            };
                        })
        }

        function parseButtons(data){
            var buttons = [];

            buttons = data.map(function(button){
                var callback = "";
                switch (button.callback) {
                    case "deleteRow":
                        callback = "remove";
                        break;
                    case "editRow":
                        callback = "edit";
                        break;
                    case "create":
                        callback = "create";
                        break;
                    default:
                }

                var confirm = {};
                if(button.confirm){
                    if(button.confirm.title){
                        confirm.title = button.confirm.title;
                    }
                    confirm.buttons = {};
                    if(button.confirm.no){
                        confirm.buttons[button.confirm.no.class] = button.confirm.no.title;
                    }
                    if(button.confirm.yes){
                        confirm.buttons[button.confirm.yes.class] = button.confirm.yes.title;
                    }
                }

                return {
                    callback: callback,
                    view: button.display,
                    source: button.form || button.resource,
                    confirm: confirm
                }
            });

            return buttons;
        }
    }

})();

(function () {
    /* jshint validthis: true */
    'use strict';

    angular
        .module('crud')
        .service('supervisor', Supervisor);

    Supervisor.$inject = ['CRUDLoader'];

    /**
     *
     * @param CRUDLoader
     * @returns {{
     *      loader: loader
     * }}
     * @constructor
     */
    function Supervisor(CRUDLoader) {
        var register = new Register();

        return {
            loader: loader
        };

        /**
         * Set|Get sub-register in|from register
         *
         * @param id
         * @returns {*}
         */
        function subRegister(id) {
            if (register.get(id) === undefined)
                register.set(id, new Register());

            return register.get(id);
        }

        /**
         * Set|Get loader by id
         *
         * @param {String} id
         * @returns {CRUDLoader}
         */
        function loader(id) {
            if (subRegister('loader').get(id) === undefined)
                subRegister('loader').set(id, new CRUDLoader());

            return subRegister('loader').get(id);
        }
    }

    /**
     * CRUD Supervisor Register
     *
     * @returns {{
     *      set: set,
     *      get: get
     * }}
     * @constructor
     */
    function Register() {
        var $ = {},
            srv = {
                set: set,
                get: get
            };

        return srv;

        /**
         * Set value into container of register
         *
         * @param id
         * @param value
         * @returns {{
         *      set: set,
         *      get: get
         * }}
         */
        function set(id, value) {
            $[id] = value;
            return srv;
        }

        /**
         * Get value from container of register
         *
         * @param {Number|String} id
         * @returns {*}
         */
        function get(id) {
            return $[id];
        }
    }

})();
(function () {
    'use strict';

    angular
        .module('crud')
        .service('transport', DataTransport);

    DataTransport.$inject = ['$http', 'toaster'];

    /**
     * Data Transport Service
     *
     * @constructor
     */
    function DataTransport($http, toaster) {
        /* jshint validthis: true */
        return angular.extend(this, {
            send: send
        });

        /**
         * Send Data to Server
         *
         * @param {Object|{
         *  data: Object
         *  contentType: String
         *  notify: Boolean|String|Object
         * }} config
         * @param {Function} onSuccess
         * @param {Function} onError
         */
        function send(config, onSuccess, onError) {
            $http(angular.extend(config,
                (function (def) {
                    if (!config.hasOwnProperty('data'))
                        return def;
                    return $.param(config.data);
                })({}),
                (function (def) {
                    if (!config.hasOwnProperty('contentType') || config.contentType !== 'form')
                        return def;
                    return {
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        }
                    };
                })({})
            )).then(
                function (response) {
                    var data = response.data;

                    if (config.hasOwnProperty('notify'))
                        notify(config.notify, 'success', data);

                    if (typeof onSuccess !== 'function')
                        return;

                    onSuccess(data);
                },
                function (response) {
                    var data = response.data;
                    
                    if (config.hasOwnProperty('notify'))
                        notify(config.notify, 'error', data);

                    if (typeof onError !== 'function')
                        return;

                    onError(response.data);
                }
            );
        }

        /**
         * Notify about transporting data
         *
         * @param ntf
         * @param evn
         * @param rsp
         * @returns {*}
         */
        function notify(ntf, evn, rsp) {
            if (!(ntf instanceof Object)) {
                if (['boolean'].indexOf(typeof ntf) === -1)
                    return;

                if (typeof ntf === 'boolean')
                    ntf = {};
            }

            var evnMap = {
                success: {title: 'Success'},
                error: {title: 'Error'}
            };

            return activate();

            /**
             * Activation
             */
            function activate() {
                if (!ntf.hasOwnProperty('message'))
                    ntf.message = '=';

                if (ntf.hasOwnProperty('skipIf') && ntf.skipIf.constructor !== Array)
                    ntf.skipIf = [ntf.skipIf];

                if (!isAccessible())
                    return;

                toaster.pop(evn, evnMap[evn].title, getMessage(ntf.message));
            }

            /**
             * Check is notify accessible
             *
             * @returns {boolean}
             */
            function isAccessible() {
                return evnMap.hasOwnProperty(evn) && !(ntf.hasOwnProperty('skipIf') && ntf.skipIf.indexOf(evn) !== -1);
            }

            /**
             * Get message
             *
             * @param {String|Object} msg
             * @returns {*}
             */
            function getMessage(msg) {
                if (msg instanceof Object && msg.hasOwnProperty(evn))
                    return getMessage(msg[evn]);
                return rsp[(function (m) {
                    if (m && m[1] !== undefined)
                        return m[1];
                    return 'message';
                })(/=?([A-z0-9-_]+)?/.exec(msg))];
            }
        }
    }

})();

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

(function(){

    angular
        .module('crud.dialog')
        .directive('wrCrudDialog', crudDialog);

    crudDialog.$inject = ['RouteHelpers', 'CrudFormDataParser'];

    function crudDialog(helper, parser) {
        var directive = {
            link: link,
            scope: {
                options: "=",
                src: "=",
                actionBlock: "="
            },
            templateUrl: helper.basepath('directives/crud-dialog.directive.html'),
            restrict: 'EA'
        };
        return directive;

        function link(scope, element, attrs) {
            scope.form = {};
            scope.serverSideData = undefined;

            scope.save = save;
            scope.cancel = cancel;

            scope.options.build = build;
            scope.options.showErrorFields = showErrorFields;
            scope.visible = true;

            activate();

            // Implementation
            function activate(){

                if(scope.serverSideData){
                    scope.action = scope.serverSideData.vars.action;
                    scope.method = scope.serverSideData.vars.method;
                    scope.form.widgets = parser.parseWidgets(scope.serverSideData.children, scope.serverSideData.vars.value, scope.serverSideData.vars.full_name);
                    scope.form.options = parser.parseOptions(scope.serverSideData.vars);
                    scope.form.actions = parser.parseActions(scope.options.actionBar, {save: scope.save, cancel: scope.cancel});
                    scope.form.name = parser.parseName(scope.serverSideData.vars);
                }
            }

            function save(){
                scope.options.actions.save(scope.form.widgets, scope.action, scope.method);
            }

            function cancel(){
                scope.options.actions.cancel();
            }

            function showErrorOneField(error,pos, widgets){
                if(error.length>pos){
                    for(var i=0; i<widgets.length; i++){
                        if(widgets[i].name === error[pos]){
                            widgets[i].options.hasError = true;
                        }
                    }
                }
            }

            function implementError(widgets, errors, pos){
                for(var i=0; i<widgets.length; i++){
                    if(widgets[i].name === errors[pos]){
                        widgets[i].options.hasError = true;
                        if(errors.length>pos+1 && widgets[i].value && widgets[i].value.widgets){
                            widgets[i].value.widgets = implementError(widgets[i].value.widgets, errors, pos+1);
                        }
                    }
                }
                return widgets;
            }

            function showErrorFields(errors){
                for(var i=0; i<errors.length; i++){
                    scope.form.widgets = implementError(scope.form.widgets, errors[i].split("."), 0);
                }
            }

            function build(data){
                scope.serverSideData = data;
                activate();
            }
        }
    }

})();

(function(){

    angular
        .module('crud.filter')
        .directive('wrCrudFilter', crudFilter);

    crudFilter.$inject = ['RouteHelpers', 'CrudFormDataParser'];

    function crudFilter(helper, parser) {
        var directive = {
            link: link,
            scope: {
                options: "=",
                src: "="
            },
            templateUrl: helper.basepath('directives/crud-filter.directive.html'),
            restrict: 'EA'
        };
        return directive;

        function link(scope, element, attrs) {

            scope.form = {};
            scope.serverSideData = undefined;

            scope.search = search;
            scope.reset = reset;

            scope.options.build = build;
            scope.visible = true;

            activate();

            // Implementation

            function activate(){
                if(scope.serverSideData){
                    scope.form.widgets = parser.parseWidgets(scope.serverSideData.children, scope.serverSideData.vars.value, scope.serverSideData.vars.full_name);
                    scope.form.options = parser.parseOptions(scope.serverSideData.vars);
                    scope.form.actions = parser.parseActions(scope.options.actionBar, {search: scope.search, reset: scope.reset});
                    scope.form.name = parser.parseName(scope.serverSideData.vars);
                    scope.form.options.isGrid = true;
                }
            }

            function search(){
                scope.options.actions.search(scope.form.widgets);
            }

            function reset(){
                for(var i=0; i<scope.form.widgets.length; i++) {
                    if (scope.form.widgets[i].type === "datetimerangepicker") {
                        scope.form.widgets[i].value = {};
                    } else if (scope.form.widgets[i].type === "ajaxdata") {
                        scope.form.widgets[i].value.value = undefined;
                        if (typeof scope.form.widgets[i].value.widgets === "object") {
                            Object.keys(scope.form.widgets[i].value.widgets).forEach(function (choiceWidget) {
                                var widget = scope.form.widgets[i].value.widgets[choiceWidget];
                                if (typeof widget.options.choices !== "undefined") {
                                    widget.options.editable = false;
                                    widget.options.choices = [];

                                    widget.options.choices.unshift({
                                        id: undefined,
                                        label: widget.options.placeholder
                                    });
                                }
                                widget.value = undefined;
                            });
                        }
                    } else if (scope.form.widgets[i].type === "multichoice") {
                        if (typeof scope.form.widgets[i].value.choices !== "undefined") {
                            scope.form.widgets[i].value.choices = [];
                        }
                    } else if (scope.form.widgets[i].type === "range") {
                        if (typeof scope.form.widgets[i].value !== "undefined") {
                            scope.form.widgets[i].value = {
                                min: scope.form.widgets[i].options.range_min.value != undefined ? scope.form.widgets[i].options.range_min.value : scope.form.widgets[i].options.range_min.minValue,
                                max: scope.form.widgets[i].options.range_max.value != undefined ? scope.form.widgets[i].options.range_max.value : scope.form.widgets[i].options.range_max.maxValue
                            };
                        }
                    } else {
                        scope.form.widgets[i].value = undefined;
                    }
                }
                scope.options.actions.reset();
            }

            function build(data){
                scope.serverSideData = data;
                activate();
            }
        }
    }

})();

(function(){

    angular
        .module('crud.form')
        .directive('wrCrudForm', crudForm);

    crudForm.$inject = ['RouteHelpers'];

    function crudForm(helper) {
        var directive = {
            scope: {
                options: '=',
                name: '=',
                widgets: '=',
                actions: '=',
                actionBlock: '='
            },
            templateUrl: helper.basepath('directives/crud-form.directive.html'),
            restrict: 'EA',
            link: link
        };
        return directive;

        function link(scope, element, attr){
            
        }
    }

})();

(function(){

    angular
        .module('crud.toolbar')
        .directive('wrCrudToolbar', crudToolbar);

    crudToolbar.$inject = ['RouteHelpers', 'CrudToolbarDataParser', '$timeout'];

    function crudToolbar(helper, parser, $timeout) {
        var directive = {
            scope: {
                options: '='
            },
            link: link,
            templateUrl: helper.basepath('directives/crud-toolbar.directive.html'),
            restrict: 'EA'
        };
        return directive;

        function link(scope, element, attrs) {
            scope.groups = [];

            scope.triggerCallback = triggerCallback;
            scope.options.refreshButtonsAccessibility = refreshButtonsAccessibility;
            scope.options.build = build;
            scope.visible = true;

            activate();

            // Implementation

            function activate(){
                if(scope.serverSideData){
                    scope.groups = parser.parseGroups(scope.serverSideData);
                }
            }

            /**
             * Refresh buttons accessibility
             *
             * @param state
             */
            function refreshButtonsAccessibility(state) {
                for(var i=0; i<scope.groups.length; i++){
                    for(var j=0; j<scope.groups[i].buttons.length; j++){
                        if(scope.groups[i].buttons[j].callback !== "create"){
                            scope.groups[i].buttons[j].disabled = !state;
                        }
                    }
                }
                $timeout(function(){
                    scope.$apply();
                }, 0, false);
            }

            function triggerCallback(groupIndex, buttonIndex){
                refreshButtonsAccessibility(false);
                if(scope.options.actions[scope.groups[groupIndex].buttons[buttonIndex].callback])
                    scope.options.actions[scope.groups[groupIndex].buttons[buttonIndex].callback](scope.groups[groupIndex].buttons[buttonIndex])
            }

            function build(data){
                scope.serverSideData = data;
                activate();
            }
        }
    }

})();

(function(){

    angular
        .module('crud.widgets.ajaxdata')
        .directive('wrCrudWidgetsAjaxdata', crudWidgetsAjaxdata);

    crudWidgetsAjaxdata.$inject = ['RouteHelpers', 'transport'];

    function crudWidgetsAjaxdata(helper, transport) {
        var directive = {
            scope: {
                options: '=',
                name: '=',
                value: '='
            },
            link: link,
            templateUrl: helper.basepath('widgets/crud-widgets-ajaxdata.directive.html'),
            restrict: 'EA'
        };
        return directive;

        function link(scope, element, attrs) {
            scope.value = {};
            scope.onValueChange = onValueChange;

            activate();

            function activate(){
                scope.options.choices.unshift({
                    id: undefined,
                    label: scope.options.placeholder
                });

                if(scope.value && scope.value.value){
                    onValueChange(scope.options.formId);
                }

                scope.value.widgets = scope.options.widgets;

            }

            function onValueChange(editForm){
                var value = typeof scope.value.value === "object"? scope.value.value.id : scope.value.value;
                transport.send({
                    url: scope.options.isSmartSelectedDymamicLoaderValues.getUrl+"/"+value + (editForm?"/"+editForm:""),
                    method: 'GET',
                }, function(data){
                    angular.forEach(data, function(widget) {
                        angular.forEach(scope.value.widgets, function (item) {
                            if (item.name == widget.name) {
                                item.options = angular.extend(item.options, widget.options);
                            }
                            if (!item.options.fullName) {
                                item.options.fullName = scope.options.formName + "[" + item.name + "]"
                            }
                        });
                    });
                }, function(response){
                    console.error(response);
                });
            }

        }
    }

})();

(function(){

    angular
        .module('crud.widgets.checkbox')
        .directive('wrCrudWidgetsCheckbox', crudWidgetsCheckbox);

    crudWidgetsCheckbox.$inject = ['RouteHelpers'];

    function crudWidgetsCheckbox(helper) {
        var directive = {
            scope: {
                options: '=',
                name: '=',
                value: '='
            },
            templateUrl: helper.basepath('widgets/crud-widgets-checkbox.directive.html'),
            restrict: 'EA'
        };
        return directive;
    }

})();

(function(){

    angular
        .module('crud.widgets.choice')
        .directive('wrCrudWidgetsChoice', crudWidgetsChoice);

    crudWidgetsChoice.$inject = ['RouteHelpers'];

    function crudWidgetsChoice(helper) {
        var directive = {
            scope: {
                options: '=',
                name: '=',
                value: '='
            },
            link: link,
            templateUrl: helper.basepath('widgets/crud-widgets-choice.directive.html'),
            restrict: 'EA'
        };
        return directive;

        function link(scope, element, attrs) {
            scope.options.choices.unshift({
                id: undefined,
                label: scope.options.placeholder
            });
        }
    }

})();

(function(){

    angular
        .module('crud.widgets.compileit')
        .directive('compileIt', crudWidgetsCompileIt);

    crudWidgetsCompileIt.$inject = ['$compile', '$timeout'];

    function crudWidgetsCompileIt($compile, $timeout) {
        var directive = {
            link: link,
            replace: false,
            terminal: true,
            priority: 1000,
            restrict: 'EA'
        };
        return directive;

        function link(scope, element, attrs) {
            $timeout(function(){
                if(/<[a-z][\s\S]*>/i.test(scope.$eval(attrs.compileIt))){
                    element.replaceWith($compile(scope.$eval(attrs.compileIt))(scope.$parent));
                } else {
                    element.replaceWith(scope.$eval(attrs.compileIt));
                }
            }, 0);
        }
    }

})();

(function(){

    angular
        .module('crud.widgets.datetimerangepicker')
        .directive('wrCrudWidgetsDatetimerangepicker', crudWidgetsDatetimerangepicker);

    crudWidgetsDatetimerangepicker.$inject = ['RouteHelpers'];

    function crudWidgetsDatetimerangepicker(helper) {
        var directive = {
            scope: {
                options: '=',
                name: '=',
                value: '='
            },
            link: link,
            templateUrl: helper.basepath('widgets/crud-widgets-datetimerangepicker.directive.html'),
            restrict: 'EA'
        };
        return directive;

        function link(scope, element, attrs) {
            scope.value = {};

            scope.localOptions = {
                timePicker: !scope.options.without_time,
                timePickerSeconds: scope.options.with_seconds,
                timePicker24Hour: true,
                timePickerIncrement: 1,
                eventHandlers: {
                    'cancel.daterangepicker': function(){
                        scope.value = {};
                    }
                },
                locale: {
                    format: renderDateFormatForMoment(scope.options.date_format),
                    separator: " - "
                }
            }

            /**
             * Render app date format to momentjs date format
             *
             * @param date_format
             * @returns {String}
             */
            function renderDateFormatForMoment(date_format){
                    return date_format.replace(/Y+/g,"YYYY")
                                      .replace(/m+/g,"MM")
                                      .replace(/d+/g,"DD")
                                      .replace(/H+/g,"HH")
                                      .replace(/i+/g,"mm")
                                      .replace(/s+/g,"ss");
            }
        }
    }

})();

(function(){

    angular
        .module('crud.widgets.dynamic')
        .directive('wrCrudWidgetsDynamic', crudWidgetsDynamic);

    crudWidgetsDynamic.$inject = ['$compile'];

    function crudWidgetsDynamic($compile) {
        var directive = {
            link: link,
            replace: false,
            terminal: true,
            priority: 1000,
            restrict: 'EA'
        };
        return directive;

        function link(scope, element, attrs) {
            element.attr("wr-crud-widgets-"+scope.$eval(attrs.wrCrudWidgetsDynamic),"");//add dynamic directive

            element.removeAttr("wr-crud-widgets-dynamic"); //remove the attribute to avoid indefinite loop
            element.removeAttr("data-wr-crud-widgets-dynamic");

            $compile(element)(scope);
        }
    }

})();

(function(){

    angular
        .module('crud.widgets.hidden')
        .directive('wrCrudWidgetsHidden', crudWidgetsHidden);

    crudWidgetsHidden.$inject = ['RouteHelpers'];

    function crudWidgetsHidden(helper) {
        var directive = {
            scope: {
                options: '=',
                name: '=',
                value: '='
            },
            templateUrl: helper.basepath('widgets/crud-widgets-hidden.directive.html'),
            restrict: 'EA'
        };
        return directive;
    }

})();

(function(){

    angular
        .module('crud.widgets.jsonview')
        .directive('wrCrudWidgetsJsonview', crudWidgetsJsonview)
        .filter('prettyJson', function(){
            function prettyJson(json) {
                try {
                    JSON.parse(json);
                } catch (e) {
                    return json;
                }
                while (typeof json === 'string') {
                    json = JSON.parse(json);
                }
                return json;
            }
            return prettyJson;
        });

    crudWidgetsJsonview.$inject = ['RouteHelpers'];

    function crudWidgetsJsonview(helper) {
        var directive = {
            scope: {
                options: '=',
                name: '=',
                value: '='
            },
            templateUrl: helper.basepath('widgets/crud-widgets-jsonview.directive.html'),
            restrict: 'EA'
        };
        return directive;
    }

})();

(function(){

    angular
        .module('crud.widgets.multichoice')
        .directive('wrCrudWidgetsMultichoice', crudWidgetsMultichoice);

    crudWidgetsMultichoice.$inject = ['RouteHelpers'];

    function crudWidgetsMultichoice(helper) {
        var directive = {
            scope: {
                options: '=',
                name: '=',
                value: '='
            },
            link: link,
            templateUrl: helper.basepath('widgets/crud-widgets-multichoice.directive.html'),
            restrict: 'EA'
        };
        return directive;

        function link(scope, element, attrs) {
            if(!scope.value){
                scope.value = {choices: []};
            }
            scope.options.choices.unshift({
                id: undefined,
                label: scope.options.placeholder
            });
        }
    }

})();

(function(){

    angular
        .module('crud.widgets.range')
        .directive('wrCrudWidgetsRange', crudWidgetsRange);

    crudWidgetsRange.$inject = ['RouteHelpers'];

    function crudWidgetsRange(helper) {
        var directive = {
            scope: {
                options: '=',
                name: '=',
                value: '='
            },
            link: link,
            templateUrl: helper.basepath('widgets/crud-widgets-range.directive.html'),
            restrict: 'EA'
        };
        return directive;

        function link(scope, element, attrs) {
            if (!scope.options.range_min.field_name) {
                scope.options.range_min.field_name = 'min';
            }

            if (!scope.options.range_max.field_name) {
                scope.options.range_max.field_name = 'max';
            }

            if (!scope.value) {
                scope.value = {
                    min: scope.options.range_min.value != undefined ? scope.options.range_min.value : scope.options.range_min.minValue,
                    max: scope.options.range_max.value != undefined ? scope.options.range_max.value : scope.options.range_max.maxValue
                };
            }
        }
    }

})();

(function(){

    angular
        .module('crud.widgets.subform')
        .directive('wrCrudWidgetsSubform', crudWidgetsSubform);

    crudWidgetsSubform.$inject = ['RouteHelpers', 'transport', 'CrudFormDataParser'];

    function crudWidgetsSubform(helper, transport, parser) {
        var directive = {
            scope: {
                options: '=',
                name: '=',
                value: '='
            },
            link: link,
            templateUrl: helper.basepath('widgets/crud-widgets-subform.directive.html'),
            restrict: 'EA'
        };
        return directive;

        function link(scope, element, attrs) {
            scope.onValueChange = onValueChange;

            activate();

            // Implementation

            function activate(){
                scope.options.choices.unshift({
                    id: undefined,
                    label: scope.options.placeholder
                });

                if(scope.value && scope.value.value){
                    onValueChange(scope.options.formId);
                } else {
                    scope.value = {};
                }
            }

            function onValueChange(editForm){
                var value = typeof scope.value.value === "object"? scope.value.value.id : scope.value.value;
                transport.send({
                    url: scope.options.isSmartSelectedForm.getUrl+"/"+value + (editForm?"/"+editForm:""),
                    method: 'GET',
                }, function(data){
                    scope.value.widgets = data.map(function(widget){
                        return parser.parseSubformWidget(widget, scope.options.formName);
                    });
                }, function(response){
                    console.error(response);
                });
            }

        }
    }

})();

(function(){

    angular
        .module('crud.widgets.text')
        .directive('wrCrudWidgetsText', crudWidgetsText);

    crudWidgetsText.$inject = ['RouteHelpers'];

    function crudWidgetsText(helper) {
        var directive = {
            scope: {
                options: '=',
                name: '=',
                value: '='
            },
            templateUrl: helper.basepath('widgets/crud-widgets-text.directive.html'),
            restrict: 'EA'
        };
        return directive;
    }

})();

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

(function() {

    angular
        .module('crud.datatable.widgets.dropdown')
        .directive('wrCrudDatatableWidgetsDropdown', crudDatatableWidgetsDropdown);

    crudDatatableWidgetsDropdown.$inject = ['RouteHelpers', '$timeout', 'supervisor', 'CrudDatatableDataParser'];

    function crudDatatableWidgetsDropdown(helper, $timeout, supervisor, parser) {
        var directive = {
            scope: {
                row: "=",
                actions: "="
            },
            templateUrl: helper.basepath('datatable-widgets/crud-datatable-widgets-dropdown.directive.html'),
            restrict: 'EA',
            link: link
        };
        return directive;

        function link(scope, element, attr) {
            scope.generateUUID = generateUUID;

            scope.menu = [];
            scope.uuid = "";
            scope.triggerCallback = triggerCallback;

            supervisor
                .loader('config')
                .onLoaded({
                    onSuccess: function(data) {
                        scope.menu = getMenuList(data.action.row);
                    }
                });


            activate();
            // Implementation

            function activate() {
                scope.uuid = scope.generateUUID();
            }

            /**
             * getMenuList - generate menu list with divider
             *
             * @param  {Object} list  menu list from server
             * @return {Array}        menu list for dropdown menu
             */
            function getMenuList(list) {
                var menu = [];

                Object.keys(list).map(function(itemList, key) {
                    if (key !== 0) {
                        menu.push("divider");
                    }
                    Array.prototype.push.apply(menu, list[itemList]);
                });

                return menu;
            }

            /**
             * generateUUID - generate uniq id
             *
             * @return {String}  uniq id
             */
            function generateUUID() {
                return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                    var r = Math.random() * 16 | 0;
                    return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
                });
            }

            /**
             * triggerCallback - trigger menu events
             *
             * @param  {Object} item   menu item
             */
            function triggerCallback(item) {
                var data = parser.parseAction(item, scope.row);
                if (scope.actions.hasOwnProperty(data.callback)) {
                    scope.actions[data.callback](data.data);
                }
            }
        }
    }

})();
