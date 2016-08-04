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
