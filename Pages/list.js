$(document).ready(function() {
    // Load existing listings from local storage
    loadListings();

    // Add Studio Form Submission
    $("#addStudioForm").on("submit", function(event) {
        event.preventDefault();

        // Collect rental terms and prices
        const rentalTerms = {};
        $("input[name='rentalTerm']:checked").each(function() {
            const term = $(this).val();
            const price = $(`input[name='${term}Price']`).val();
            if (price) {
                rentalTerms[term] = parseFloat(price); // Convert to number
            }
        });

        // Create studio object
        const studio = {
            name: $("#name").val(),
            address: $("#address").val(),
            area: $("#area").val(),
            type: $("#type").val(),
            capacity: $("#capacity").val(),
            parking: $("#parking").val(),
            publicTransport: $("#publicTransport").val(),
            availability: $("#availability").val(),
            rentalTerms: rentalTerms, // Save as an object
        };

        // Save to local storage
        saveStudio(studio);

        // Clear the form
        $("#addStudioForm")[0].reset();

        // Reload listings
        loadListings();
    });

    // Function to save a studio to local storage
    function saveStudio(studio) {
        let listings = JSON.parse(localStorage.getItem("studioListings")) || [];
        listings.push(studio);
        localStorage.setItem("studioListings", JSON.stringify(listings));
    }

    // Function to load listings from local storage
    function loadListings() {
        const listings = JSON.parse(localStorage.getItem("studioListings")) || [];
        const tbody = $("#listingsTable tbody");
        tbody.empty();

        listings.forEach((studio, index) => {
            // Format rental terms and prices
            const rentalTerms = Object.entries(studio.rentalTerms)
                .map(([term, price]) => `${term}: $${price}`)
                .join(", <br> ");

            const row = `
                <tr>
                    <td>
                        <input type="radio" name="selectedStudio" value="${index}">
                        ${index + 1} <!-- Serial Number -->
                    </td>
                    <td>${studio.name}</td>
                    <td>${studio.address}</td>
                    <td>${studio.area}</td>
                    <td>${studio.type}</td>
                    <td>${studio.capacity}</td>
                    <td>${studio.parking}</td>
                    <td>${studio.publicTransport}</td>
                    <td>${studio.availability}</td>
                    <td>${rentalTerms}</td>
                </tr>
            `;
            tbody.append(row);
        });
    }

    // Function to delete a studio
    $("#deleteButton").on("click", function() {
        const selectedIndex = $("input[name='selectedStudio']:checked").val();
        if (selectedIndex !== undefined) {
            deleteStudio(selectedIndex);
        } else {
            alert("Please select a studio to delete.");
        }
    });

    // Function to edit a studio
    $("#editButton").on("click", function() {
        const selectedIndex = $("input[name='selectedStudio']:checked").val();
        if (selectedIndex !== undefined) {
            editStudio(selectedIndex);
        } else {
            alert("Please select a studio to edit.");
        }
    });

    // Function to delete a studio
    function deleteStudio(index) {
        let listings = JSON.parse(localStorage.getItem("studioListings"));
        listings.splice(index, 1);
        localStorage.setItem("studioListings", JSON.stringify(listings));
        loadListings();
    }

    // Function to edit a studio
    function editStudio(index) {
        const listings = JSON.parse(localStorage.getItem("studioListings"));
        const studio = listings[index];

        // Populate the form with the studio's data
        $("#name").val(studio.name);
        $("#address").val(studio.address);
        $("#area").val(studio.area);
        $("#type").val(studio.type);
        $("#capacity").val(studio.capacity);
        $("#parking").val(studio.parking);
        $("#publicTransport").val(studio.publicTransport);
        $("#availability").val(studio.availability);

        // Populate rental terms and prices
        $("input[name='rentalTerm']").prop("checked", false); // Uncheck all
        $("input[name^='rentalTermPrice']").val(""); // Clear all price inputs
        Object.entries(studio.rentalTerms).forEach(([term, price]) => {
            $(`input[name='rentalTerm'][value='${term}']`).prop("checked", true);
            $(`input[name='${term}Price']`).val(price);
        });

        // Remove the old entry
        deleteStudio(index);
    }
});