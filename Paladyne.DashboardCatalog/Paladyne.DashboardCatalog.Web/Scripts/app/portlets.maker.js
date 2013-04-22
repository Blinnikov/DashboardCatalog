$(document).ready(function(){
	// Portlets (boxes)
    $(".column").sortable({
        connectWith: '.column',
		items:'div.box',	
		opacity:0.8,
		helper:'original',
		revert:true,
		forceHelperSize:true,	
		placeholder: 'dashed_box_placeholder round_all',
		forcePlaceholderSize:true,
		tolerance:'pointer'
    });
	
	// Delete boxes stored in cookies */ 
	/* uncomment code to activate
	$(".box").each(function() {		
		var id = $(this).attr("id");
		var ckie = $.cookie("AdminIntensoDeleteBoxes_"+ $("body").attr("id" )+ "_" + id);
		if (ckie && ckie != '') {
			$(this).remove();
		}
	});*/


	// Store portlet update (move) in cookie
    $(".column").bind('sortupdate', function() {
        $('.column').each(function() {
            //$.cookie("AdminIntensoColumn_" + $("body").attr("id") + ($(this).attr('id')), $(this).sortable('toArray'), { expires: 365 });
        });
    });
	
	// check for closed boxes cookie
	//var ckie = $.cookie("AdminIntensoClosedBoxes_"+$("body").attr("id"));
	//if (ckie && ckie != '')	{
	//	var list = ckie.split(',');

	//	for (var x = 0; x < list.length; x++) {	
	//	 	var toggle = $("#"+list[x]).find("a.toggle");
	//		toggle.toggleClass("toggle_closed").next().next().slideToggle("slow");
	//		toggle.parent("div").toggleClass("closed_box");
	//		toggle.siblings(".box_head").toggleClass("round_top").toggleClass("round_all")
	//	}	
	//}
	
	//Portlets
	// check for order cookies
    //for (var i = 0; i < 9; i++) {
    //    var ckie = $.cookie("AdminIntensoColumn_"+ $("body").attr("id") + "col"+i);

    //    if (ckie && ckie != ''){
    //        var list = ckie.split(',');

    //        for (var x = 0; x < list.length; x++) {
    //           $('#'+list[x]).appendTo('#col' + i);			  
    //        }
    //    }
    //}
	
	// Control funtion for portlet (box) buttons clicks
	function setControls(ui) {		
		$('[class*=box_button_]').click(function() {
			var b = $(this);
			var p = b.parent('div');
			
			// Control functionality
			switch(b.attr('title').toLowerCase()) {
				case 'config':
					widgetConfig(b, p);
					break;
				
				case 'toggle':
					widgetToggle(b, p);
					break;
				
				case 'close':
					widgetClose(b, p);
					break;
			}
		});
	}
	
	// Toggle button widget
	function widgetToggle(b, p) {
		// Change the + into - and visa versa
		
		b.toggleClass("toggle_closed").next().next().slideToggle("slow");
		b.parent("div").toggleClass("closed_box");
		b.siblings(".box_head").toggleClass("round_top").toggleClass("round_all")
		var closedBoxes = [];
		var i = 0;
		$(".closed_box").each(function() 
		{
				closedBoxes[i] = $(this).attr("id");
				i++;		
		});
		//$.cookie("AdminIntensoClosedBoxes_" + $("body").attr("id"), closedBoxes, { expires: 365 });
		
        

		return false; //Prevent the browser jump to the link anchor
		
	}
	
	// Close button widget with dialog
	function widgetClose(w, p) {
	    bootbox.confirm("Are you sure?", function (confirmed) {
	        if (confirmed) {
	            p.remove();
	        }
	    });
	}
	
	// Modify button widget
	function widgetConfig(w, p) {		
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
	}
	
	// set portlet comtrols
	setControls();
});  		