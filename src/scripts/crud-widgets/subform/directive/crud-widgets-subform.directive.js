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
