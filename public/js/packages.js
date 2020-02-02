
// When DOM is ready
$(document).ready(function(){
        
    if($('#contact_tbl').length)
    {
        $('#contact_tbl').append(
        `<tr>
            <th class="col-md-2 col-sm-2 col-xs-2">Name</th>
            <th class="col-md-2 col-sm-2 col-xs-2">Phone</th>
            <th class="col-md-3 col-sm-3 col-xs-3">Email</th>
            <th class="col-md-2 col-sm-2 col-xs-2">Position</th>
        </tr>`
        )
        $.post("/agtinfo_s",(dat)=>{   // process arealink json from server
            console.log(dat);
            let m_arr;
            for( m_arr of dat)
                $('#contact_tbl').append(`<tr><td class="Agents" >${m_arr.AgtFirstName} ${m_arr.AgtLastName}</td><td>${m_arr.AgtBusPhone}</td><td><a href="mailto:${m_arr.AgtEmail}">${m_arr.AgtEmail}</a></td><td>${m_arr.AgtPosition}</td></tr>`);
        },"json");

        $.post("/agtinfo_i",(dat)=>{   // process arealink json from server
            console.log(dat);
            let m_arr;
            for( m_arr of dat)
                $('#contact_tbl').append(`<tr><td class="Agents" >${m_arr.AgtFirstName} ${m_arr.AgtLastName}</td><td>${m_arr.AgtBusPhone}</td><td><a href="mailto:${m_arr.AgtEmail}">${m_arr.AgtEmail}</a></td><td>${m_arr.AgtPosition}</td></tr>`);
        },"json");
        $.post("/agtinfo_j",(dat)=>{   // process arealink json from server
            console.log(dat);
            let m_arr;
            for( m_arr of dat)
                $('#contact_tbl').append(`<tr><td class="Agents" >${m_arr.AgtFirstName} ${m_arr.AgtLastName}</td><td>${m_arr.AgtBusPhone}</td><td><a href="mailto:${m_arr.AgtEmail}">${m_arr.AgtEmail}</a></td><td>${m_arr.AgtPosition}</td></tr>`);
        },"json");


    }

    if($('#cardlink').length)
    {
        $.post("/cardlink",(dat)=>{   // process arealink json from server
            console.log(dat);
            let m_arr;
            for( m_arr of dat)
            {
                $('#cardlink').append(
                    `<div class="card col-sm-3 card_prop">
                        <img class="card-img-top img-responsive" style="width:100%" src="${m_arr.src}" alt="${m_arr.title}">
                        <div class="card-body">
                            <h5 class="card-title">${m_arr.title}</h5>
                            <p class="card-text">${m_arr.desc}</p>
                            <a data-end="${m_arr.end}" data-start="${m_arr.start}" data-price="${m_arr.price}" data-duration="${m_arr.duration}" 
                                class="btn btn-primary" id= "card_btn" onclick="myClick()">Packages</a>
                        </div>
                    </div>`
                );
            }
        },"json");
    }
    $(".cat_pkg").click(function(event){
        $('#cardlink').empty();
        $.ajax({ method: "POST", url: "/cardlink_cat",
        data: { title: $(this).html() }
        }).done(function( dat ) {
            console.log(dat);
            dat=JSON.parse(dat);
            let m_arr;
            for( m_arr of dat)
            {
                console.log(m_arr);
                endDate = new Date(m_arr.end);
                console.log(endDate);
                if (Date.parse(new Date())>Date.parse(endDate)) 
                    continue;

                $('#cardlink').append(
                    `<div class="card col-sm-3 card_prop">
                        <img class="card-img-top img-responsive" style="width:100%" src="${m_arr.src}" alt="${m_arr.title}">
                        <div class="card-body">
                            <h5 class="card-title">${m_arr.title}</h5>
                            <p class="card-text">${m_arr.desc}</p>
                            <a data-end="${m_arr.end}" data-start="${m_arr.start}" data-price="${m_arr.price}" data-duration="${m_arr.duration}" 
                                class="btn btn-primary" id= "card_btn" onclick="myClick()">Packages</a>
                        </div>
                    </div>`
                );
            }
            
            if($("#cardlink").children().length==0)
            {
                
                showMymodal("Message", "Sorry. No Available Package Exist.<br> Will Be Redirect to Package Page in 3 sec");
                setTimeout(()=>{location.href = '/packages';}, 3000)                
            }


        });

        event.stopPropagation()
        event.preventDefault();
        return false;

    });
    
    $('.nav-stacked li a').focus(function(){
        setTimeout(()=>{$( this ).blur(); console.log('blur');}, 2000);
    }) 
    //////////// when right top login clicked
    $("#login").click(function()
    {
        $("#loginModal").modal();        
    });

    $("#logout").click(function()
    {
        console.log('logout');
        document.cookie = "x-access-token= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
        location.reload(true);
    });

    $(".submit_login").click(function()
    {
        $.ajax({ method: "POST", url: "/login",
            data: { email: $('#uname').val(), pword: $('#psw').val() }
        }).done(function( dat ) {
            console.log(dat);
            location.reload(true);
          //showMymodal('Login', dat);
          //location.reload(true);
        });

        $("#loginModal").modal('toggle'); 
        return false;
    });
   

   /////////// when right top joinus clicked
   $(".submit_joinus").click(function(e)
   {
        $.ajax({ method: "POST", url: "/joinus",
        data: { 
            fname: $('#fname').val(), lname: $('#lname').val(), email: $('#inputEmail').val(), 
            pword: $('#pword').val(), addr1:$('#inputAddress').val(), addr2:$('#inputAddress2').val(), 
            city:$('#inputCity').val(), pv:$('#inputState').val(), pcode:$('#inputZip').val()
        }
        }).done(function( dat ) {
            console.log(dat);
            showMymodal('Registration', dat);
        });

        $("#joinusModal").modal('toggle'); 
        
        return false;
   });


   $("#joinus").click(function()  
   {
       $("#joinusModal").modal();
   });
   
/*   $("#card_btn").click(function()  
   { 
       console.log('clicked');
        showMymodal("Future Feature.", 'Detail Package info will come later.' );
   });
*/

  //Nima

  //https://www.w3schools.com/howto/tryit.asp?filename=tryhow_js_password_val
  var myInput = document.getElementById("pword");
  var letter = document.getElementById("pword_Info_letter");
  var capital = document.getElementById("pword_Info_capital");
  var number = document.getElementById("pword_Info_number");
  var length = document.getElementById("pword_Info_length");

  // When the user clicks on the password field, show the message box
  myInput.onfocus = function() {
    //createMessage(myInput.id);
    document.getElementById("message").style.display = "block";
  }

  // When the user clicks outside of the password field, hide the message box
  myInput.onblur = function() {
    //createMessage(myInput.id);
    document.getElementById("message").style.display = "none";
  }

  // When the user starts to type something inside the password field
  myInput.onkeyup = function() {
    //console.log(letter.classList.value);
    //console.log(letter.classList);

      var fieldStatus = true;
      myInput.validity.valid = false;
    // Validate lowercase letters
    var lowerCaseLetters = /[a-z]/g;
    if(myInput.value.match(lowerCaseLetters)) {  
      letter.classList.remove("invalid");
      letter.classList.add("valid");
    

    } else {
      letter.classList.remove("valid");
      letter.classList.add("invalid");
      fieldStatus = false;
    }
    
    // Validate capital letters
    var upperCaseLetters = /[A-Z]/g;
    if(myInput.value.match(upperCaseLetters)) {  
      capital.classList.remove("invalid");
      capital.classList.add("valid");
    } else {
      capital.classList.remove("valid");
      capital.classList.add("invalid");
      fieldStatus = false;
    }

    // Validate numbers
    var numbers = /[0-9]/g;
    if(myInput.value.match(numbers)) {  
      number.classList.remove("invalid");
      number.classList.add("valid");
    } else {
      number.classList.remove("valid");
      number.classList.add("invalid");
      fieldStatus = false;
    }
    
    // Validate length
    if(myInput.value.length >= 8) {
      length.classList.remove("invalid");
      length.classList.add("valid");
    } else {
      length.classList.remove("valid");
      length.classList.add("invalid");
      fieldStatus = false;
    }
  // set validity to myInput element
    if (fieldStatus){
        myInput.setCustomValidity("");
    }
    else{
      myInput.setCustomValidity("Invalid field.");
    }
  }
//  End of Nima



$(".agnt_btn").click(function()  
{
    showMymodal("Future Feature.", 'More Information about Agent goes here ex. Social Media (picture if availabel).' );
});




});  // End of $(document).ready(function(){

/************ Methods for Modal **********/
function showMymodal(msgHd, MsgBd)
{
    $('#modalMsgHeader').html(msgHd);
    $('#modalMsgBody').html(MsgBd);
    $("#msgModal").modal();
}

function  myClick()
{ 
    let e=$(event.target);
    showMymodal("Package Detail", 'Price: $'+e.attr("data-price")+', Available from: '+e.attr("data-start")
            +' to '+e.attr("data-end")+' Duration: '+e.attr("data-duration")+'days'   );
}

