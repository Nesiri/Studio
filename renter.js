$(document).ready(function() {
  
    $("#filter-button").on("click", function() {
        $("#filterModal").toggle();
    });

   
    $(".close").on("click", function() {
        $("#filterModal").hide();
    });
});


$(document).ready(function() {
    $("#apply-filters").on("click", function(event) {
        event.preventDefault(); 

        let selectedName = $("#name").val().trim().toLowerCase();
      

        $(".studio-item").each(function() {
            let studioName = ($(this).attr("data-name") || "").trim().toLowerCase();
          
            let matchesType = selectedName ? studioName.includes(selectedName) : true;

            if (matchesType) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });

        $("#filterModal").hide();
    });
});
