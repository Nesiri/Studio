$(document).ready(function () {
    let signedUpUsers = JSON.parse(localStorage.getItem("signedUpUsers")) || [];
    let user = JSON.parse(localStorage.getItem("loggedInUser")) || null;
    let studioData = JSON.parse(localStorage.getItem("studioData")) || [];

    console.log("Before update:", { user, signedUpUsers, studioData });

    let userType = user.userType === "owner" ? "owner.html" : "renter.html";

    // Update the home button link
    $("#home").attr("href", userType);

    if (user) {
        const contact = signedUpUsers.find(u => u.email === user.email);
        if (contact) {
            $("#name").val(contact.name || "").prop("disabled", true);
            $("#email").val(contact.email || "").prop("disabled", true);
            $("#phone").val(contact.phone || "").prop("disabled", true);
        }
    }

    $("#updateButton").prop("disabled", false);

    $("#updateButton").click(function (event) {
        event.preventDefault();

        const isDisabled = $("#name").prop("disabled");
        $("input").prop("disabled", !isDisabled);
        $(this).text(isDisabled ? "Save" : "Update");

        if (!isDisabled) {
            const updatedUser = {
                name: $("#name").val(),
                email: $("#email").val(),
                phone: $("#phone").val()
            };

            let userIndex = signedUpUsers.findIndex(u => u.email === user.email);

            if (userIndex !== -1) {
                let oldEmail = signedUpUsers[userIndex].email;

                // Update the user details
                Object.assign(signedUpUsers[userIndex], updatedUser);
                Object.assign(user, updatedUser);

                // Update studioData if it contains references to the old email
                studioData.forEach(studio => {
                    if (studio.primaryKey === oldEmail) {
                        studio.primaryKey = updatedUser.email;
                    }
                });

                // Save changes in localStorage
                localStorage.setItem("loggedInUser", JSON.stringify(user));
                localStorage.setItem("signedUpUsers", JSON.stringify(signedUpUsers));
                localStorage.setItem("studioData", JSON.stringify(studioData));

                console.log("After update:", { user, signedUpUsers, studioData });
            } else {
                console.error("User not found in signedUpUsers!");
            }
        }
    });
});
