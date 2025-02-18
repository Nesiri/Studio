

$(document).ready(function () {
   
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

   
    if (loggedInUser) {
        updateNavBar(loggedInUser.userType);
    } 
    
});


function updateNavBar(userType) {
    const navList = $("#navList");
    navList.empty();
    if (userType === "owner") {
        navList.append('<li><a href="owner.html">Owner Dashboard</a></li>');
    } else {
        navList.append('<li><a href="renter.html">Renter Dashboard</a></li>');
       
    }

   
    navList.append('<li><button class="rounded-button" id="logoutButton">Logout</button></li>');

    $("#logoutButton").click(function (event) {
        event.preventDefault();
        logout();
    });
}


function logout() {
    
    localStorage.removeItem("loggedInUser");

  
    window.location.href = "homepage.html";
}