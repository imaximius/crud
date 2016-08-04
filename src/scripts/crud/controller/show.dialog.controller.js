(function () {
    'use strict';

    angular
        .module('crud')
        .controller('CRUDShowDialogController', CRUDShowDialogController);

    CRUDShowDialogController.$inject = ['$scope', 'transport', 'supervisor', '$filter', 'toaster'];

    function CRUDShowDialogController($scope, transport, supervisor, $filter, toaster) {
        /* jshint -W004, validthis: true */
        var vm = this,
            dt;

        vm.isLoaded = false;
        vm.icon = 'fa fa-file-o';
        vm.title = 'Dialog';
        vm.errors = [];

        vm.form = {
            useFormTransformer: 'symfony',
            actionBar: [
                {$$: 'cancel', icon: 'fa fa-minus-circle', title: 'admin.general.CANCEL'}
            ],
            actions: {
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