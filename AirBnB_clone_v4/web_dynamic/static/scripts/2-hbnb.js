// static/scripts/2-hbnb.js

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

    if (Object.keys(checkedAmenities).length != 0) {
      let spanText = Object.values(checkedAmenities).join(", ");
      let newSpan = "<span>" + spanText + "</span>";
      $(".amenities h4").html(newSpan);
    } else {
      $(".amenities h4").html("&nbsp;");
    }

    $(".amenities h4 span").css({
      "white-space": "nowrap",
      overflow: "hidden",
      "text-overflow": "ellipsis",
      "max-width": "205px",
      display: "block",
    });
  });

  // Check the status of the API
  $.get('http://0.0.0.0:5001/api/v1/status/', function (data) {
    if (data.status === "OK") {
      $('#api_status').addClass('available');
    } else {
      $('#api_status').removeClass('available');
    }
  });
});
