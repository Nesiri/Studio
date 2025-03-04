$(document).ready(function () {
    let studioData = JSON.parse(localStorage.getItem("studioData")) || [];
    let editingStudioIndex = null;
    const user = JSON.parse(localStorage.getItem("loggedInUser")) || {};

    $("#manageStudioBtn").on("click", function () {
        $("#formSection").slideToggle();
        $("html, body").animate({
            scrollTop: $("#formSection").offset().top
        }, 500);
    });

    function renderStudioData() {
        const $container = $("#studioList").empty();
        if (!user) return;

        const userEmail = user.email;
        studioData.forEach((studio, index) => {
            if (!studio || (user.userType === "owner" && studio.primaryKey !== userEmail)) return;

            studio.index = index;

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
                    $("<button>").addClass("edit-btn").text("✏️").on("click", function () {
                        event.stopPropagation();  // Prevent triggering the click event for the modal

                        openFormForEditing(studio, index);
                    }),
                    $("<button>").addClass("delete-btn").text("🗑️").on("click", function (event) {
                        event.preventDefault();
                        event.stopPropagation();
                        deleteStudio(index);
                    })
                );
            }

            $container.append($studioDiv);
        });
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
        $("#formSection").slideDown();
        $("html, body").animate({
            scrollTop: $("#formSection").offset().top
        }, 500);
    }

    $("#addStudioForm").on("submit", function (event) {
        event.preventDefault();
        const newStudio = createStudioObject();
        if (!newStudio) return;

        handleImageUpload(newStudio, function () {
            if (editingStudioIndex !== null) {
                if (!isStudioChanged(studioData[editingStudioIndex], newStudio)) {
                    alert("No changes detected. Studio remains unchanged.");
                    return;
                }
                studioData[editingStudioIndex] = newStudio;
            } else {
                studioData.push(newStudio);
            }

            localStorage.setItem("studioData", JSON.stringify(studioData));
            $("#addStudioForm")[0].reset();
            $("#formSection").slideUp();
            renderStudioData();
        });
    });

    function isStudioChanged(oldStudio, newStudio) {
        return JSON.stringify(oldStudio) !== JSON.stringify(newStudio);
    }

    function createStudioObject() {
        return {
            name: $("#studioName").val().trim(),
            address: $("#address").val().trim(),
            area: $("#area").val().trim(),
            type: $("#studioType").val(),
            capacity: $("#capacity").val(),
            parking: $("#parking").val(),
            publicTransport: $("#publicTransport").val(),
            availability: $("#availability").val(),
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

    renderStudioData();
    $("#timestamp").text(new Date().getFullYear());
});

$(document).ready(function () {
    const studioData = JSON.parse(localStorage.getItem("studioData")) || [];
    const signedUpUsers = JSON.parse(localStorage.getItem("signedUpUsers")) || [];

    function displayStudioDetails(index) {
        const studio = studioData[index];
        if (studio) {
            $("#studioTitle").text(studio.name);
            $("#studioImage").attr("src", studio.image || "");
            $("#name").text(studio.name || "");
            $("#type").text(studio.type || "");
            $("#studioAddress").text(studio.address || "");
            $("#studioArea").text(studio.area ? studio.area + " sq ft" : "");
            $("#parking").text(studio.parking || "Not Available");
            $("#studioCapacity").text(studio.capacity ? studio.capacity + " people" : "");
            $("#availability").text(studio.availability || "");
            $("#transport").text(studio.publicTransport || "");

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
    }

    function displayOwnerContactInfo(studioIndex) {
        const selectedStudio = studioData[studioIndex];
        const ownerPrimaryKey = selectedStudio.primaryKey;
        const owner = signedUpUsers.find((user) => user.email === ownerPrimaryKey);

        if (owner) {
            $("#contactInformation").html(`
                <p><strong>Owner's Contact Information:</strong></p>
                <p>Name: ${owner.name}</p>
                <p>Email: ${owner.email}</p>
                <p>Phone: ${owner.phone}</p>
            `);
        } else {
            $("#contactInformation").html(`
                <p><strong>Owner's Contact Information:</strong></p>
                <p>Information not available.</p>
            `);
        }
    }

    if (studioData.length > 0) {
        displayStudioDetails(0);
    }
    $(document).on("click", ".studio-card", function (event) {
        event.stopPropagation();  // Prevent the event from bubbling up to the document
        
        const studioIndex = $(this).attr("data-index");
        if (studioIndex !== undefined && !isNaN(studioIndex)) {
            console.log("clicked index", studioIndex);
            const $studioDetails = $(".studio-details");
            
            // Add the overlay to darken the background
            if (!$(".studio-details-overlay").length) {
                $("body").append('<div class="studio-details-overlay"></div>');
            }
        
            // If the same studio is clicked again, hide the details
            if ($studioDetails.is(":visible") && $studioDetails.data("index") === studioIndex) {
                $studioDetails.fadeOut();  // Hide the pop-up
                $(".studio-details-overlay").fadeOut();  // Hide the overlay
            } else {
                displayStudioDetails(parseInt(studioIndex));
                $studioDetails
                    .data("index", studioIndex)
                    .fadeIn();  // Show the pop-up
                $(".studio-details-overlay").fadeIn();  // Show the overlay
            }
        }
    });
    
    // Close the pop-up when the close button is clicked
    $(document).on("click", "#closeStudioDetails", function (event) {
        event.stopPropagation();  // Prevent the event from bubbling up to the document
        
        $(".studio-details").fadeOut();  // Hide the studio details pop-up
        $(".studio-details-overlay").fadeOut();  // Hide the overlay
    });
    
    // Close the pop-up when clicking anywhere outside the modal
    $(document).on("click", function (event) {
        const $studioDetails = $(".studio-details");
        
        // Only close if the click is outside the modal and the overlay
        if (!$(event.target).closest($studioDetails).length && !$(event.target).closest(".studio-details-overlay").length) {
            $studioDetails.fadeOut();  // Hide the studio details if clicked outside
            $(".studio-details-overlay").fadeOut();  // Hide the overlay
        }
    });
    
    
});
