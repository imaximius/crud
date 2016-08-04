(function(){

    angular
        .module('crud.toolbar')
        .directive('wrCrudToolbar', crudToolbar);

    crudToolbar.$inject = ['RouteHelpers', 'CrudToolbarDataParser', '$timeout'];

    function crudToolbar(helper, parser, $timeout) {
        var directive = {
            scope: {
                options: '='
            },
            link: link,
            templateUrl: helper.basepath('directives/crud-toolbar.directive.html'),
            restrict: 'EA'
        };
        return directive;

        function link(scope, element, attrs) {
            scope.groups = [];

            scope.triggerCallback = triggerCallback;
            scope.options.refreshButtonsAccessibility = refreshButtonsAccessibility;
            scope.options.build = build;
            scope.visible = true;

            activate();

            // Implementation

            function activate(){
                if(scope.serverSideData){
                    scope.groups = parser.parseGroups(scope.serverSideData);
                }
            }

            /**
             * Refresh buttons accessibility
             *
             * @param state
             */
            function refreshButtonsAccessibility(state) {
                for(var i=0; i<scope.groups.length; i++){
                    for(var j=0; j<scope.groups[i].buttons.length; j++){
                        if(scope.groups[i].buttons[j].callback !== "create"){
                            scope.groups[i].buttons[j].disabled = !state;
                        }
                    }
                }
                $timeout(function(){
                    scope.$apply();
                }, 0, false);
            }

            function triggerCallback(groupIndex, buttonIndex){
                refreshButtonsAccessibility(false);
                if(scope.options.actions[scope.groups[groupIndex].buttons[buttonIndex].callback])
                    scope.options.actions[scope.groups[groupIndex].buttons[buttonIndex].callback](scope.groups[groupIndex].buttons[buttonIndex])
            }

            function build(data){
                scope.serverSideData = data;
                activate();
            }
        }
    }

})();
