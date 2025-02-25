$(document).ready(function () {
    const studioData = JSON.parse(localStorage.getItem("studioData")) || [];
    const signedUpUsers = JSON.parse(localStorage.getItem("signedUpUsers")) || [];
    const user = JSON.parse(localStorage.getItem("loggedInUser")) || null;

    // Hide popup initially
    $("#studioPopup").hide();

    // Add index to each studio
    studioData.forEach((studio, index) => {
        studio.index = index;
        console.log("studio index",index)
    });

     // Open studio popup when a studio card is clicked
     $(document).on("click", ".studio-card", function () {
        const studioIndex = $(this).attr("data-index"); // Ensure data-index is read correctly
        console.log("Studio Index:", studioIndex);

        if (studioIndex !== undefined) {
            const clickedStudio = studioData[studioIndex];
            console.log("Clicked Studio:", clickedStudio);

            if (clickedStudio) {
                openPopup(clickedStudio.index);
                displayOwnerContactInfo(clickedStudio.index);
            }
        }
    });

    // Function to open the studio popup and populate data
    function openPopup(index) {
        const studio = studioData[index];
        $(".term").hide(); // Hide all rental term rows initially

        if (studio) {
            $("#popupTitle").text(studio.name);
            $("#popupImage").attr("src", studio.image || "record.png");
            $("#name").text(studio.name || "");
            $("#type").text(studio.type || "");
            $("#popupAddress").text(studio.address || "");
            $("#popupArea").text(studio.area ? studio.area + " sq ft" : "");
            $("#parking").text(studio.parking || "Not Available");
            $("#popupCapacity").text(studio.capacity ? studio.capacity + " people" : "");
            $("#availability").text(studio.availability || "");
            $("#Transport").text(studio.publicTransport || "");

            // Show rental terms and prices dynamically
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
        }

        $("#studioPopup").show();
    }

    // Close popup when close button is clicked
    $(".close-btn").on("click", function () {
        $("#studioPopup").hide();
    });

    // Close popup when clicking outside of it
    $(window).on("click", function (event) {
        if ($(event.target).is("#studioPopup")) {
            $("#studioPopup").hide();
        }
    });

    // Function to display owner contact info
    function displayOwnerContactInfo(studioIndex) {
        const selectedStudio = studioData[studioIndex];
        const ownerPrimaryKey = selectedStudio.primaryKey;

        const owner = signedUpUsers.find((user) => user.email === ownerPrimaryKey);

        if (owner) {
            $("#contactInformation p").html(`
                <strong>Owner's Contact Information:</strong><br>
                Name: ${owner.name}<br>
                Email: ${owner.email}<br>
                Phone: ${owner.phone}
            `);
        } else {
            $("#contactInformation p").html(`
                <strong>Owner's Contact Information:</strong><br>
                Information not available.
            `);
        }
    }

    // Set up the studio filter modal
    function setupStudioFilter() {
        $("#filter-button").on("click", function () {
            $("#filterModal").toggle();
        });

        $(".close").on("click", function () {
            $("#filterModal").hide();
        });

        $("#filterForm").on("submit", function (event) {
            event.preventDefault();

            const filters = {
                name: $("#name").val().trim().toLowerCase(),
                address: $("#address").val().trim().toLowerCase(),
                type: $("#type").val().toLowerCase(),
                parking: $("#parking").val().toLowerCase(),
                publicTransport: $("#publicTransport").val().toLowerCase(),
                availability: $("#availability").val().toLowerCase(),
                area: parseInt($("#area").val()) || 0,
            };

            filterStudios(filters); // Apply filters
            $("#filterModal").hide();
            $("#reset-filters").show(); // Show the reset button
        });

        // Reset filters and show all studios
        $("#reset-filters").on("click", function () {
            $(".studio-card").show(); // Show all studio cards
            $("#reset-filters").hide(); // Hide the reset button
            $("#filterForm")[0].reset(); // Reset the filter form
        });
    }

    function filterStudios(filters) {
        const $studioCards = $(".studio-card"); // Get all studio cards from the DOM
    
        $studioCards.each(function () {
            const $studioCard = $(this);
            const studioIndex = $studioCard.data("index");
            const studio = studioData[studioIndex];
    
            if (!studio) return;
    
            console.log("Studio Card:", $studioCard);
            console.log("Studio Index:", studioIndex);
            console.log("Studio Data:", studio);
    
            // Ensure correct filter conditions
            const matchesName = !filters.name || studio.name.toLowerCase().includes(filters.name);
            const matchesAddress = !filters.address || studio.address.toLowerCase().includes(filters.address);
            const matchesType = !filters.type || studio.type.toLowerCase() === filters.type;
            const matchesParking = !filters.parking || studio.parking.toLowerCase() === filters.parking;
            const matchesPublicTransport = !filters.publicTransport || studio.publicTransport.toLowerCase() === filters.publicTransport;
            const matchesAvailability = !filters.availability || studio.availability.toLowerCase() === filters.availability;
            const matchesArea = !filters.area || studio.area >= filters.area;
    
            // Check if any filter matches
            const hasFilters = Object.values(filters).some(filter => filter);
            const isMatch = !hasFilters || (matchesName || matchesAddress || matchesType || matchesParking || matchesPublicTransport || matchesAvailability || matchesArea);
    
            console.log("Is Match:", isMatch);
    
            // Show or hide studio based on match
            $studioCard.toggle(isMatch);
        });
    }
    
    // Initialize the filter functionality
    setupStudioFilter();

    // Render initial studio data
   // renderStudioData(studioData);
});
