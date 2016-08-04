(function(){
    'use strict';

    angular
        .module('crud.datatable.core', [
            'crud.datatable.header',
            'crud.datatable.row',
            'crud.datatable.search',
            'crud.datatable.pages',
            'crud.datatable.info',
            'crud.datatable.pagination',
            'crud.widgets.compileit'
        ]);

})();
