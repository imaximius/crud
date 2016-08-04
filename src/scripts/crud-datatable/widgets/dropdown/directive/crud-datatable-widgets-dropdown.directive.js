(function() {

    angular
        .module('crud.datatable.widgets.dropdown')
        .directive('wrCrudDatatableWidgetsDropdown', crudDatatableWidgetsDropdown);

    crudDatatableWidgetsDropdown.$inject = ['RouteHelpers', '$timeout', 'supervisor', 'CrudDatatableDataParser'];

    function crudDatatableWidgetsDropdown(helper, $timeout, supervisor, parser) {
        var directive = {
            scope: {
                row: "=",
                actions: "="
            },
            templateUrl: helper.basepath('datatable-widgets/crud-datatable-widgets-dropdown.directive.html'),
            restrict: 'EA',
            link: link
        };
        return directive;

        function link(scope, element, attr) {
            scope.generateUUID = generateUUID;

            scope.menu = [];
            scope.uuid = "";
            scope.triggerCallback = triggerCallback;

            supervisor
                .loader('config')
                .onLoaded({
                    onSuccess: function(data) {
                        scope.menu = getMenuList(data.action.row);
                    }
                });


            activate();
            // Implementation

            function activate() {
                scope.uuid = scope.generateUUID();
            }

            /**
             * getMenuList - generate menu list with divider
             *
             * @param  {Object} list  menu list from server
             * @return {Array}        menu list for dropdown menu
             */
            function getMenuList(list) {
                var menu = [];

                Object.keys(list).map(function(itemList, key) {
                    if (key !== 0) {
                        menu.push("divider");
                    }
                    Array.prototype.push.apply(menu, list[itemList]);
                });

                return menu;
            }

            /**
             * generateUUID - generate uniq id
             *
             * @return {String}  uniq id
             */
            function generateUUID() {
                return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                    var r = Math.random() * 16 | 0;
                    return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
                });
            }

            /**
             * triggerCallback - trigger menu events
             *
             * @param  {Object} item   menu item
             */
            function triggerCallback(item) {
                var data = parser.parseAction(item, scope.row);
                if (scope.actions.hasOwnProperty(data.callback)) {
                    scope.actions[data.callback](data.data);
                }
            }
        }
    }

})();
