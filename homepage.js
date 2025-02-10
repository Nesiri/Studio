$(function(){
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString(); 
    
   

   
    $("#timestamp").text(formattedDate);
    $("header").after('<img src="header.png" alt="Header Image" style="width:100%;">');

    $(".welcome").css({
        "border-radius": "25px", 
        "border": "1px solid black", 
        "width": "80vw",
        "font-size": "1vw",
        "margin-left": "5vw",  
        
        
    });
    
    
    
    $(".welcome img").css({
        "position": "relative",
        "left": "25vw",
        "bottom": "5vw",
        "height": "30%",
        "width": "30%" 
    });
    $(".welcome p,.welcome h3").css({
        "position": "relative",
        "right": "25vw",
        "top": "5vw",
      
    })
    $("h4").each(function(index) {
       
        $(this).css("font-size", "1.5em");
    
        
        const plusImage = '<img src="plus.png" alt="" style="width: 6vw; height: 6vw; display: inline-block; vertical-align: middle; margin-left: 8px;">';
    
       
        if (index % 2 === 0) {
           
            $(this).append(plusImage);
        } else {
            
            $(this).prepend(plusImage);
        }
    });

    $("body").css({
        "border-right": "10px solid rgb(181,172,255)", 
        "border-left": "10px solid rgb(181,172,255)"  
    });



    
    $("footer").css("height", "40%");
   
  
});


$(document).ready(function() {
    $(".rooms .room").each(function(index) {
        if (index % 2 === 0) {
            $(this).addClass("odd");  
        } else {
            $(this).addClass("even"); 
        }
    });

});


// About bar

$(document).ready(function() {
    $("#about-button").click(function(event) {
        event.preventDefault(); 

        
        $("#additional-content").show();

       
        $("html, body").animate({
            scrollTop: $("#additional-content").offset().top
        }, 1000); 
    });
});
  
// log in bar

$(function() {
    const isLoggedIn = false; 

    $(".popup").hide();
   

    $(".rounded-button").click(function(event) {
        event.preventDefault(); 
        $("#loginPopup").show(); 
    });

    
    $("#closeLoginPopup").click(function() {
        $("#loginPopup").hide(); 
    });

   
    $("#closeSignupPopup").click(function() {
        $("#signupPopup").hide(); 
    });

    $(".room a").click(function(event) {
        if (!isLoggedIn) {
            event.preventDefault(); 

           
            $(".rounded-button").css("background-color", "red");

            setTimeout(function() {
                $(".rounded-button").css("background-color", "");
            }, 1000);
        }
    });
});


$(document).ready(function() {
    function adjustNavListPosition() {
        const windowWidth = $(window).width();

        if (windowWidth < 600) {
            $("#navList").css({
               "position": "relative",
               "left":"50px",
               "bottom":"40px",
              
            });
            $(".info a").css({
                "width": "100px",
                
            });

            $(".info h4,.info a").css({
                "font-size":"10px"
                
            });
            $(".rooms").css({
                "padding":"0px",
                "border-radius":"1px",
                "gap":"50px"
            }
            )
            
            $(".welcome p").css("margin-left","10px")


        } else if (windowWidth >= 600 && windowWidth < 1024) {
            $("#navList").css({
                "position": "relative",
                "left":"20vw",
                "bottom":"50px",
                

            });


            $(".info a").css({
                "width": "150px",
                
            });

            $(".info h4,.info a").css({
                "font-size":"20px"
                
            });
            $(".rooms").css({
                "padding":"10px",
                "border-radius":"10px",
                "gap":"50px"
            }
            )


        } else {
            $("#navList").css({
              "position": "relative",
               "left":"30vw",
               "bottom":"70px",
              
            });

            $(".info a").css({
                "width": "200px",
                
            });

            $(".info h4,.info a").css({
                "font-size":"20px"
                
            });
            $(".rooms").css({
                "padding":"20px",
                "border-radius":"20px",
                "gap":"100px"
            }
            )


        }
    }

    adjustNavListPosition();
    $(window).resize(adjustNavListPosition);
});


    
