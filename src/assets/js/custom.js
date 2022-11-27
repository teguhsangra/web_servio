import "./assets/js/nice-select2";
; (function ($) {
    "use strict"

    new NiceSelect('select', { searchable: true });

    $('#datetimepicker11,#datetimepicker1').datetimepicker({
        daysOfWeekDisabled: [0, 6]
    });


})(jQuery)