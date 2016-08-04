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
