$(document).ready(function () {
    // Initialize data
    const studioData = JSON.parse(localStorage.getItem("studioData")) || [];
    const signedUpUsers = JSON.parse(localStorage.getItem("signedUpUsers")) || [];
    const user = JSON.parse(localStorage.getItem("loggedInUser")) || {};
    let editingStudioIndex = null;
   console.log("total studio",studioData)
    // DOM Elements
    const $formSection = $("#formSection");
    const $addStudioForm = $("#addStudioForm");
    const $studioList = $("#studioList");
    const $studioDetails = $(".studio-details");
    const $timestamp = $("#timestamp");

    // Event Handlers
    $("#manageStudioBtn").on("click", toggleFormSection);
    $addStudioForm.on("submit", handleFormSubmit);
    $(document).on("click", ".studio-card", handleStudioCardClick);
    $(document).on("click", "#closeStudioDetails, .studio-details-overlay", closeStudioDetails);

    // Functions
    function toggleFormSection() {
        $formSection.slideToggle();
        $("html, body").animate({ scrollTop: $formSection.offset().top }, 500);
        if ($(window).width() <= 500) $("#sidebar-active").prop("checked", false);
    }

    function handleFormSubmit(event) {
        event.preventDefault();

        // Create a new studio object
        const newStudio = createStudioObject();
        if (!newStudio) return;

        // Handle image upload
        const files = $("#studioImages").prop("files");
        if (files.length > 0) {
            const reader = new FileReader();
            reader.onload = function (e) {
                newStudio.image = e.target.result; // Set the image URL
                saveStudioAndUpdateUI(newStudio); // Save and update the UI
            };
            reader.readAsDataURL(files[0]); // Read the file as a data URL
        } else {
            newStudio.image = "01/7.png"; // Default image if no file is selected
            saveStudioAndUpdateUI(newStudio); // Save and update the UI
        }
    }

    function saveStudioAndUpdateUI(newStudio) {
        if (editingStudioIndex !== null && !isStudioChanged(studioData[editingStudioIndex], newStudio)) {
            alert("No changes detected. Studio remains unchanged.");
            return;
        }

        // Save or update the studio
        if (editingStudioIndex !== null) studioData[editingStudioIndex] = newStudio;
        else studioData.push(newStudio);

        // Update localStorage and reset the form
        localStorage.setItem("studioData", JSON.stringify(studioData));
        $addStudioForm[0].reset();
        $formSection.slideUp();
        renderStudioData(); // Refresh the studio list
    }

    function handleStudioCardClick(event) {
        event.stopPropagation();
        const studioIndex = $(this).attr("data-index");
        if (studioIndex === undefined || isNaN(studioIndex)) return;

        if ($studioDetails.is(":visible") && $studioDetails.data("index") === studioIndex) {
            $studioDetails.fadeOut();
            $(".studio-details-overlay").fadeOut();
        } else {
            displayStudioDetails(parseInt(studioIndex));
            $studioDetails.data("index", studioIndex).fadeIn();
            $(".studio-details-overlay").fadeIn();
        }
    }

    function closeStudioDetails(event) {
        event.stopPropagation();
        $studioDetails.fadeOut();
        $(".studio-details-overlay").fadeOut();
    }

    function renderStudioData() {
        $studioList.empty();
        if (!user) return;

        const userEmail = user.email;
        studioData.forEach((studio, index) => {
            if (!studio || (user.userType === "owner" && studio.primaryKey !== userEmail)) return;

            const $studioDiv = createStudioCard(studio, index, userEmail);
            $studioList.append($studioDiv);
        });
    }

    function createStudioCard(studio, index, userEmail) {
        const $studioDiv = $(`
            <div class="studio-card" data-index="${index}">
                <img src="${studio.image}" alt="Studio Image" onerror="this.src='01/7.png';">
                <div class="card-content">
                    <div class="studio-name">${studio.name}</div>
                    <div class="studio-rental-terms">${(studio.rentalTerms || []).map(term => term.price).join(", ")}</div>
                </div>
            </div>
        `);

        if (user.userType === "owner" && studio.primaryKey === userEmail) {
            $studioDiv.append(
                $("<button>").addClass("edit-btn").text("✏️").on("click", function (event) {
                    event.preventDefault();
                    event.stopPropagation();
                    openFormForEditing(studio, index);
                }),
                $("<button>").addClass("delete-btn").text("🗑️").on("click", function (event) {
                    event.preventDefault();
                    event.stopPropagation();
                    deleteStudio(index);
                })
            );
        }

        return $studioDiv;
    }

    function deleteStudio(index) {
        if (confirm("Are you sure you want to delete this studio?")) {
            studioData.splice(index, 1);
            localStorage.setItem("studioData", JSON.stringify(studioData));
            renderStudioData();
        }
    }

    function openFormForEditing(studio, index) {
        $("#studioName").val(studio.name);
        $("#address").val(studio.address);
        $("#area").val(studio.area);
        $("#studioType").val(studio.type);
        $("#capacity").val(studio.capacity);
        $("#parking").val(studio.parking);
        $("#publicTransport").val(studio.publicTransport);
        $("#availability").val(studio.availability);

        $('input[name="rentalTerm"]').prop("checked", false);
        studio.rentalTerms.forEach(term => {
            $(`input[name="rentalTerm"][value="${term.term}"]`).prop("checked", true);
            $(`input[name="${term.term}Price"]`).val(term.price.replace(/[^0-9]/g, ''));
        });

        editingStudioIndex = index;
        console.log("editing studio index",editingStudioIndex)
      
        $formSection.slideDown();
        $("html, body").animate({ scrollTop: $formSection.offset().top }, 500);
    }

    function createStudioObject() {
        const newStudio = {
            name: $("#studioName").val().trim(),
            address: $("#address").val().trim(),
            area: $("#area").val().trim(),
            type: $("#studioType").val(),
            capacity: $("#capacity").val(),
            parking: $("#parking").val() || "",
            publicTransport: $("#publicTransport").val() || "",
            availability: $("#availability").val() || "",
            rentalTerms: [],
            image: "",
            primaryKey: user.email
        };

        $('input[name="rentalTerm"]:checked').each(function () {
            newStudio.rentalTerms.push({
                term: $(this).val(),
                price: `$${$(this).siblings("input").val()}/${$(this).val().substring(0, 2)}`
            });
        });

        return newStudio;
    }

    function isStudioChanged(oldStudio, newStudio) {
        return JSON.stringify(oldStudio) !== JSON.stringify(newStudio);
    }

    function displayStudioDetails(index) {
        const studio = studioData[index];
        console.log("displaiyed studio",studioData[index])
        if (!studio) return;

        $("#studioTitle").text(studio.name);
        $("#studioImage").attr("src", studio.image || "");
        $("#name").text(studio.name || "");
        $("#type").text(studio.type || "");
        $("#studioAddress").text(studio.address || "");
        $("#studioArea").text(studio.area ? studio.area + " sq ft" : "");
        $("#parking").text(String(studio.parking));

        $("#studioCapacity").text(studio.capacity ? studio.capacity + " people" : "");
        $("#availability").text(studio.availability || "");
        $("#transport").text(studio.publicTransport || "");
        console.log("parking",studio.parking)
     
        $(".term").hide();
        if (studio.rentalTerms && studio.rentalTerms.length > 0) {
            studio.rentalTerms.forEach((term) => {
                $(".term").each(function () {
                    const termText = $(this).find("td:first").text().trim().toLowerCase();
                    if (termText === term.term.toLowerCase()) {
                        $(this).show();
                        $(this).find(".price").text(term.price);
                    }
                });
            });
        }

        displayOwnerContactInfo(index);
    }

    function displayOwnerContactInfo(studioIndex) {
        const selectedStudio = studioData[studioIndex];
        const ownerPrimaryKey = selectedStudio.primaryKey;
        const owner = signedUpUsers.find((user) => user.email === ownerPrimaryKey);

        $("#contactInformation").html(`
            <p><strong>Owner's Contact Information:</strong></p>
            ${owner ? `
                <p>Name: ${owner.name}</p>
                <p>Email: ${owner.email}</p>
                <p>Phone: ${owner.phone}</p>
            ` : `<p>Information not available.</p>`}
        `);
    }

    // Initialization
    renderStudioData();
    $timestamp.text(new Date().getFullYear());
});



$(document).ready(function () {
    // Remove inline styles from body and main that might mess things up
    $("body, main, html").removeAttr("style");

    // Force correct CSS
    $("html, body").css({
        "height": "100% !important",
        "margin": "0 !important",
        "padding": "0 !important",
        "display": "flex !important",
        "flex-direction": "column !important"
    });

    $("main").css({
        "flex": "1 !important",
        "display": "flex !important"
    });

    $("footer").css({
        "margin-top": "auto" // Forces footer to stick at the bottom
    });
});
