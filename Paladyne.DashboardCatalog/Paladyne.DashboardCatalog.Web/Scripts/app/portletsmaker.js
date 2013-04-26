define(
    'portletsmaker',
    ['jquery'],
    function ($) {

        var 
            setPortlets = function() {
            
            // Portlets (boxes)
            $(".widgetcolumn").sortable({
                connectWith: '.widgetcolumn',
                items: 'div.box',
                opacity: 0.8,
                helper: 'original',
                revert: true,
                forceHelperSize: true,
                placeholder: 'dashed_box_placeholder round_all',
                forcePlaceholderSize: true,
                tolerance: 'pointer'
            });

            },
            destroyPortlets = function() {
                $(".widgetcolumn").sortable("destroy");
            };

        return {
            setPortlets: setPortlets,
            destroyPortlets: destroyPortlets
        };
    });