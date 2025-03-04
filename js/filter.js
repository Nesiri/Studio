$(document).ready(function () {
    // Open filter modal when clicking the filter button
    $("#filter-button").on("click", function (event) {
        event.preventDefault(); // Prevents default link behavior
        $("#filterModal").fadeIn();
    });

    // Close modal when clicking the close button
    $(".close").on("click", function () {
        $("#filterModal").fadeOut();
    });

    // Close modal when clicking outside the modal content
    $(document).on("click", function (event) {
        if (!$(event.target).closest(".modal-content, #filter-button").length) {
            $("#filterModal").fadeOut();
        }
    });

    // Prevent event propagation when clicking inside modal
    $(".modal-content").on("click", function (event) {
        event.stopPropagation();
    });

    // Apply filter logic
    $("#filterForm").on("submit", function (event) {
        event.preventDefault();

        const filters = {
            name: $("#name").val().trim().toLowerCase(),
            address: $("#address").val().trim().toLowerCase(),
            area: parseInt($("#area").val()) || 0,
            type: $("#type").val().toLowerCase()
        };

        filterStudios(filters);
        $("#filterModal").fadeOut();
    });

    // Function to filter studios
    function filterStudios(filters) {
        const $studioCards = $(".studio-card");
        $studioCards.each(function () {
            const $studioCard = $(this);
            const studioData = $studioCard.data();

            const matchesName = !filters.name || studioData.name.toLowerCase().includes(filters.name);
            const matchesAddress = !filters.address || studioData.address.toLowerCase().includes(filters.address);
            const matchesArea = !filters.area || studioData.area >= filters.area;
            const matchesType = !filters.type || studioData.type.toLowerCase() === filters.type;

            $studioCard.toggle(matchesName && matchesAddress && matchesArea && matchesType);
        });
    }
});
