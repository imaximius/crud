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
