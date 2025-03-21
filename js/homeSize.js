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

      $("header").css({

        "max-height" :"3vw"
      })


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

       
     
        
       $("input[type=text],input[type=email]").css({
          display :"block",
          width:"45vw",
          position:"relative",
          right:"10px"
 
       })

       $("input[type=tel]").css({
        display :"block",
        width:"30vw",
        position:"relative",
        right:"10px"
       })
        
       $("#signUp select").css({
        display :"block",
        width:"15vw",
        position:"relative",
        right:"5px"
        
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


        
        
        $("input[type=text],input[type=email]").css({
            display :"block",
            width:"45vw",
            position:"relative",
            right:"10px"
   
         })
  
         $("input[type=tel]").css({
          display :"block",
          width:"30vw",
          position:"relative",
          right:"10px"
         })
          
         $("#signUp select").css({
          display :"block",
          width:"15vw",
          position:"relative",
          right:"5px"
          
         })

         $(".gallery").css({

            position :"relative",
            top:"50px"
         })
        $("footer").css({
            "max-height":"20vw"
        })
       


       
        


    } else if (width > 768 && width <= 1024) { // For larger tablets and smallest laptops
        $("body").css("font-size", "2vw");

        

     
        
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