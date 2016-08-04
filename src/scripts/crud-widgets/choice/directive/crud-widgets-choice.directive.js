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
