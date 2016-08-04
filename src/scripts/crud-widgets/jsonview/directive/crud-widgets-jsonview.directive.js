(function(){

    angular
        .module('crud.widgets.jsonview')
        .directive('wrCrudWidgetsJsonview', crudWidgetsJsonview)
        .filter('prettyJson', function(){
            function prettyJson(json) {
                try {
                    JSON.parse(json);
                } catch (e) {
                    return json;
                }
                while (typeof json === 'string') {
                    json = JSON.parse(json);
                }
                return json;
            }
            return prettyJson;
        });

    crudWidgetsJsonview.$inject = ['RouteHelpers'];

    function crudWidgetsJsonview(helper) {
        var directive = {
            scope: {
                options: '=',
                name: '=',
                value: '='
            },
            templateUrl: helper.basepath('widgets/crud-widgets-jsonview.directive.html'),
            restrict: 'EA'
        };
        return directive;
    }

})();
