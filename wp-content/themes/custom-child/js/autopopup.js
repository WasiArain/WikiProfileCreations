if ($.cookie('popup_load') != '1') {

    count = 0;
    limit = 1;

    var refreshId = setInterval(function() {
        if (count < limit) {
            jQuery("#ouibounce-modal").css('display', 'block');
            count++;
        } else {
            clearInterval(refreshId);
        }
    }, 5000);


    $.cookie('popup_load', '1', {
        expires: 60
    });
}