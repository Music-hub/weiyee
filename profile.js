$('#signin').click(function(){
  $('#bg').trigger('click');
  
  $('#bg').css({'display':'block',
    'position':'fixed'});
  $('#pop-div2').css({'display':'block',
    'position':'fixed'});
});

$('#signup').click(function(){
  $('#bg').trigger('click');
  
  $('#bg').css({'display':'block',
		'position':'fixed'});
  $('#pop-div1').css({'display':'block',
		'position':'fixed'});
});

$('#bg').click(function(){
  $('#bg').css({'display':'none'});
  $('#pop-div1').css({'display':'none'});
  $('#pop-div2').css({'display':'none'});
  $('#pop-div3').css({'display':'none'});
});


// http://stackoverflow.com/questions/979975/how-to-get-the-value-from-the-url-parameter
var QueryString = function () {
  // This function is anonymous, is executed immediately and 
  // the return value is assigned to QueryString!
  var query_string = {};
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i=0;i<vars.length;i++) {
    var pair = vars[i].split("=");
        // If first entry with this name
    if (typeof query_string[pair[0]] === "undefined") {
      query_string[pair[0]] = decodeURIComponent(pair[1]);
        // If second entry with this name
    } else if (typeof query_string[pair[0]] === "string") {
      var arr = [ query_string[pair[0]],decodeURIComponent(pair[1]) ];
      query_string[pair[0]] = arr;
        // If third or later entry with this name
    } else {
      query_string[pair[0]].push(decodeURIComponent(pair[1]));
    }
  } 
    return query_string;
}();

$('.ui.dropdown')
  .dropdown()
;

function switchLoginStatus(isLogin) {
  if (isLogin) {
    $('.pre-login').removeClass('pre-login').addClass('not-pre-login')
    $('.not-post-login').removeClass('not-post-login').addClass('post-login')
  } else {
    $('.post-login').removeClass('post-login').addClass('not-post-login')
    $('.not-pre-login').removeClass('not-pre-login').addClass('pre-login')
  }
}

$(function(){
    console.log(QueryString);
    if (!QueryString['register-token']) return;
    
    $('#bg').css({'display':'block',
		  'position':'fixed'});

    $('#pop-div3').css({'display':'block',
		  'position':'absolute'});
    $('#bg').off('click');
});

$('#fbsignin').click(function(){
	window.open('/auth/facebook', 'Login...','width=400,height=200,resizeable,scrollbars');
});

$('#googlesignin').click(function(){
	window.open('/auth/google', 'Login...','width=400,height=200,resizeable,scrollbars');
});

$('#signout').click(function () {
  $.post('/logout', {},function (ev) {
    if (ev.level !== 'error') {
      $('.score').remove();
      switchLoginStatus(false);
    }
  })
})

var templete = $('.score.templete').removeClass('templete').detach()[0].outerHTML;

function showSheetList(sheets) {
  var temp;
  for (var i = 0; i < sheets.length; i++) {
    temp = $(templete);
    temp.attr('data-sheet-id', sheets[i]._id);
    temp.find('.header').text(sheets[i].name);
    temp.find('.content').text(sheets[i].description || '');
    temp.find('.button.edit, .button.play').click(function (sheet) {
      location.href = "/editor/" + sheet._id;
    }.bind(null, sheets[i]))
    temp.find('.button.delete').click(removeSheet.bind(null, sheets[i]._id));
    // $('.add_score').append(temp);
    temp.insertAfter('.add_score')
    
    temp.css('opacity', 0);
    (function (temp) {
      setTimeout(
        function () {
          temp.animate({'opacity': 1}, 500);
        }
      , (sheets.length - i - 1) * 100)
    } (temp))
  }
}

function removeSheet(id) {
  if (!confirm('Are you sure you want to delete this?')) return;
  $.post('/api/sheet/remove/' + id, {}, function (event) {
    if (event.level === "error") return alert(event.message);
    var item = $('div[data-sheet-id=' + id + ']')
    item.animate({opacity: 0}, 500, function () {
      item.animate({width: 0}, 500, function () {
        item.remove();
      })
    })
  })
}

$(function () {
  $.get( 'setting/get', function (event) {
    if (event.level === "error") return
    showSheetList(event.data.sheets);
    switchLoginStatus(true);
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
      switchLoginStatus(true);
      break;
    case "error":
      alert('login error');
      break;
  }
}


$('#email-register')
.form(
  {
    email: {
      identifier  : 'email',
    rules: [
        {
          type   : 'email',
          prompt : 'Please enter a valid email'
        }
      ]
    }
  },
  {
    onSuccess: function(event, fields){
      event.preventDefault();
      console.log('email validate passed');
      console.log(fields);
      var APIEndPoint = "/register/email";
      $.post(APIEndPoint, {
        email: fields.email
      }, function (ev) {
        if (ev.level === "error") {
          return alert('register failed: fail to send email to ' + fields.email + ' due to ' + ev.message);
        }
        alert('successed! please check your mail box and also junk box for register email');
        $('#bg').css({'display':'none'});
        $('#pop-div1').css({'display':'none'});
      })
      return false;
    },
    onFailure: function(formErrors) {
      // alert(arguments.length);
      alert(formErrors);
      return false;
    }
  }
)



$('#email-register-finish')
.form(
  {
    password: {
      identifier  : 'password',
      rules: [
          {
            type   : 'minLength[6]',
            prompt : 'Password must not shorter than 6 words'
          },
          {
            type   : 'empty',
            prompt : 'Password must not be empty'
          }
      ]
    },/*
    password2: {
      identifier  : 'password2',
      rules: [
          {
            type   : 'match[password]',
            prompt : 'Password must be the same'
          }
      ]
    },*/
    username: {
      identifier  : 'username',
      rules: [
          {
            type   : 'empty',
            prompt : 'username must not be empty'
          }
      ]
    }
  },
  {
    onSuccess: function(event, fields){
      event.preventDefault();
      if (fields.password !== fields.password2) {
        return alert('password must be the same');
      }
      console.log(fields);
      
      
      var APIEndPoint = "/register/email/" + QueryString['register-token'];
      $.post(APIEndPoint, {
        name: fields.username,
        password: fields.password
      }, function (ev) {
        if (ev.level === "error") {
          return alert('register failed! Due to: ' + ev.message);
        }
        alert('successed! please use your email to log in!');
      })
      
      return false;
    },
    onFailure: function(formErrors) {
      // alert(arguments.length);
      alert(formErrors);
      return false;
    }
  }
)
$('#email-auth-ajax')
.form(
  {
    password: {
      identifier  : 'password',
      rules: [
          {
            type   : 'empty',
            prompt : 'Password must not be empty'
          }
      ]
    },
    username: {
      identifier  : 'email',
      rules: [
          {
            type   : 'empty',
            prompt : 'email must not be empty'
          }
      ]
    }
  },
  {
    onSuccess: function(event, fields){
      event.preventDefault();
      console.log(fields);
      
      
      var APIEndPoint = "/auth/email/json";
      $.post(APIEndPoint, {
        email: fields.email,
        password: fields.password
      }, function (ev) {
        if (ev.level === "error") {
          return alert('login failed! Due to: ' + ev.message);
        }
        alert('successful login!');
        location.href = '/';
      })
      
      return false;
    },
    onFailure: function(formErrors) {
      // alert(arguments.length);
      alert(formErrors);
      return false;
    }
  }
)
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
  var createAPIPath = '/api/sheet/create';
  var name,disc;
  name = $('.name').val();
  disc = $('.disc').val();
  
	var sheet = Sheet([
		Channel([], "treble", "C")
	], 4);
	
  if (name && disc) {
    $.post(createAPIPath, {
	    data: JSON.stringify(sheet.toObject()),
	    name: name,
	    description: disc
	  },
	  function (ev) {
	    if (ev.level === "error") return alert('error: ' + ev.message);
	    var sheetId = ev.data._id;
	    showSheetList([ev.data]);
	    $('.ui.modal').modal('hide');
	  })
  }
  /*
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
                    '</div>');*/
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