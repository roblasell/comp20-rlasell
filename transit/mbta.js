
function parseMBTAdata() {
	str = '[{"Line": "blue", "Station": "Wonderland", "Lat": 42.41342, "Long": -70.991648}, {"Line": "blue", "Station": "Revere Beach", "Lat": 42.40784254, "Long": -70.99253321}, {"Line": "blue", "Station": "Beachmont", "Lat": 42.39754234, "Long": -70.99231944}, {"Line": "blue", "Station": "Suffolk Downs", "Lat": 42.39050067, "Long": -70.99712259}, {"Line": "blue", "Station": "Orient Heights", "Lat": 42.386867, "Long": -71.00473599999999}, {"Line": "blue", "Station": "Wood Island", "Lat": 42.3796403, "Long": -71.02286539000001}, {"Line": "blue", "Station": "Airport", "Lat": 42.374262, "Long": -71.030395}, {"Line": "blue", "Station": "Maverick", "Lat": 42.36911856, "Long": -71.03952958000001}, {"Line": "blue", "Station": "Aquarium", "Lat": 42.359784, "Long": -71.051652}, {"Line": "blue", "Station": "State Street", "Lat": 42.358978, "Long": -71.057598}, {"Line": "blue", "Station": "Government Center", "Lat": 42.359705, "Long": -71.05921499999999}, {"Line": "blue", "Station": "Bowdoin", "Lat": 42.361365, "Long": -71.062037}, {"Line": "orange", "Station": "Oak Grove", "Lat": 42.43668, "Long": -71.07109699999999}, {"Line": "orange", "Station": "Malden Center", "Lat": 42.426632, "Long": -71.07411}, {"Line": "orange", "Station": "Wellington", "Lat": 42.40237, "Long": -71.077082}, {"Line": "orange", "Station": "Sullivan", "Lat": 42.383975, "Long": -71.076994}, {"Line": "orange", "Station": "Community College", "Lat": 42.373622, "Long": -71.06953300000001}, {"Line": "orange", "Station": "North Station", "Lat": 42.365577, "Long": -71.06129}, {"Line": "orange", "Station": "Haymarket", "Lat": 42.363021, "Long": -71.05829}, {"Line": "orange", "Station": "State Street", "Lat": 42.358978, "Long": -71.057598}, {"Line": "orange", "Station": "Downtown Crossing", "Lat": 42.355518, "Long": -71.060225}, {"Line": "orange", "Station": "Chinatown", "Lat": 42.352547, "Long": -71.062752}, {"Line": "orange", "Station": "Tufts Medical", "Lat": 42.349662, "Long": -71.063917}, {"Line": "orange", "Station": "Back Bay", "Lat": 42.34735, "Long": -71.075727}, {"Line": "orange", "Station": "Mass Ave", "Lat": 42.341512, "Long": -71.083423}, {"Line": "orange", "Station": "Ruggles", "Lat": 42.336377, "Long": -71.088961}, {"Line": "orange", "Station": "Roxbury Crossing", "Lat": 42.331397, "Long": -71.095451}, {"Line": "orange", "Station": "Jackson Square", "Lat": 42.323132, "Long": -71.099592}, {"Line": "orange", "Station": "Stony Brook", "Lat": 42.317062, "Long": -71.104248}, {"Line": "orange", "Station": "Green Street", "Lat": 42.310525, "Long": -71.10741400000001}, {"Line": "orange", "Station": "Forest Hills", "Lat": 42.300523, "Long": -71.113686}, {"Line": "red", "Station": "Alewife", "Lat": 42.395428, "Long": -71.142483}, {"Line": "red", "Station": "Davis", "Lat": 42.39674, "Long": -71.121815}, {"Line": "red", "Station": "Porter Square", "Lat": 42.3884, "Long": -71.11914899999999}, {"Line": "red", "Station": "Harvard Square", "Lat": 42.373362, "Long": -71.118956}, {"Line": "red", "Station": "Central Square", "Lat": 42.365486, "Long": -71.103802}, {"Line": "red", "Station": "Kendall/MIT", "Lat": 42.36249079, "Long": -71.08617653}, {"Line": "red", "Station": "Charles/MGH", "Lat": 42.361166, "Long": -71.070628}, {"Line": "red", "Station": "Park Street", "Lat": 42.35639457, "Long": -71.0624242}, {"Line": "red", "Station": "Downtown Crossing", "Lat": 42.355518, "Long": -71.060225}, {"Line": "red", "Station": "South Station", "Lat": 42.352271, "Long": -71.05524200000001}, {"Line": "red", "Station": "Broadway", "Lat": 42.342622, "Long": -71.056967}, {"Line": "red", "Station": "Andrew", "Lat": 42.330154, "Long": -71.057655}, {"Line": "red", "Station": "JFK/UMass", "Lat": 42.320685, "Long": -71.052391}, {"Line": "red", "Station": "North Quincy", "Lat": 42.275275, "Long": -71.029583}, {"Line": "red", "Station": "Wollaston", "Lat": 42.2665139, "Long": -71.0203369}, {"Line": "red", "Station": "Quincy Center", "Lat": 42.251809, "Long": -71.005409}, {"Line": "red", "Station": "Quincy Adams", "Lat": 42.233391, "Long": -71.007153}, {"Line": "red", "Station": "Braintree", "Lat": 42.2078543, "Long": -71.0011385}, {"Line": "red", "Station": "Savin Hill", "Lat": 42.31129, "Long": -71.053331}, {"Line": "red", "Station": "Fields Corner", "Lat": 42.300093, "Long": -71.061667}, {"Line": "red", "Station": "Shawmut", "Lat": 42.29312583, "Long": -71.06573796000001}, {"Line": "red", "Station": "Ashmont", "Lat": 42.284652, "Long": -71.06448899999999}]';
	return JSON.parse(str);
}

function toRad(x) {
	return x * Math.PI / 180;
}

var markers = [];
var map;
var infowindow = new google.maps.InfoWindow();
var xhr;
var scheduleData;
var mbta = parseMBTAdata();
var myLat = 0;
var myLong = 0;
var me = new google.maps.LatLng(myLat, myLong);
var myLoc;
var closest;
var myMarker;

var mapOptions = {
	center: me,
	zoom: 12,
	mapTypeId: google.maps.MapTypeId.ROADMAP
};

function init() {
	map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);

	xhr = new XMLHttpRequest();
	xhr.open("get", "http://mbtamap.herokuapp.com/mapper/rodeo.json", true);
	xhr.onreadystatechange = dataReady;
	xhr.send(null);
	getMyLocation();
}

function getMyLocation() {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function(position) {
			myLat = position.coords.latitude;
			myLong = position.coords.longitude;
			renderMap();
		});
	} else {
		alert("Geolocation is not supported by your browser.");
	}
}

function dataReady()
{
	if (xhr.readyState == 4 && xhr.status == 200) {
		scheduleData = JSON.parse(xhr.responseText);
	} else if (xhr.readyState == 4 && xhr.status == 500) {
		scheduleData = undefined;
	}
}

google.maps.event.addDomListener(window, 'load', init);

function renderMap() {
	me = new google.maps.LatLng(myLat, myLong);
	map.panTo(me);
	myLoc = new google.maps.Marker({
		position: new google.maps.LatLng(myLat, myLong),
		title: "You are here at " + myLat + ", " + myLong,
		icon: "http://google.com/mapfiles/ms/micons/green-dot.png"
	});
	myLoc.setMap(map);

	if (scheduleData == undefined) {
		infowindow.setContent("No schedule data from server. Please try again.");
		infowindow.open(map, myLoc);
		myMarker = myLoc.title;
	} else {
		for (var i = 0; i < mbta.length; i++) {
			if (mbta[i].Line == scheduleData.line) {
				image = 'http://labs.google.com/ridefinder/images/mm_20_' + scheduleData.line + '.png';
				marker = new google.maps.Marker({
					position: new google.maps.LatLng(mbta[i].Lat, mbta[i].Long),
					title: mbta[i].Station,
					icon: image
				});
				markers.push(marker);
			}
		}
		var stops = [];
		for (var j = 0; j < markers.length; j++) {
			markers[j].setMap(map);
			google.maps.event.addListener(markers[j], 'click', makeMapListener(infowindow, map, markers[j]));
			stops.push(markers[j].position);
		}
		var route = new google.maps.Polyline({
			path: stops,
			geodesic: true,
			strokeColor: scheduleData.line,
			strokeOpacity: 0.8,
			strokeWeight: 2
		});
		route.setMap(map);
		closestStation();
		myMarker = "<div>" + myLoc.title + "<br />The closest " + 
		           capitalizeLine(scheduleData.line) + " Line station to you, "
		           + closest.Station + ", is " + Number((closest.Distance).toFixed(1)) + 
		           " miles away</div>";
	}
	google.maps.event.addListener(myLoc, 'click', function() {
		infowindow.setContent(myMarker);
		infowindow.open(map, myLoc)
	});
}

function closestStation() {
	var lat = markers[0].position.k;
	var lng = markers[0].position.A;
	var distance;
	closest = {"Station": markers[0].title, "Distance": haversine(myLat, lat, myLong, lng)};
	for (var m = 1; m < markers.length; m++) {
		lat = markers[m].position.k;
		lng = markers[m].position.A;
		distance = haversine(myLat, lat, myLong, lng);
		if (distance < closest.Distance) {
			closest.Distance = distance;
			closest.Station = markers[m].title;
		}
	}
}

function haversine(lat1, lat2, lng1, lng2) {
	var x1 = lat2 - lat1;
	var dLat = toRad(x1);
	var x2 = lng2 - lng1;
	var dLng = toRad(x2);
	var R = 3963.1676; // in miles, yuck. metric system pwns.
	var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng/2) *Math.sin(dLng/2);
	var c = 2 * Math.atan(Math.sqrt(a), Math.sqrt(1-a));
	return (R * c);
}

function makeMapListener(window, map, marker) {
	return function() {
		var sched = "<table><tr><td>Line</td><td>Trip #</td><td>Direction</td><td>Time Remaining</td></tr>";
		for (var k = 0; k < scheduleData.schedule.length; k++) {
			train = scheduleData.schedule[k];
			pred = train.Predictions;
			for (var l = 0; l < pred.length; l++){
				if (pred[l].Stop == marker.title) {
					sched += "<tr><td>" + capitalizeLine(scheduleData.line) + "</td><td>" + train.TripID +
			         "</td><td>" + train.Destination + "</td>";
					sched += "<td>" + Math.floor((pred[l].Seconds)/60) + ":" + ((pred[l].Seconds) % 60) + "</tc></tr>";
				}
			}
		}
		sched += "</table>";
		window.setContent("<div>" + marker.title + "<br />" + sched + "</div>");
		window.open(map, marker);
	}
}

function capitalizeLine(line)
{
	return line.charAt(0).toUpperCase() + line.slice(1);
}

