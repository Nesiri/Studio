$(document).ready(function () {
    // ===== Toggle Between Login and Signup Forms =====
    $("#show-signup").click(function (event) {
        event.preventDefault();
        $("#logIn").hide();
        $("#signup-form").fadeIn();
    });

    $("#show-login").click(function (event) {
        event.preventDefault();
        $("#signup-form").hide();
        $("#logIn").fadeIn();
    });

// ===== Login Functionality =====
$("#logIn").submit(function (event) {
    event.preventDefault();
    const email = $("#email").val().trim();
    const signedUpUsers = JSON.parse(localStorage.getItem("signedUpUsers")) || [];
    const user = signedUpUsers.find(user => user.email === email);

  
    $("#email-error").remove();

    if (user) {
        localStorage.setItem("loggedInUser", JSON.stringify(user));
        console.log("user",user)
        window.location.href = user.userType === "owner" ? "owner.html" : "renter.html";
    } else {
        
        $("label[for='email']").append('<span id="email-error" style="color: red; font-size: 14px; margin-left: 10px;">This email doesn\'t exist. Please sign up.</span>');

       
        setTimeout(function() {
            $("#email-error").fadeOut(500, function() {
                $(this).remove(); 
            });
        }, 5000);
    }
});





    // ===== Signup Functionality =====
    $("#signUp").submit(function (event) {
        event.preventDefault();
        const name = $("#fullname").val().trim();
        const email = $("#email-signup").val().trim();
        const phone = $("#phone").val().trim();
        const userType = $("input[name='role']:checked").val();
        const countryCode = $("#signup-form select").val();
        if (!name || !email || !phone || !userType || !countryCode) {
            alert("Please fill in all fields.");
            return;
        }
        const signedUpUsers = JSON.parse(localStorage.getItem("signedUpUsers")) || [];
        signedUpUsers.push({ name, email, phone: `${countryCode}${phone}`, userType });
        localStorage.setItem("signedUpUsers", JSON.stringify(signedUpUsers));
        console.log("sign",signedUpUsers)
      
       
        $("#signup-form").hide();
        $("#logIn").fadeIn();
    });

    // ===== Remember Me Checkbox =====
    const rememberCheckbox = $("#remember");
    rememberCheckbox.prop("checked", localStorage.getItem("rememberMe") === "true");
    rememberCheckbox.change(function () {
        localStorage.setItem("rememberMe", this.checked ? "true" : "false");
    });
});


/*
$(document).ready(function () {
    // Fetch Country Codes
    fetch("https://restcountries.com/v3.1/all")
        .then(response => response.json())
        .then(data => {
            let countrySelect = document.querySelector("#countryCode");
            data.sort((a, b) => a.name.common.localeCompare(b.name.common)); // Sort by country name
            data.forEach(country => {
                if (country.idd && country.idd.root) {
                    let option = document.createElement("option");
                   
                    const countryAbbreviation = country.cca3; 
                   
                    option.value = country.idd.root + (country.idd.suffixes ? country.idd.suffixes[0] : "");
                    option.textContent = `${option.value}`;

                  
                    if (countryAbbreviation === "CAN") {
                        option.selected = true;
                    }

                    countrySelect.appendChild(option);
                }
            });
        })
        .catch(error => console.error("Error fetching country codes:", error));
});*/

let time = document.getElementById("timestamp");
time.innerText = new Date().getFullYear();
