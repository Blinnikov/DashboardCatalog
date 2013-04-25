define(
    'portletsmaker',
    ['jquery'],
    function ($) {

        var setPortlets = function() {

            // Portlets (boxes)
            $(".column").sortable({
                connectWith: '.column',
                items: 'div.box',
                opacity: 0.8,
                helper: 'original',
                revert: true,
                forceHelperSize: true,
                placeholder: 'dashed_box_placeholder round_all',
                forcePlaceholderSize: true,
                tolerance: 'pointer'
            });

            // Store portlet update (move)
            $(".column").bind('sortupdate', function() {
                $('.column').each(function() {
                });
            });

        };

        return {
            setPortlets: setPortlets
        };
    });