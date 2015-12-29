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