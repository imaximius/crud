(function(){
    'use strict';

    angular
        .module('crud.widgets', [
            'crud.widgets.dynamic',

            'crud.widgets.text',
            'crud.widgets.choice',
            'crud.widgets.multichoice',
            'crud.widgets.checkbox',
            'crud.widgets.hidden',
            'crud.widgets.subform',
            'crud.widgets.ajaxdata',
            'crud.widgets.range',
            'crud.widgets.jsonview'
        ]);

})();
