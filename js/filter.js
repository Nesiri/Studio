$(document).ready(function () {
    const studioData = JSON.parse(localStorage.getItem("studioData")) || [];
    const user = JSON.parse(localStorage.getItem("loggedInUser")) || {};

    
    const modal = document.getElementById("filterModal");
    const closeBtn = document.querySelector(".close");

  
    $("#filter-button").on("click", function () {
        modal.style.display = "block"; 
        if ($(window).width() <= 500) $("#sidebar-active").prop("checked", false);
    });

   
    closeBtn.onclick = function () {
        modal.style.display = "none"; 
    };

   
    window.onclick = function (event) {
        if (event.target === modal) {
            modal.style.display = "none"; // Hide modal if clicked outside
        }
    };

    $("#filterForm").on("submit", function (event) {
        event.preventDefault(); 
        filterStudios(); 
    });

    
    $("#clearFilters").on("click", function () {
    $("#filterForm")[0].reset(); // Clear the form inputs
    window.location.reload(); // Reload the page
});


    // Filter Studios based on user input
    function filterStudios() {
        const filterName = $("#filterName").val().toLowerCase();
        const filterAddress = $("#filterAddress").val().toLowerCase();
        const filterArea = parseInt($("#filterArea").val()) || 0;
        const filterType = $("#filterType").val().toLowerCase();
        const filterCapacity = parseInt($("#filterCapacity").val()) || 0;
        const filterPrice = parseInt($("#filterPrice").val()) || 0;  
        const filterParking = $("#filterParking").val().toLowerCase();  
        const filterAvailability = $("#filterAvailability").val().toLowerCase();  
    
        studioData.forEach((studio, index) => {
            const matchesName = filterName ? studio.name.toLowerCase().includes(filterName) : true;
            const matchesAddress = filterAddress ? studio.address.toLowerCase().includes(filterAddress) : true;
            const matchesArea = filterArea ? studio.area >= filterArea : true;
            const matchesType = filterType ? studio.type.toLowerCase() === filterType : true;
            const matchesCapacity = filterCapacity ? studio.capacity >= filterCapacity : true;
            const matchesPrice = filterPrice ? studio.rentalTerms.some(term => parseInt(term.price.replace(/[^0-9]/g, '')) >= filterPrice) : true;  // Check if price is greater than or equal to filter
            const matchesParking = filterParking ? studio.parking.toLowerCase().includes(filterParking) : true;  // Check if parking matches
            const matchesAvailability = filterAvailability ? studio.availability.toLowerCase().includes(filterAvailability) : true;  // Check if availability matches
    
            // Check if the studio matches the filter
            if (matchesName && matchesAddress && matchesArea && matchesType && matchesCapacity && matchesPrice && matchesParking && matchesAvailability) {
                $(`[data-index="${index}"]`).show(); // Show the studio
            } else {
                $(`[data-index="${index}"]`).hide(); // Hide the studio
            }
        });
    }
    



});
