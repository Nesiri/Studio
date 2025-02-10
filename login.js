$(document).ready(function () {
   
    $(".popup h2").css({
        "background-color": "#B5ACFF",
        "height": "2.5vw",
        "width": "25.4vw",
        "font-size": "900",
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
       
   // log in bar

   function openPopup(popupId) {
    $(popupId).fadeIn();
}

function closePopup(popupId) {
    $(popupId).fadeOut();
}

$("#openLoginPopup, .rounded-button").click(function (event) {
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
    closePopup($(this).closest(".popup").attr("id"));
});

$(document).mouseup(function (e) {
    const popup = $(".popup-content");
    if (!popup.is(e.target) && popup.has(e.target).length === 0) {
        $(".popup").fadeOut();
    }
});
   
   // log in data

    $("#loginForm").submit(function (event) {
        event.preventDefault();
        const email = $("#email").val();

     
        const signedUpUsers = JSON.parse(localStorage.getItem("signedUpUsers")) || [];
        const user = signedUpUsers.find(user => user.email === email);

        if (user) {
           
            localStorage.setItem("loggedInUser", JSON.stringify(user)); 
            if (user.userType === "owner") {
                window.location.href = "owner.html"; 
            } else {
                window.location.href = "renter.html"; 
            }
        } else {
            alert("Please sign up. This email does not exist.");
        }
    });

    // Signup data

    $("#signupForm").submit(function (event) {
        event.preventDefault();
        const name = $("#name").val();
        const email = $("#signupEmail").val();
        const phone = $("#phone").val();
        const userType = $("input[name='userType']:checked").val();

        // save
        const signedUpUsers = JSON.parse(localStorage.getItem("signedUpUsers")) || [];
        signedUpUsers.push({ name, email, phone, userType });
        localStorage.setItem("signedUpUsers", JSON.stringify(signedUpUsers));

        closePopup("#signupPopup");
    });

    //  country codes
    const countryCodeDropdown = $("#countryCode");

    $.get("https://restcountries.com/v3.1/all", function (data) {
        const countryCodes = data
            .filter(country => country.idd && country.idd.root)
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


    //  successful login
    function simulateLogin() {
        
        const profileLink = $('<li><a href="profile.html">Profile</a></li>');
        $("#navList").append(profileLink);

        // Change "Login" to "Logout"
        const loginButton = $("#openLoginPopup");
        loginButton.text("Logout").attr("id", "logoutButton");

        // call log out
        loginButton.off("click").click(function (event) {
            event.preventDefault();
            logout();
        });
    }

    // Logout
    function logout() {
        
        $("#navList li a[href='profile.html']").parent().remove();

        // Change "Logout" back to "Login"
        const logoutButton = $("#logoutButton");
        logoutButton.text("Login").attr("id", "openLoginPopup");

        
        localStorage.removeItem("rememberMe");

        $("input[name='remember']").prop("checked", false);

       
    }

 
    const rememberCheckbox = $("input[name='remember']");
    rememberCheckbox.prop("checked", localStorage.getItem("rememberMe") === "true");

    rememberCheckbox.change(function () {
        localStorage.setItem("rememberMe", this.checked ? "true" : "false");
    });
});