$('.ui.dropdown')
  .dropdown()
;

$(function(){
    $('#signup').click(function(){

    	var windowWidth = $(window).width();
		var windowHeight = $(window).height();
		var popupHeight = $('#pop-div1').height();
		var popupWidth = $('#pop-div1').width();	

        $('#bg').css({'display':'block',
    		'position':'fixed'});
        $('#pop-div1').css({'display':'block',
    		'margin-left' : (windowWidth/2-popupWidth/2)+'px',
    		'margin-right' : (windowWidth/2-popupWidth/2)+'px',
			'margin-top' : (-6*windowHeight/11-6*popupHeight/11)+'px',
			'position':'fixed'});
        $('#pop-div2').css({'display':'none'});
    });
    $('#bg').click(function(){
        $('#bg').css({'display':'none'});
        $('#pop-div1').css({'display':'none'});
    });
});


$(function(){
    $('#signin').click(function(){

    	var windowWidth = $(window).width();
		var windowHeight = $(window).height();
		var popupHeight = $('#pop-div2').height();
		var popupWidth = $('#pop-div2').width();	

        $('#bg').css({'display':'block',
    		'position':'fixed'});
        if(windowWidth>800){
        	$('#pop-div2').css({'display':'block',
    		'margin-left' : (windowWidth/2-popupWidth/2)+'px',
    		'margin-right' : (windowWidth/2-popupWidth/2)+'px',
			'margin-top' : (-6*windowHeight/11-6*popupHeight/11)+'px',
			'position':'fixed'});
        }
        else{
        	$('#pop-div2').css({'display':'block',
        	'margin-left' : '0px',
    		'margin-right' : '0px',
			'margin-top' : (-6*windowHeight/11-6*popupHeight/11)+'px',
			'position':'absolute'});
        }
        
        $('#pop-div1').css({'display':'none'});
    });
    $('#bg').click(function(){
        $('#bg').css({'display':'none'});
        $('#pop-div2').css({'display':'none'});
    });
});

$('#fbsignin').click(function(){
	window.open('/auth/facebook', 'Login...','width=400,height=200,resizeable,scrollbars');
});

$('#googlesignin').click(function(){
	window.open('/auth/facebook', 'Login...','width=400,height=200,resizeable,scrollbars');
});

$('#email-auth-ajax').submit(function(){
	$.post('/auth/email/json');
});