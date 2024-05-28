$(document).ready(function () {
  let checkedAmenities = {};
  $(".amenities li input").change(function () {
    let amenityName = $(this).attr("data-name");
    let amenityID = $(this).attr("data-id");

    if ($(this).is(":checked")) {
      checkedAmenities[amenityID] = amenityName;
    } else {
      delete checkedAmenities[amenityID];
    }
    // If no keys, we have a &nbsp taking the place for it
    //This will prevent changes in space between elements
    if (Object.keys(checkedAmenities).length != 0) {
      let spanText = Object.values(checkedAmenities).join(", ");
      let newSpan = "<span>" + spanText + "</span>";
      $(".amenities h4").html(newSpan);
    } else {
      $(".amenities h4").html("&nbsp;");
    }

    // Had to make a span inside h4 to apply ellipsis ...
    $(".amenities h4 span").css({
      "white-space": "nowrap",
      overflow: "hidden",
      "text-overflow": "ellipsis",
      "max-width": "205px",
      display: "block",
    });
  });
});
