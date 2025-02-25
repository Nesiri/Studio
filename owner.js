$(document).ready(function () {
    // Hide form and popup initially
    $("#formSection").hide();
    $("#studioPopup").hide();
    
    // Load studio data from localStorage
    let studioData = JSON.parse(localStorage.getItem("studioData")) || [];
    const signedUpUsers = JSON.parse(localStorage.getItem("signedUpUsers")) || [];
    const user = JSON.parse(localStorage.getItem("loggedInUser")) || null;
    let editingStudioIndex = null; // Track the index of the studio being edited
    console.log("studio data", studioData);
    console.log("signed", signedUpUsers);
    console.log("log in", user);
   
    // Toggle form section visibility
    $('a[href="#formSection"]').on("click", function (event) {
        event.preventDefault();
        editingStudioIndex = null; // Reset editing index when opening the form for a new studio
        $("#addStudioForm")[0].reset(); // Clear the form
        $("#formSection").slideToggle(300, function () {
            if ($("#formSection").is(":visible")) {
                $("html, body").animate({ scrollTop: $("#formSection").offset().top }, 1000);
            }
        });
    });

    // Render studio data
    renderStudioData(studioData);

    // Handle form submission
    $("#addStudioForm").on("submit", function (event) {
        event.preventDefault();
        
        const newStudio = createStudioObject();
        if (!newStudio) return; // Stop if validation fails

        console.log("New Studio Availability:", newStudio.availability);
        console.log("New Studio public transport:", newStudio.publicTransport);
        console.log("New Studio Parking:", newStudio.parking);
        handleImageUpload(newStudio, function () {
            saveStudio(newStudio);
            $("#addStudioForm")[0].reset(); // Clear the form
        });
    });

    // Function to create a new studio object from form data
    function createStudioObject() {
        

        const newStudio = {
            name: $("#studioName").val(),
            address: $("#address").val(),
            area: $("#area").val(),
            type: $("#studioType").val(),
            capacity: $("#capacity").val(),
            parking: $("#parking").val(),
            publicTransport: $("#publicTransport").val(),
            availability: $("#availability").val(),
            badge: $("#badge").val(),
            rentalTerms: [],
            image: ""
        };

        // Capture rental terms
        $('input[name="rentalTerm"]:checked').each(function () {
            const termValue = $(this).val();
            const price = $(`input[name="${termValue}Price"]`).val();
            if (price) {
                newStudio.rentalTerms.push({ term: termValue, price: `$${price}/${termValue.substring(0, 2)}` });
            }
        });

        console.log("New Studio:", newStudio); // Debug the entire object
        return newStudio;
    }

    // Function to handle image upload
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
            newStudio.image = "../web/01/7.png"; // Default image
            callback();
        }
    }

    // Function to save or update a studio
    function saveStudio(newStudio) {
        if (user && user.userType === "owner") {
            if (!newStudio.primaryKey) {
                newStudio.primaryKey = user.email; // Ensure primaryKey is always set
            }
        }

        if (editingStudioIndex !== null) {
            console.log("Updating existing studio at index:", editingStudioIndex); // Debug
            newStudio.primaryKey = studioData[editingStudioIndex].primaryKey; // Retain primaryKey when editing
            studioData[editingStudioIndex] = newStudio;
        } else {
            console.log("Adding new studio"); // Debug
            studioData.push(newStudio);
        }

        localStorage.setItem("studioData", JSON.stringify(studioData)); // Save updated studios
        renderStudioData(studioData);
        $("#formSection").hide();
        editingStudioIndex = null; // Reset editing index after saving
    }

    // Function to render studio data
    function renderStudioData(data) {
        const $container = $("#studioList");
        $container.empty(); // Clear existing list
      
        const user = JSON.parse(localStorage.getItem("loggedInUser")) || null;
        if (user) {
            const userEmail = user.email;

            data.forEach((studio, index) => {
                if (!studio) return; // Skip if studio is undefined

                studio.index = index; // Ensure index is assigned properly
                // For owners, only show their studios
                if (user.userType === "owner" && studio.primaryKey !== userEmail) {
                    return;
                }

                const $studioDiv = $("<div>")
                    .addClass("studio-card")
                    .attr("data-index", index)
                    .html(`
                        <div class="badge">${studio.badge || "Featured"}</div>
                        <img src="${studio.image}" alt="Studio Image" onerror="this.src='../web/01/7.png';">
                        <div class="card-content">
                            <div class="studio-name">${studio.name}</div>
                            <div class="studio-rental-terms">
                                ${(studio.rentalTerms || []).map(term => term.price).join(", ")}
                            </div>
                           
                        </div>
                    `);
                     // Add edit button for owners
                   if (user.userType === "owner" && studio.primaryKey === userEmail) {
                      const $editButton = $("<button>")
                     .addClass("edit-btn")
                     .text("✏️")
                     .attr("data-index", index)
                     .on("click", function (event) {
                      event.preventDefault(); // Prevent default behavior
                      event.stopPropagation(); // Stop event bubbling
                      openFormForEditing(studio, index);
                   });
                    $studioDiv.append($editButton);
                 }

                     // Add delete button for owners
                    if (user.userType === "owner" && studio.primaryKey === userEmail) {
                      const $deleteButton = $("<button>")
                       .addClass("delete-btn")
                        .text("🗑️")
                       .attr("data-index", index)
                      .on("click", function (event) {
                       event.preventDefault(); // Prevent default behavior
                        event.stopPropagation(); // Stop event bubbling
                     deleteStudio(index);
                   });
                  $studioDiv.append($deleteButton);
                  }

                $container.append($studioDiv);
            });
        }
    }

    // Function to open the form for editing
    function openFormForEditing(studio, index) {
        if (!studio) {
            console.error("Studio object is undefined or null.");
            return;
        }

        console.log("Editing Studio:", studio); // Debug the studio object
        console.log("Editing Index:", index); // Debug the index

        $("#formSection").slideDown(function () {
            $("html, body").animate({ scrollTop: $("#formSection").offset().top }, 1000);
        });

        // Pre-fill form fields
        $("#studioName").val(studio.name);
        $("#address").val(studio.address);
        $("#area").val(studio.area);
        $("#studioType").val(studio.type);
        $("#capacity").val(studio.capacity);
        $("#parking").val(studio.parking); 
       $("#publicTransport").val(studio.publicTransport);
        $("#availability").val(studio.availability); 
        $("#badge").val(studio.badge);

        // Pre-fill rental terms
        studio.rentalTerms.forEach(term => {
            $(`input[name="rentalTerm"][value="${term.term}"]`).prop("checked", true);
            $(`input[name="${term.term}Price"]`).val(term.price.replace(/[^0-9]/g, ''));
        });

        editingStudioIndex = index; // Set editing index
    }

    // Function to delete a studio
    function deleteStudio(index) {
        const confirmation = confirm("Are you sure you want to delete this studio?");
        if (confirmation) {
            studioData.splice(index, 1); // Remove studio from array
            localStorage.setItem("studioData", JSON.stringify(studioData)); // Update localStorage
            renderStudioData(studioData); // Re-render studio data
        }
    }
});
