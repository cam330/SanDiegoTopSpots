

$(document).ready(function(){

window.initMap = function() {

  var myLatLng = {lat: 32.884932, lng: -117.00};

  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 9,
    center: myLatLng
  });

	var spots = $.getJSON("topspots.json",function(result){

		for (var i = 0; i < result.topspots.length; i++){
		
			var myButton = '<button class="showArea btn btn-primary">Open in Google Maps</button>';
			var myrow = "<tr class='tabRow'><td>" + result.topspots[i].name + "</td><td>" + result.topspots[i].description + "</td><td>" + myButton + "</td></tr>";		
			$("#myTable").append($(myrow));

			var spotLatLng = {lat:result.topspots[i].location[0], lng:result.topspots[i].location[1]};

			var infowindow = new google.maps.InfoWindow({

		        });

			var marker = new google.maps.Marker({
				
		    	position: spotLatLng,
		    	map: map,
		    	title: result.topspots[i].name
		  	});

			marker.addListener('click', function(){

				infowindow.setContent((this).title);
				infowindow.open(map, (this));
			});

			google.maps.event.addListener(map, "click", function(event) {

    			infowindow.close();
			});
		} //End of for loop

		$('#myTable tbody td').click(function(){

			var rowIndex = $(this).parent().index()-1;
			var location = result.topspots[rowIndex].location;
			var googleMapsLocation = "https://www.google.com/maps?q="+location;

			var laLatLng = new google.maps.LatLng( location[0],  location[1]);

			$('html,body').animate({
        scrollTop: $("#map").offset().top},
        'slow');


			map.setZoom(17);
			map.panTo(laLatLng);

			window.open(googleMapsLocation);
			console.log(location[0], location[1]);
			});
		}); 
	}

});
