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
