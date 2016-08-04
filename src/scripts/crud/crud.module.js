(function(){
    'use strict';

    angular
        .module('crud', [
            'ngDialog',
            'crud.form',
            'crud.toolbar',
            'crud.datatable',
            'ui.bootstrap',
            'crud.filter',
            'crud.dialog'
        ]);

})();
