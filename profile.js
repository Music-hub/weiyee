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

$.get( 'setting/get', function (event) {
  if (event.level === "error") return
  showSheetList(event.data.sheets)
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

$('.ui.dropdown').dropdown();

$('.add_score').on('click',function(){
  $('.ui.modal').modal('show');
});

$('.add_score').mouseenter(function(){
  $(this).fadeTo( "slow", 0.33 );
});

$('.add_score').mouseleave(function(){
  $(this).fadeTo( "slow", 1 );
});

$('#modal_button_add').on('click',function(){
    
  var name,disc;
  name = $('.name').val();
  disc = $('.disc').val();

  $('#repo').append('<div class="score">'+
                      '<div class="ui header">'+name+'</div>'+
                      '<div class="ui divider"></div>'+
                      '<div class="content">'+disc+'</div>'+
                      '<div class="buttons">'+
                        '<button class="ui teal circular icon button">'+
                          '<i class="large write icon"></i>'+
                        '</button>'+
                        '<button class="ui teal circular icon button">'+
                          '<i class="large play icon"></i>'+
                        '</button>'+
                        '<button class="ui red discard circular icon button">'+
                          '<i class="large delete icon"></i>'+
                        '</button>'+
                      '</div>'+
                    '</div>');
});

$('.name, .disc').keyup(function(){
    
  var name,disc;
  name = $('.name').val();
  disc = $('.disc').val();
  if(name!="")
    $('#modal_button_add').removeClass('disabled');
  else
    $('#modal_button_add').addClass('disabled');
});

$('#modal_button_cancel').on('click',function(){
  $('.ui.modal').modal('hide');
});

$('#repo').on('click','.score .discard.button',function(){
    
  $(this).parent().parent().remove();
});

$('.ui.setting.item').on('click',function(){

  $('.ui.sidebar').sidebar('toggle');

});
