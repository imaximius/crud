(function(){

    angular
        .module('crud.widgets.datetimerangepicker')
        .directive('wrCrudWidgetsDatetimerangepicker', crudWidgetsDatetimerangepicker);

    crudWidgetsDatetimerangepicker.$inject = ['RouteHelpers'];

    function crudWidgetsDatetimerangepicker(helper) {
        var directive = {
            scope: {
                options: '=',
                name: '=',
                value: '='
            },
            link: link,
            templateUrl: helper.basepath('widgets/crud-widgets-datetimerangepicker.directive.html'),
            restrict: 'EA'
        };
        return directive;

        function link(scope, element, attrs) {
            scope.value = {};

            scope.localOptions = {
                timePicker: !scope.options.without_time,
                timePickerSeconds: scope.options.with_seconds,
                timePicker24Hour: true,
                timePickerIncrement: 1,
                eventHandlers: {
                    'cancel.daterangepicker': function(){
                        scope.value = {};
                    }
                },
                locale: {
                    format: renderDateFormatForMoment(scope.options.date_format),
                    separator: " - "
                }
            }

            /**
             * Render app date format to momentjs date format
             *
             * @param date_format
             * @returns {String}
             */
            function renderDateFormatForMoment(date_format){
                    return date_format.replace(/Y+/g,"YYYY")
                                      .replace(/m+/g,"MM")
                                      .replace(/d+/g,"DD")
                                      .replace(/H+/g,"HH")
                                      .replace(/i+/g,"mm")
                                      .replace(/s+/g,"ss");
            }
        }
    }

})();
