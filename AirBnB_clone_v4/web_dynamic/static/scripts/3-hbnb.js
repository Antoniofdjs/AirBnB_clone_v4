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

  $.get("http://127.0.0.1:5001/api/v1/status/", data => {
    if (data.status === "OK") {
      $("#api_status").addClass("available");
    }  else {
      $('#api_status').removeClass("available");
    }
  });

	$.ajax({
    url: "http://0.0.0.0:5001/api/v1/places_search/",
    type: "POST",
    contentType: "application/json",
    data: JSON.stringify({}),
    success: function(data) {
      for (let place of data) {
        let article = $("<article></article>");
        let titleBox = $("<div class='title_box'></div>");
        let title = $("<h2></h2>").text(place.name);
        let priceByNight = $("<div class='price_by_night'></div>").text(`$${place.price_by_night}`);

        titleBox.append(title);
        titleBox.append(priceByNight);

        let information = $("<div class='information'></div>");
        let maxGuest = $("<div class='max_guest'></div>").text(`${place.max_guest} Guest${place.max_guest !== 1 ? 's' : ''}`);
        let numberRooms = $("<div class='number_rooms'></div>").text(`${place.number_rooms} Bedroom${place.number_rooms !== 1 ? 's' : ''}`);
        let numberBathrooms = $("<div class='number_bathrooms'></div>").text(`${place.number_bathrooms} Bathroom${place.number_bathrooms !== 1 ? 's' : ''}`);

        information.append(maxGuest);
        information.append(numberRooms);
        information.append(numberBathrooms);

        let description = $("<div class='description'></div>").html(place.description);

        article.append(titleBox);
        article.append(information);
        article.append(description);

        $("section.places").append(article);
      }
    }
  });
});
