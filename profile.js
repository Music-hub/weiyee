$('.ui.dropdown')
  .dropdown()
;

$(function(){
    $('#signup').click(function(){

        $('#bg').css({'display':'block',
    		'position':'fixed'});
        $('#pop-div1').css({'display':'block',
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

        $('#bg').css({'display':'block',
    		'position':'fixed'});

        $('#pop-div2').css({'display':'block',
			'position':'absolute'});
        
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
	window.open('/auth/google', 'Login...','width=400,height=200,resizeable,scrollbars');
});

$('#email-auth-ajax').submit(function(e){
    e.preventDefault();
	$.post('/auth/email/json');
});

$('#email-register').submit(function(e){
    e.preventDefault();
    $.post('/register/email');
});

$('#create').click(function(e){
    e.preventDefault();
    $.post('/api/sheet/create');
});
