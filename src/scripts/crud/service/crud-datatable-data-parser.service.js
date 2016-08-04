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
