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
