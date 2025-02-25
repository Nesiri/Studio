

$(document).ready(function () {
   
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

   
    if (loggedInUser) {
        updateNavBar(loggedInUser.userType);
    } 
    
});


function updateNavBar(userType) {
 

    $("#logoutButton").click(function (event) {
        event.preventDefault();
        logout();
    });
}


function logout() {
    
    localStorage.removeItem("loggedInUser");

  
    window.location.href = "index.html";
}
