$(document).ready(function () {
    let studioData = JSON.parse(localStorage.getItem("studioData")) || [];
    let editingStudioIndex = null;

    const user = JSON.parse(localStorage.getItem("loggedInUser")) || {};
    $("#manageStudioBtn").on("click", function () {
        $("#formSection").slideToggle(); // Toggles visibility smoothly
        $("html, body").animate({
            scrollTop: $("#formSection").offset().top
        }, 500);
    });
    


    // Handle form submission
    $("#addStudioForm").on("submit", function (event) {
        event.preventDefault();
        const newStudio = createStudioObject();
        if (!newStudio) return;
        handleImageUpload(newStudio, function () {
            saveStudio(newStudio);
            $("#addStudioForm")[0].reset();
            $("#formSection").hide(); // Hide the form after submission
            renderStudioData(); // Refresh the list
        });
    });

    // Create a new studio object
    function createStudioObject() {
        return {
            name: $("#studioName").val(),
            address: $("#address").val(),
            area: $("#area").val(),
            type: $("#studioType").val(),
            capacity: $("#capacity").val(),
            parking: $("#parking").val() ||"",
            publicTransport: $("#publicTransport").val()|| "",
            availability: $("#availability").val() || "",
            rentalTerms: $('input[name="rentalTerm"]:checked').map(function () {
                return {
                    term: $(this).val(),
                    price: `$${$(this).siblings("input").val()}/${$(this).val().substring(0, 2)}` 
                };
            }).get(),
            image: "",
            primaryKey: user.email
        };
    }

    // Handle image upload
    function handleImageUpload(newStudio, callback) {
        const files = $("#studioImages").prop("files");
        if (files.length > 0) {
            const reader = new FileReader();
            reader.onload = function (e) {
                newStudio.image = e.target.result;
                callback();
            };
            reader.readAsDataURL(files[0]);
        } else {
            newStudio.image = "01/7.png";
            callback();
        }
    }

    // Save or update a studio
    function saveStudio(newStudio) {
        if (editingStudioIndex !== null) {
            studioData[editingStudioIndex] = newStudio; // Update existing studio
        } else {
            studioData.push(newStudio); // Add new studio
        }
        localStorage.setItem("studioData", JSON.stringify(studioData));
    }

    // Initial render (if needed)
    $("#timestamp").text(new Date().getFullYear());
});
