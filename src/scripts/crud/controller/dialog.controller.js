(function () {
    'use strict';

    angular
        .module('crud')
        .controller('CRUDDialogController', CRUDDialogController);

    CRUDDialogController.$inject = ['$scope', 'transport', 'supervisor', '$filter', 'toaster'];

    function CRUDDialogController($scope, transport, supervisor, $filter, toaster) {
        /* jshint -W004, validthis: true */
        var vm = this,
            dt;

        vm.isLoaded = false;
        vm.icon = 'fa fa-file-o';
        vm.title = 'Dialog';
        vm.errors = [];
        vm.subforms = [];

        vm.form = {
            useFormTransformer: 'symfony',
            actionBar: [
                {$$: 'save', icon: 'fa fa-check', title: 'admin.general.SAVE', class: 'primary'},
                {$$: 'cancel', icon: 'fa fa-minus-circle', title: 'admin.general.CANCEL'}
            ],
            actions: {
                save: function (widgets, action, method) {
                    var data = {};
                    $scope.actionBlock = true;
                    for(var i=0; i<widgets.length; i++){
                        if(widgets[i].type === "subform"){
                            data[widgets[i].name] = widgets[i].value.value;
                            if(widgets[i].value.widgets){
                                if(!data.subforms)
                                    data.subforms = {};
                                data.subforms[widgets[i].name] = widgets[i].value.widgets.map(function(widget){
                                    return {
                                        id: widget.name,
                                        value: widget.value
                                    }
                                })
                            }
                        } else if(widgets[i].type === "multichoice"){
                            data[widgets[i].name] = widgets[i].value.choices;
                        } else {
                            data[widgets[i].name] = widgets[i].value;
                        }
                    }

                    transport.send({
                        url: action,
                        method: method,
                        data: data,
                        notify: {
                            skipIf: 'error'
                        }
                    }, function () {
                        $scope.actionBlock = false;
                        dt.refresh();
                        $scope.closeThisDialog();
                    }, function (data) {
                        if(data.errorFields){
                            vm.form.showErrorFields(data.errorFields);
                        }
                        $scope.actionBlock = false;
                        vm.errors = data.message.split(/\n/);
                    });
                },
                cancel: function () {
                    $scope.closeThisDialog();
                }
            }
        };

        activate();

        /**
         * Controller Activation
         */
        function activate() {
            if (
                !$scope.$parent.hasOwnProperty('ngDialogData') || !($scope.$parent.ngDialogData instanceof Object)
            )
                throw console.error('[ERROR]: Controller cannot access required initialisation data.');

            var $data = $scope.$parent.ngDialogData;

            ['icon', 'title']
                .forEach(function (key) {
                    if (!$data.hasOwnProperty(key))
                        return;
                    vm[key] = $data[key];
                });

            if ($data.hasOwnProperty('datatable'))
                activateDataTable($data.datatable);

            if ($data.hasOwnProperty('form'))
                activateForm($data.form);
        }

        /**
         * Form Activation
         *
         * @param {{
         *  source: String
         * }} data
         */
        function activateForm(data) {
            if (!(data instanceof Object) || !data.hasOwnProperty('source'))
                return;

            supervisor
                .loader('form')
                .load(data.source)
                .onLoaded({
                    onSuccess: function (response) {
                        vm.isLoaded = true;
                        vm.form.build(response);
                    },
                    onError: function (response) {
                        vm.isLoaded = true;
                        $scope.closeThisDialog();
                        toaster.pop('error', 'Error', response.message);
                    }
                });
        }

        /**
         * DataTable Activation
         *
         * @param {Object} data
         */
        function activateDataTable(data) {
            dt = data;
        }
    }

})();
