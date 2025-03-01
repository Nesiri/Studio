function adjustStyles() {
    let width = $(window).width();
    
    alert("Current width: " + width); 

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
    } else if (width > 768 && width <= 1024) { // For larger tablets and smallest laptops
        // No additional behavior for this range
    } else if (width > 1024 && width <= 1280) { // For medium laptops
        // No additional behavior for this range
    } else if (width > 1280 && width <= 1440) { // For larger laptops and small desktops
        // No additional behavior for this range
    } else { // For largest desktops
        // No additional behavior for this range
    }
}

// Call the function on page load and window resize
$(document).ready(function () {
    adjustStyles();
    $(window).resize(adjustStyles);
});