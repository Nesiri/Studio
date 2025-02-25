$(function(){

    $(".popup").hide();
    
    const currentDate = new Date();
    $("#timestamp").text(currentDate.toLocaleDateString());

    
    $("header").after('<img src="header.png" alt="Header Image" style="width:100%;">');

    
    $(".welcome").css({
        "border-radius": "25px",
        "border": "1px solid black",
        "width": "80vw",
        "font-size": "1vw",
        "margin-left": "5vw"
    });

    $(".welcome img").css({
        "position": "relative",
        "left": "25vw",
        "bottom": "5vw",
        "height": "30%",
        "width": "30%"
    });

    $(".welcome p, .welcome h3").css({
        "position": "relative",
        "right": "25vw",
        "top": "5vw"
    });

    
   

    

    
    $("body").css({
        "border-right": "10px solid rgb(181,172,255)",

        
        "border-left": "10px solid rgb(181,172,255)"
    });

   
    $("footer").css("height", "40%");

  
    $(".rooms .room").each(function(index) {
        $(this).addClass(index % 2 === 0 ? "odd" : "even")
    });

 
   

    $("#about-button").click(function() {
        $("#additional-content").slideToggle(400, function() {
            $("html, body").animate({
                scrollTop: $("#additional-content").offset().top
            }, 500); 
        });
    });


});    

$(function() {
   
    let studioData = JSON.parse(localStorage.getItem("studioData")) || [];

 
    $(".rooms .room img").each(function(index) {
       
        $(this).addClass(index % 2 === 0 ? "odd" : "even").css({
            width: "500px",
            height: "350px"
        });

       
        if (studioData[index]) {
            $(this).attr("src", studioData[index].image);
        }
    });

   
   
    $("h4").each(function(index) {
        if (studioData[index]) {
            $(this).text(studioData[index].name);
    
           
    
            const plusImage = $('<img>', {
                src: "plus.png",
                alt: "",
                css: {
                    width: "6vw",
                    height: "6vw",
                    display: "inline-block",
                    verticalAlign: "middle",
                    marginLeft: "8px"
                }
            });
    
            if (index % 2 === 0) {
                $(this).append(plusImage);  
            } else {
                $(this).prepend(plusImage); 
            }
        }
    });
    
 
for (let i = $(".rooms .room").length; i < studioData.length; i++) {
   
    const newRoom = $('<div>', {
        class: `room ${i % 2 === 0 ? "odd" : "even"}`,
        css: {
            display: "flex",          
            alignItems: "center",    
            gap: "10px"              
        }
    });

   
    const info = $('<div>', {
        class: "info"
    });

   
    const newH4 = $('<h4>').text(studioData[i].name);

  
    const plusImage = $('<img>', {
        src: "plus.png",
        alt: "",
        css: {
            width: "6vw",
            height: "6vw",
            display: "inline-block",
            verticalAlign: "middle",
           
           
        }
    });

   
    if (i % 2 === 0) {
        newH4.append(plusImage).css("margin-right", "200px");  
    } else {
        newH4.prepend(plusImage).css("margin-left", "200px"); 
    }

   
    const moreDetails = $('<a>', {
        href: "#",
        class: "moreDetails",
        text: "more details"
    });

   
    info.append(newH4, moreDetails);

   
    const newImg = $('<img>', {
        src: studioData[i].image,
        css: {
            width: "500px",
            height: "350px"
        }
    });

  
    newRoom.append(info, newImg);

   
    $(".rooms").append(newRoom);
}
$(".rooms .room").each(function (index) { 
    const studioName = $(this).find("h4").text().trim();

    const storedData = JSON.parse(localStorage.getItem("studioData")) || [];
    const studio = storedData.find(item => item.name === studioName);

    if (studio) {
        let roomImage;

        if (index < 5) {
          
            roomImage = $(this).children("img").first();
        } else {
           
            roomImage = $(this).children("img").eq(2);

        }

    
        roomImage.wrap("<div class='badge-container'></div>");

      
        const badgeElement = $('<div>', {
            class: "badge-label",
            text: studio.badge
        });

    
        roomImage.before(badgeElement);
    }
});




});










