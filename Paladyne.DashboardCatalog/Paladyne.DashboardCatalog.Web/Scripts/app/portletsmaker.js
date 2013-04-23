define(
    'portletsmaker',
    ['jquery'],
    function ($) {

        var
            setPortlets = function () {

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

            },
            
            setControls = function (ui) {

                $('[class*=box_button_]').click(function() {
                    var b = $(this);
                    var p = b.parent('div');

                    // Control functionality
                    switch (b.attr('title').toLowerCase()) {
                    case 'config':
                        widgetConfig(b, p);
                        break;
                    case 'toggle':
                        widgetToggle(b, p);
                        break;
                    case 'close':
                        //widgetClose(b, p);
                        break;
                    }
                });
            },
            
            // Toggle button widget
            widgetToggle = function (b, p) {
                // Change the + into - and visa versa

                b.toggleClass("toggle_closed").next().next().slideToggle("slow");
                b.parent("div").toggleClass("closed_box");
                b.siblings(".box_head").toggleClass("round_top").toggleClass("round_all")
                var closedBoxes = [];
                var i = 0;
                $(".closed_box").each(function() {
                    closedBoxes[i] = $(this).attr("id");
                    i++;
                });
                //$.cookie("AdminIntensoClosedBoxes_" + $("body").attr("id"), closedBoxes, { expires: 365 });


                return false; //Prevent the browser jump to the link anchor

            },
            
            // Modify button widget
            widgetConfig = function(w, p) {
                $("#dialog-config-widget").dialog({
                    resizable: false,
                    modal: true,
                    width: 500,
                    buttons: {
                        "Save changes": function(e, ui) {
                            /* code the functionality here, could store in a cookie */
                            $(this).dialog("close");
                        },
                        Cancel: function() {
                            $(this).dialog("close");
                        }
                    }
                });
            },
            
            init = function() {
                setPortlets();
                setControls();
            };

        return {
            init: init
        };
    });