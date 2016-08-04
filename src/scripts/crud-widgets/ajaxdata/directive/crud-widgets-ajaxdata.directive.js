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
