var WhereCamp = (function ($, L) {
  var eventTemplate = Mustache.compile($('#event_template').html());
  var upcoming = $(".upcoming");
  var past = $(".past");

  function fixDefaultIconScheme() {
    // Work around the Leaflet default marker's protocol-relative URL
    if(window.location.protocol == "file:")
      L.Icon.Default.imagePath = "http:" + L.Icon.Default.imagePath;
  }

  function dashify(text) {
    return text.replace(/ /g,'-');
  };

  function sortDate(a,b){
    var aDate = moment(a.properties.startDate || 0);
    var bDate = moment(b.properties.startDate || 0);

    return aDate.isAfter(bDate) ? 1 : -1;
  };

  function processGeoJSON(json) {
    $(json.features).sort(sortDate).each(function(i,feature) {
      var info = extractEventInfo(feature);
      var eventDiv = $(eventTemplate(info));

      if(moment(info.endDate || 0).isAfter(moment().add('days',1), 'day')) {
        upcoming.append(eventDiv);
      } else {
        past.append(eventDiv);
      }

      if(info.coordinates) {
        var mapDiv = $('<div class="map"></div>');
        eventDiv.append(mapDiv);
        var map = initMap(mapDiv, info, eventDiv.find(".where").html());
      }
    });
  };

  function extractEventInfo(feature) {
    // This is just a reference, not a clone, but mangling
    // feature.properties is okay in this case.
    var info = feature.properties;
    info.id = "hcalendar-" + dashify(info.eventName);
    info.coordinates = coordinatesFrom(feature);

    var formattedDates = formatDateRange(info.startDate, info.endDate);
    info.formattedStartDate = formattedDates.start;
    info.formattedEndDate = formattedDates.end;

    return info
  }

  function coordinatesFrom(feature) {
    return ( 'geometry' in feature && feature.geometry.type == "Point" && "coordinates" in feature.geometry) &&
      {
        longitude: feature.geometry.coordinates[0],
        latitude: feature.geometry.coordinates[1]
      };
  }

  function formatDateRange(startString, endString) {
    var formattedStartDate, formattedEndDate = null;

    var inFormat = "YYYY-MM-DD";
    var start    = moment(startString, inFormat);
    var end      = moment(endString, inFormat);

    if(start.isSame(end, "day")) {
      var formattedStartDate = start.format("MMMM Do, YYYY");
    } else if(start.isSame(end, "month")) {
      var formattedStartDate = start.format("MMMM Do");
      var formattedEndDate = end.format("Do, YYYY");
    } else if(start.isSame(end, "year")) {
      var formattedStartDate = start.format("MMMM Do");
      var formattedEndDate = end.format("MMMM Do, YYYY");
    } else {
      var formattedStartDate = start.format("MMMM Do, YYYY");
      var formattedEndDate = end.format("MMMM Do, YYYY");
    }

    return {
      start: formattedStartDate,
      end: formattedEndDate
    };
  }

  function initMap(mapDiv, info, popupContent) {
    var venueLatLng = new L.LatLng(info.coordinates.latitude, info.coordinates.longitude);
    var zoom        = info.mapZoom || 12;
    var layer       = chooseLayer(info.mapTiles);

    var map = new L.Map(mapDiv[0], {
        center: venueLatLng,
        zoom: zoom,
        zoomControl: false
    });

    map.addLayer(layer);

    map.addControl(new L.Control.Zoom({position: "bottomright"}));
    map.panBy([-1 * (map.getContainer().clientWidth / 6),-50])

    // var marker = L.marker(venueLatLng).addTo(map);
    var popup = L.popup({ closeButton: false, closeOnClick: false })
                  .setLatLng(venueLatLng)
                  .setContent(popupContent)
                  .openOn(map);

    return map;
  }

  function chooseLayer(mapTiles) {
    var tileString  = mapTiles || "terrain";

    if(tileString in stamen.tile.providers) {
      var layer = new L.StamenTileLayer(tileString);
    } else if(tileString.indexOf("{x}") > -1) {
      var layer = new L.tileLayer(tileString);
    } else {
      var layer = L.mapbox.tileLayer(tileString);
    }

    return layer;
  }


  return {
    go: function() {
      $(".title").fitText();
      fixDefaultIconScheme();
      $.getJSON("wherecamps.geojson", processGeoJSON);
    }
  }
}(jQuery, L));

WhereCamp.go();
