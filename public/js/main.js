
// When DOM is ready
$(document).ready(function(){
    const slideImgWidth=993;
    const slideImgHeight=332;

    $('.flex__container').height(slideImgHeight);
    $('.flex__container').width(slideImgWidth);
    $('.flex__container').css("margin-left", `calc( (100%/2) - (${slideImgWidth}px/2))`);  /* put it middle of screen */

    //////////////////////// setting for slider ////////////////////////
/*    
    const arr_imgLink =      // array of all infos for nav-item and slideShow
    [
        {
            title:"Asia", // side menu item
            img:"img/asia.jpg", // slide show
            link:"http://english.visitkorea.or.kr/enu/index.kto",
            desc:"There are so many place to visit in Asia!"  // for description below slide-show
        },
        {
            title:"Mekong", // side menu item
            img:"img/mekong.jpg", // slide show
            link:"http://english.visitkorea.or.kr/enu/index.kto",
            desc:"There are so many place to visit in Asia!"  // for description below slide-show
        },
        {
            title:"Nature", 
            img:"img/nature.jpg", 
            link:"https://caen-keepexploring.canada.travel/",
            desc:"Canada is great country!"
        },
        {
            title:"Adventure", 
            img:"img/adventure.jpg", 
            link:"https://caen-keepexploring.canada.travel/",
            desc:"Canada is great country!"
        },
        {
            title:"Europe", 
            img:"img/europetour.jpg", 
            link:"https://visiteurope.com/en/destinations/",
            desc:"You have to visit Europe if you haven't visit yet."
        },

        {
            title:"Cruise", 
            img:"img/rivercruise.jpg", 
            link:"https://visiteurope.com/en/destinations/",
            desc:"You have to visit Europe if you haven't visit yet."
        },
        {
            title:"Resort", 
            img:"img/resort.jpg", 
            link:"https://www.lonelyplanet.com/mexico",
            desc:"There are great deal's going on for Mexico!"
        },
    ];
*/
    $.post("/sliderlink",(arr_imgLink)=>{   // process arealink json from server
         console.log(arr_imgLink); 
         for(let m_arr of arr_imgLink)
         {
             let str=   // add images for slide-show
             `<div class="slideItem" title="${m_arr.title}">
                <a href="${m_arr.href}"> <img class="imgSlide" src="${m_arr.src}" width="${slideImgWidth}" height="${slideImgHeight}" /></a>
             </div>`;
             $('#slideShow').append( str );
         }
    },"json").then(()=>{
        $('#slideShow').bbslider({  // slideShow settings
            timer:3000, loop:true, controls: true, auto: true, 
            callbackAfter:callAfter, transition: 'slide',
    
            duration:500,
            controlsText:[
                '<a class="prev control fa fa-angle-left" href="#"></a>',
                '<a class="next control fa fa-angle-right" href="#"></a>',
            ],
        });
        if($('#slideShow').height()<slideImgHeight)
            $('#slideShow').height(slideImgHeight);
//        if($('.slideItem').height()<slideImgHeight)
//            $('.slideItem').height(slideImgHeight);
    });    

    const callAfter = function() // callback after image switching
    {
        const pIndex = $('#slideShow').data('pIndex');  // current image index

        if($('#slideShow').data('autoPlay')===false)  // need to reset slidshow autuplay when 'prev' or 'next' clicked. 
        {
            $('#slideShow').data('autoPlay',true);
            $('#slideShow')['bbslider']('autoPlayReset');
        }
    };
    /************ End of Setting Slider *************/


    /////////////// Start of arealink /////////////////
    $.post("/arealink",(dat)=>{   // process arealink json from server
        //console.log(dat);
        let m_arr;
        for( m_arr of dat)
        {
            //console.log(m_arr)
            $('#arealinks').append(
                `<div class="col-sm-4" style="margin-bottom:2em;">
                    <button type="button" class="btn btn-primary" onclick="location.href='${m_arr.href}'" >${m_arr.title}</button>
                    <a href="${m_arr.href}"><img src="${m_arr.src}" class="img-responsive area_img" style="width:100%" alt="${m_arr.title}"></a>
                </div>`);
        }

        /* console.log(arealinks) */
    },"json");    
    /************ End of arealink *************/

    $(window).resize(function(){
        if($('#slideShow').height()<slideImgHeight)
            $('#slideShow').height(slideImgHeight);
    });

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
    $(".submit_joinus").click(function()
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




});  // End of $(document).ready(function(){

/************ Methods for Modal **********/
function showMymodal(msgHd, MsgBd)
{
    $('#modalMsgHeader').html(msgHd);
    $('#modalMsgBody').html(MsgBd);
    $("#msgModal").modal();
}
/*
function modalClose(evt) {
    $("#myModal").css("display" , "none");
}
*/


