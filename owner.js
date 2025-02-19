$(document).ready(function () {
   
    $("#formSection").hide();

  
    $('a[href="#formSection"]').on("click", function (event) {
        event.preventDefault();
        $("#formSection").slideToggle(300, function () {
            if ($("#formSection").is(":visible")) {
                $("html, body").animate(
                    {
                        scrollTop: $("#formSection").offset().top,
                    },
                    1000
                );
            }
        });
    });

   
    let studioData = JSON.parse(localStorage.getItem("studioData")) || [
        { image: "2.png", name: "Modern Loft", price: "$1000/mo, 400/week, 50/hr", badge: "Featured" },
        { image: "3.png", name: "Modern Loft", price: "$800/mo", badge: "Popular" },
        { image: "9.png", name: "Modern Loft", price: "$900/mo", badge: "Featured" },
        { image: "0.png", name: "Modern Loft", price: "$1000/mo", badge: "Featured" },
        { image: "..20.png", name: "Modern Loft", price: "$1000/mo", badge: "Featured" },
        { image: "../web/01/3.png", name: "Modern Loft", price: "$1000/mo", badge: "Featured" },
        { image: "../web/01/4.png", name: "Modern Loft", price: "$800/mo", badge: "Popular" },
        { image: "5.png", name: "Modern Loft", price: "$900/mo", badge: "Featured" },
        { image: "../web/01/6.png", name: "Modern Loft", price: "$1000/mo", badge: "Featured" },
        { image: "7.png", name: "Modern Loft", price: "$1000/mo", badge: "Featured" },
        { image: "8.png", name: "Modern Loft", price: "$800/mo", badge: "Popular" },
        { image: "../web/01/9.png", name: "Modern Loft", price: "$900/mo", badge: "Featured" },
        { image: "../web/01/10.png", name: "Modern Loft", price: "$1000/mo", badge: "Featured" }
    ];

  
    let defaultStudioIndex = studioData.length;

  
    let editingStudioIndex = null;

   // Ensure studioData is always an array
   if (!Array.isArray(studioData)) {
    console.error("Invalid studioData format. Resetting.");
    studioData = [];
}

    renderStudioData(studioData);

  
    $("#addStudioForm").on("submit", function (event) {
        event.preventDefault();

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
    
       
 
   $('input[name="rentalTerm"]:checked').each(function () {
    const termValue = $(this).val();
    const price = $(`input[name="${termValue}Price"]`).val();
    
    if (price) {
        let formattedPrice = `$${price}/${termValue.substring(0, 2)}`; // e.g., $100/hr, $500/mo
        newStudio.rentalTerms.push({ term: termValue, price: formattedPrice });
    }
});


const files = $("#studioImages").prop("files");
if (files.length > 0) {
    const reader = new FileReader();
    reader.onload = function (e) {
        newStudio.image = e.target.result;
        saveStudio(newStudio);
    };
    reader.readAsDataURL(files[0]);
} else {
    newStudio.image = "../web/01/7.png"; 
    saveStudio(newStudio);
}
});

     
    function saveStudio(newStudio) {
        if (editingStudioIndex !== null) {
            studioData[editingStudioIndex] = newStudio;
            editingStudioIndex = null;
        } else {
            studioData.push(newStudio);
        }

      
        localStorage.setItem("studioData", JSON.stringify(studioData));

       
        renderStudioData(studioData);

        // Reset form
        $("#addStudioForm")[0].reset();
        $("#formSection").hide();
    }

    // Function to render studio list
    function renderStudioData(data) {
        const $container = $("#studioList");
        $container.empty();

        data.forEach((studio, index) => {
            const $studioDiv = $("<div>").addClass("studio-card").html(`
                <div class="badge">${studio.badge || "Featured"}</div>
                <img src="${studio.image}" alt="Image" onerror="this.src='../web/01/7.png';">
                <div class="card-content">
                    <div class="studio-name">${studio.name}</div>
                    <div class="studio-rental-terms">
                        ${(studio.rentalTerms || []).map(term => term.price).join(", ")}
                    </div>
                </div>
            `);

            // Add edit button
            const $editButton = $("<button>")
                .addClass("edit-btn")
                .text("✏️")
                .attr("data-index", index);

                // Add delete button 🗑️
        const $deleteButton = $("<button>")
        .addClass("delete-btn")
        .text("🗑️")
        .attr("data-index", index); 

            $studioDiv.append($editButton);
            $container.append($studioDiv);
        });
    }

    $(document).on("click", ".edit-btn", function () {
        $("#formSection").slideDown(function () {
            $("html, body").animate(
                { scrollTop: $("#formSection").offset().top },
                1000
            );
        });
    
        editingStudioIndex = $(this).data("index");
        const studio = studioData[editingStudioIndex];
    
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
    
        // Add delete functionality in edit mode
        $("#deleteStudio").off("click").on("click", function () {
            if (confirm("Are you sure you want to delete this studio?")) {
                studioData.splice(editingStudioIndex, 1);
                localStorage.setItem("studioData", JSON.stringify(studioData));
                renderStudioData(studioData);
                $("#formSection").hide();
                editingStudioIndex = null;
            }
        });
    });
    

// Click event for deleting a studio
$(document).on("click", ".delete-btn", function () {
    const index = $(this).data("index");  // Get the studio index

    // Remove the studio from the array
    studioData.splice(index, 1);

    // Save updated data to localStorage
    localStorage.setItem("studioData", JSON.stringify(studioData));

    // Re-render studio data
    renderStudioData(studioData);

    console.log("Studio deleted:", index);
});




});
