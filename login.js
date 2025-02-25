

$(document).ready(function () {
    // ===== Popup Styling =====
    $(".popup h2").css({
        "background-color": "#B5ACFF",
        "height": "2.5vw",
        "width": "25.4vw",
        "font-size": "1.5rem",  
        "font-weight": "900",   
        "color": "white",
        "text-align": "center",
        "display": "block",
        "border-radius": "2px",
        "margin": "0",
        "padding": "10px 0",
        "position": "relative",
        "bottom": "1.3vw",
        "right": "1.3vw"
    });

    // ===== Popup Management =====
    function openPopup(popupId) {
        $(popupId).fadeIn();
    }

    function closePopup(popupId) {
        $(popupId).fadeOut();
    }

    $(".rounded-button").click(function (event) {
        event.preventDefault();
        openPopup("#loginPopup");
    });

    $("#openSignupPopup").click(function (event) {
        event.preventDefault();
        openPopup("#signupPopup");
    });

    $("#switchToLogin").click(function (event) {
        event.preventDefault();
        closePopup("#signupPopup");
        openPopup("#loginPopup");
    });

    $("#closeLoginPopup, #closeSignupPopup").click(function () {
        $(this).closest(".popup").fadeOut(); 
    });

    $(document).mouseup(function (e) {
        const popup = $(".popup-content");
        if (!popup.is(e.target) && popup.has(e.target).length === 0) {
            $(".popup").fadeOut();
        }
    });
    

    // ===== Login Functionality =====
    $("#loginForm").submit(function (event) {
        event.preventDefault();
        const email = $("#email").val().trim();

        
        // Retrieve signed-up users from localStorage
        const signedUpUsers = JSON.parse(localStorage.getItem("signedUpUsers")) || [];
        const user = signedUpUsers.find(user => user.email === email);

        if (user) {
            localStorage.setItem("loggedInUser", JSON.stringify(user));
           
          updateNavBar(user.userType);

          window.location.href = user.userType === "owner" ? "owner.html" : "renter.html";
        } else {
           
            $("label:first").append('<span class="error">This email doesn\'t exist</span>');

            $(".error").css({
                position: "relative",
                left: "5px",
                
                color: "red",
                "font-size": "15px"
            }).delay(5000).fadeOut();   
            
        }
    });

    // ===== Signup Functionality =====
    $("#signupForm").submit(function (event) {
        event.preventDefault();
        const name = $("#name").val().trim();
        const email = $("#signupEmail").val().trim();
        const phone = $("#phone").val().trim();
        const userType = $("input[name='userType']:checked").val();

        if (!name || !email || !phone || !userType) {
            alert("Please fill in all fields.");
            return;
        }

        const signedUpUsers = JSON.parse(localStorage.getItem("signedUpUsers")) || [];
        signedUpUsers.push({ name, email, phone, userType });
        localStorage.setItem("signedUpUsers", JSON.stringify(signedUpUsers));

        closePopup("#signupPopup");
    });

    // ===== Country Codes =====
    const countryCodeDropdown = $("#countryCode");

    $.get("https://restcountries.com/v3.1/all", function (data) {
        const countryCodes = data
            .filter(country => country.idd && country.idd.root) // Ensure IDD exists
            .map(country => ({
                code: country.idd.root + (country.idd.suffixes ? country.idd.suffixes[0] : ""),
                countryShort: country.cca3
            }))
            .sort((a, b) => a.countryShort.localeCompare(b.countryShort));

        countryCodes.forEach(item => {
            countryCodeDropdown.append(
                `<option value="${item.code}">${item.countryShort} (${item.code})</option>`
            );
        });

        countryCodeDropdown.val("+1");
    });

    countryCodeDropdown.on("change", function () {
        $("#phone").val($(this).val());
    });

    // ===== Remember Me Checkbox =====
    const rememberCheckbox = $("input[name='remember']");
    rememberCheckbox.prop("checked", localStorage.getItem("rememberMe") === "true");

    rememberCheckbox.change(function () {
        localStorage.setItem("rememberMe", this.checked ? "true" : "false");
    });

 // ===== More Details Button Behavior =====
$(document).on("click", ".moreDetails", function (event) {
    event.preventDefault();
   
    
    $(this).focus();

  
    const details = $(this).closest(".info").find(".room-details");

    $(".room-details").not(details).slideUp();

    $(".moreDetails").not(this).removeClass("expanded");

    details.slideToggle();

    $(this).toggleClass("expanded");

    if ($(this).hasClass("expanded")) {
        $(this).css("background-color", "white"); 
    }
   

});

$(document).on("mouseenter", ".moreDetails:not(.expanded)", function () {
    $(this).css("background-color", "green");
});


$(document).on("mouseleave", ".moreDetails:not(.expanded)", function () {
    $(this).css("background-color", "");
});


$(document).on("click", function (event) {
    if (!$(event.target).closest(".moreDetails").length) {
        $(".moreDetails").css("background-color", "");
    }
});


$(document).on("click", function (event) {
    if (!$(event.target).closest(".moreDetails, .room-details").length) {
        $(".room-details").slideUp();
        $(".moreDetails").removeClass("expanded");
    }
});
   

$(".rooms").on("click", ".room", function () {
   
    $(this).toggleClass("expanded");

  
    if ($(this).hasClass("expanded")) {
        
        const studioName = $(this).find("h4").text().trim();

       
        const storedData = JSON.parse(localStorage.getItem("studioData")) || [];
        const studio = storedData.find(item => item.name === studioName);

       
        if (studio) {
           
            const detailsList = $('<ul>', {
                class: "studio-details",
                css: {
                    marginTop: "10px",
                    listStyle: "none",
                    padding: "0",
                    color:"black"
                }
            });

          
            detailsList.append(`<li><strong>Name:</strong> ${studio.name}</li>`);
            detailsList.append(`<li><strong>Address:</strong> ${studio.address}</li>`);
            detailsList.append(`<li><strong>Area:</strong> ${studio.area}</li>`);
            detailsList.append(`<li><strong>Type:</strong> ${studio.type}</li>`);
            detailsList.append(`<li><strong>Capacity:</strong> ${studio.capacity}</li>`);
            detailsList.append(`<li><strong>Parking:</strong> ${studio.parking}</li>`);
            detailsList.append(`<li><strong>Public Transport:</strong> ${studio.publicTransport}</li>`);
            detailsList.append(`<li><strong>Availability:</strong> ${studio.availability}</li>`);
          

          
            if (studio.rentalTerms && studio.rentalTerms.length > 0) {
                const rentalList = $('<ul>', { class: "rental-terms" });
                studio.rentalTerms.forEach(term => {
                    rentalList.append(`<li><strong>${term.term}:</strong> ${term.price}</li>`);
                });
                detailsList.append(`<li><strong>Rental Terms:</strong>`, rentalList);
            }

            
            $(this).find(".moreDetails").append(detailsList);
        }
    } else {
        // Remove details when collapsed
        $(this).find(".studio-details").remove();
    }
});


   
});
