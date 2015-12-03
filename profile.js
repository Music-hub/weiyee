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

$('#email-auth-ajax').submit(function(e){
    e.preventDefault();
	$.post('/auth/email/json');
});

var templete = 
  '<div class="item floatleft score">' +
    '<div class="image">' +
      '<i class="massive file text outline icon docposition"></i>' +
    '</div>' +
    '<div class="content">' +
      '<a class="header">標題</a>' +
      '<div class="meta">' +
        '<span>Description</span>' +
      '</div>' +
      '<div class="description">' +
        '<p></p>' +
      '</div>' +
      '<div class="extra">Additional Details ' +
      '</div>' +
      '<div class="extra">' +
        '<div class="ui right floated primary button">Edit <i class="right chevron icon"></i>' +
        '</div>' +
      '</div>' +
    '</div>' +
  '</div>';

function showSheetList(sheets) {
  var temp
  $('.items').html('');
  for (var i = 0; i < sheets.length; i++) {
    temp = $(templete);
    temp.find('.header').text(sheets[i].name);
    temp.find('.button').click(function (sheet) {
      location.href = "/editor/" + sheet._id;
    }.bind(null, sheets[i]))
    $('.items').append(temp);
  }
}

$(function () {
  $.get( 'setting/get', function (event) {
    if (event.level === "error") return
    showSheetList(event.data.sheets)
  })
})

window.onmessage = function onmessage (ev) {
  console.log(ev);
  var temp;
  var event = ev.data;
  switch (event.level) {
    case "success":
      showSheetList(event.data.sheets)
      $('#bg').click();
      break;
    case "error":
      alert('login error');
      break;
  }
}