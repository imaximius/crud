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
