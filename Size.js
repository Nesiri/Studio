function adjustStyles() {
    let width = $(window).width();
    
  // alert("Current width:" + width); 

    if (width <= 320) { // For smallest mobile screens
        $("#show-signup").click(function (e) {
            e.preventDefault();  
    
           
            $(".left").hide();  
    
           
            $(".right").show();  
        });
        $("#show-login").click(function (e) {
            e.preventDefault(); 
    
           
            $(".left").show(); 
    
            
            $(".right").show();  
        });
        $("main").css({
            "margin-top": "20px",
            "flex-direction": "column",
            "height": "90vh"
        });

        $(".left").css({
            "width": "100%",  
            "height": "auto",  
            "order": 1  
        });

        $(".right").css({
            "width": "100%",  
            "height": "auto",  
            "order": 2  
        });

        $("body").css({
           
            "font-size": "2vw"  
        });

        $("h1").css({
            position: "relative",
            top: "20px",
            left: "10vw",
            "font-size": "3vw"
        });
        $("h2").css({
            position: "relative",
             top: "15px",
            left: "10vw",
            "font-size": "2vw"
        });

        $("nav a").css({
            position: "relative",
            right: "10vw"
        });

        $(".logo").css({
            position: "relative",
            bottom:"15px",
            "font-size": "1vw"
        });

        $("#brandphoto").css({
            width: "30px",
            height: "30px",
          
        });

     
        
       $("input[type=text],input[type=email]").css({
          display :"block",
          width:"40vw",
          position:"relative",
          right:"30px"
 
       })

       $("input[type=tel]").css({
        display :"block",
        width:"30vw",
        position:"relative",
        right:"30px"
       })
        
       $("#signUp select").css({
        display :"block",
        width:"15vw",
        position:"relative",
        right:"20px"
        
       })
       
       $(".right").css({
        background: "linear-gradient(hsla(0, 80.50%, 36.30%, 0.50), hsla(353, 85.00%, 50.20%, 0.46)), url('../web/01/15.png')",
        "background-size": "cover"
    })
      

    } else if (width > 320 && width <= 480) { // For larger mobile screens
        $("#show-signup").click(function (e) {
            e.preventDefault();  
    
           
            $(".left").hide();  
    
           
            $(".right").show();  
        });
        $("#show-login").click(function (e) {
            e.preventDefault(); 
    
           
            $(".left").show(); 
    
            
            $(".right").show();  
        });
        $("main").css({
            "margin-top": "20px",
            "flex-direction": "column",
            "height": "90vh"
        });

        $(".left").css({
            "width": "100%",  
            "height": "auto",  
            "order": 1  
        });

        $(".right").css({
            "width": "100%",  
            "height": "auto",  
            "order": 2  
        });

        $("body").css({
           
            "font-size": "2vw"  
        });

        $("h1").css({
            position: "relative",
            top: "20px",
            left: "10vw",
            "font-size": "3vw"
        });
        $("h2").css({
            position: "relative",
             top: "15px",
            left: "10vw",
            "font-size": "2vw"
        });

        $("nav a").css({
            position: "relative",
            right: "10vw"
        });

        $(".logo").css({
            position: "relative",
            bottom:"15px",
            "font-size": "1vw"
        });

        $("#brandphoto").css({
            width: "40px",
            height: "40px",
          
        });

     
        
       $("input[type=text],input[type=email]").css({
          display :"block",
          width:"40vw",
          position:"relative",
          right:"30px"
 
       })

       $("input[type=tel]").css({
        display :"block",
        width:"30vw",
        position:"relative",
        right:"30px"
       })
        
       $("#signUp select").css({
        display :"block",
        width:"15vw",
        position:"relative",
        right:"20px"
        
       })
       
       $(".right").css({
        background: "linear-gradient(hsla(142, 74.40%, 45.90%, 0.50), hsla(156, 85.00%, 50.20%, 0.46)), url('../web/01/15.png')",
        "background-size": "cover"
    })
      
       

    } else if (width > 480 && width <= 768) { // For smallest tablets

        $("#show-signup").click(function (e) {
            e.preventDefault();  
    
           
            $(".left").hide();  
    
           
            $(".right").show();  
        });
        $("#show-login").click(function (e) {
            e.preventDefault(); 
    
           
            $(".left").show(); 
    
            
            $(".right").show();  
        });
        $("main").css({
            "margin-top": "20px",
            "flex-direction": "column",
            "height": "90vh"
        });

        $(".left").css({
            "width": "100%",  
            "height": "auto",  
            "order": 1  
        });

        $(".right").css({
            "width": "100%",  
            "height": "auto",  
            "order": 2  
        });

        $("body").css({
           
            "font-size": "2vw"  
        });

        $("h1").css({
            position: "relative",
            top: "20px",
            left: "10vw",
            "font-size": "3vw"
        });
        $("h2").css({
            position: "relative",
             top: "15px",
            left: "10vw",
            "font-size": "2vw"
        });

        $("nav a").css({
            position: "relative",
            right: "10vw"
        });

        $(".logo").css({
            position: "relative",
            bottom:"15px",
            "font-size": "1vw"
        });

        $("#brandphoto").css({
            width: "50px",
            height: "50px",
          
        });

     
        
       $("input[type=text],input[type=email]").css({
          display :"block",
          width:"40vw",
          position:"relative",
          right:"30px"
 
       })

       $("input[type=tel]").css({
        display :"block",
        width:"30vw",
        position:"relative",
        right:"30px"
       })
        
       $("#signUp select").css({
        display :"block",
        width:"15vw",
        position:"relative",
        right:"20px"
        
       })
       
       

    } else if (width > 768 && width <= 1024) { // For larger tablets and smallest laptops
        $("body").css("font-size", "2vw");

        $("h1").css({
            position: "relative",
            top: "20px",
            left: "10vw",
            "font-size": "3vw"
        });
        $("h2").css({
            position: "relative",
             top: "10px",
            left: "10vw",
            "font-size": "2vw"
        });

        $("nav a").css({
            position: "relative",
            right: "10vw"
        });

        $(".logo").css({
            position: "relative",
            bottom:"10px",
            "font-size": "1vw"
        });

        $("#brandphoto").css({
            width: "60px",
            height: "60px",
          
        });

     
        
       $("input[type=text],input[type=email]").css({
          display :"block",
          width:"35vw",
          position:"relative",
          right:"30px"
 
       })

       $("input[type=tel]").css({
        display :"block",
        width:"34vw",
        position:"relative",
        right:"30px"
       })
        
       $("#signUp select").css({
        display :"block",
        width:"80px",
        position:"relative",
        right:"20px"
        
       })
       
       
    } else if (width > 1024 && width <= 1280) { // For medium laptops
        $("body").css("font-size", "2vw");

        $("h1").css({
            position: "relative",
            top: "20px",
            left: "10vw",
            "font-size": "3vw"
        });
        $("h2").css({
            position: "relative",
             top: "0px",
            left: "10vw",
            "font-size": "2vw"
        });

        $("nav a").css({
            position: "relative",
            right: "10vw"
        });

        $(".logo").css({
            position: "relative",
            bottom:"0px",
            "font-size": "1vw"
        });

        $("#brandphoto").css({
            width: "60px",
            height: "60px",
          
        });

     
        
       $("input[type=text],input[type=email]").css({
          display :"block",
          width:"30vw",
          position:"relative",
          right:"30px"
 
       })

       $("input[type=tel]").css({
        display :"block",
        width:"30vw",
        position:"relative",
        right:"30px"
       })
        
       $("#signUp select").css({
        display :"block",
        width:"15vw",
        position:"relative",
        right:"20px"
        
       })
       
      

    } else if (width > 1280 && width <= 1440) { // For larger laptops and small desktops
        $("body").css("font-size", "1.4vw");

        $("h1").css({
            position: "relative",
            top: "20px",
            left: "10vw",
            "font-size": "2vw"
        });
        $("h2").css({
            position: "relative",
             top: "20px",
            left: "10vw",
            "font-size": "1vw"
        });

        $("nav a").css({
            position: "relative",
            right: "10vw"
        });

        $(".logo").css({
            position: "relative",
            bottom:"15px",
            "font-size": "1vw"
        });

        $("#brandphoto").css({
            width: "65px",
            height: "65px",
          
        });

     
        
       $("input[type=text],input[type=email]").css({
          display :"block",
          width:"25vw",
          position:"relative",
          right:"30px"
 
       })

       $("input[type=tel]").css({
        display :"block",
        width:"30vw",
        position:"relative",
        right:"30px"
       })
        
       $("#signUp select").css({
        display :"block",
        width:"15vw",
        position:"relative",
        right:"20px"
        
       })
       
       

    } else { // For largest desktops
        $("body").css("font-size", "1.2vw");

        $("h1").css({
            position: "relative",
            top: "15px",
            left: "10vw",
            "font-size": "2vw"
        });
        $("h2").css({
            position: "relative",
             top: "5px",
            left: "8vw",
            "font-size": "1vw"
        });

        $("nav a").css({
            position: "relative",
            right: "10vw"
        });

        $(".logo").css({
            position: "relative",
            bottom:"10px",
            "font-size": "1vw"
        });

        $("#brandphoto").css({
            width: "70px",
            height: "70px",
          
        });

     
        
       $("input[type=text],input[type=email]").css({
          display :"block",
          width:"25vw",
          position:"relative",
          right:"30px"
 
       })

       $("input[type=tel]").css({
        display :"block",
        width:"30vw",
        position:"relative",
        right:"30px"
       })
        
       $("#signUp select").css({
        display :"block",
        width:"15vw",
        position:"relative",
        right:"20px"
        
       })
       
      
}
}
// Call the function on page load and window resize
$(document).ready(function () {
    adjustStyles();
    $(window).resize(adjustStyles);
});