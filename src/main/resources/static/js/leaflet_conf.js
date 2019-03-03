var osmUrl='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
var osmAttrib='Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors';
var osm = new L.TileLayer(osmUrl, {minZoom: 8, maxZoom: 16, attribution: osmAttrib});		

var map = L.map('map', {
  center: L.latLng(59.9375, 30.308611),
  zoom: 11,
  layers: [osm],
  zoomControl:false
});

L.control.zoom({
     position:'bottomright'
}).addTo(map);

var mcg = L.markerClusterGroup({
  chunkedLoading: true,
  //singleMarkerMode: true,
  spiderfyOnMaxZoom: false
});

for (var i = 0; i < addressPoints.length; i++) {
  var a = addressPoints[i];
  var title = "test";
  var marker = L.marker(new L.LatLng(a[0], a[1]), { title: title });
  marker.bindPopup(title);
  mcg.addLayer(marker);
}

function addMcgLayer(data) {
    map.removeLayer(heat);
    map.removeLayer(mcg);

    mcg = L.markerClusterGroup({
        chunkedLoading: true,
        //singleMarkerMode: true,
        spiderfyOnMaxZoom: false
    });

    data.forEach(function(item) {
        var marker = L.marker(new L.LatLng(item.latitude, item.longitude), {title: item.name});
        marker.bindPopup(item.name);
        mcg.addLayer(marker);
    });
    map.addLayer(mcg);
}

function addHeatLayer(data) {
    map.removeLayer(mcg);
    map.removeLayer(heat);

    var heatLayerPoints = data.map(function(item) {
        return [item.latitude, item.longitude, 1];
    });
    heat = L.heatLayer(heatLayerPoints, {radius: 15, blur : 1, gradient: {0.4: 'blue', 0.65: 'lime', 1: 'red'}})
    map.addLayer(heat);
}

/*

for (var i = 0; i < addressPoints.length; i++) {
  var a = addressPoints2[i];
  var title = "test";
  var marker = L.marker(new L.LatLng(a.latitude, a.longitude), { title: title });
  marker.bindPopup(title);
  mcg.addLayer(marker);
}
*/

map.addLayer(mcg);
//map.removeLayer(mcg);

var heatPoints = [];

addressPoints.forEach(function(entry) {
	heatPoints.push([entry[0], entry[1], 1]);
})
var heat = L.heatLayer(heatPoints, {radius: 15, blur : 1, gradient: {0.4: 'blue', 0.65: 'lime', 1: 'red'}})

/*
var heat = L.heatLayer([
[59.9370985, 30.3213943, 1],
[59.8477173, 30.0279938, 1],
[59.9147076, 30.2821345, 1],
[59.8983939, 30.2844002, 1],
[59.904413, 30.3380212, 1],
[59.8748516, 29.9181053, 1],
[59.8452017, 30.3828905, 1],
[59.9426684, 30.3427321, 1],
[59.8910904, 30.4151007, 1],
[59.9359169, 30.3635686, 1],
[59.8367708, 30.5023363, 1],
[59.7689514, 30.3366212, 1],
[59.9437089, 30.2883222, 1],
[59.9437761, 30.2882498, 1],
[59.9437761, 30.2882793, 1],
[59.9435692, 30.2885153, 1],
[59.9466127, 30.3608283, 1],
[59.9078924, 30.4709031, 1],
[59.9078924, 30.4709031, 1]
], {radius: 15})
*/
//var heatPoints = [];

//addressPoints2.forEach(function(entry) {
//	heatPoints.push([entry.latitude, entry.longitude, 1]);
//})
//var heat = L.heatLayer(heatPoints)

map.addLayer(heat);
map.removeLayer(heat);

var stateChangingButton = L.easyButton({
	position: 'bottomright',
    states: [{
            stateName: 'Cluster',
            icon:      'fa-fire',
            title:     'Change to heatmap',
            onClick: function(btn, map) {
				map.removeLayer(mcg);
				map.addLayer(heat);
                //map.setView([42.3748204,-71.1161913],16);
                btn.state('Heatmap');
            }
    },{
            stateName: 'Heatmap',        // name the state
            icon:      'fa-star',               // and define its properties
            title:     'Change to cluster',      // like its title
            onClick: function(btn, map) {       // and its callback
				map.removeLayer(heat);
				map.addLayer(mcg);
                //map.setView([46.25,-121.8],10);
                btn.state('Cluster');    // change state on click!
            }
        }]
});

stateChangingButton.addTo( map );

function stopDefAction(evt) {
    //evt.preventDefault();
	evt.stopPropagation();
	console.log (evt.type + " fired");
}

document.getElementById('timediv').addEventListener(
    'click', stopDefAction, false
);
document.getElementById('timediv').addEventListener(
    'mousemove', stopDefAction, false
);
document.getElementById('timediv').addEventListener(
    'mousedown', stopDefAction, false
);

document.getElementById('timediv').addEventListener(
    'drag', stopDefAction, false
);
document.getElementById('timediv').addEventListener(
    'input', stopDefAction, false
);
document.getElementById('timediv').addEventListener(
    'change', stopDefAction, false
);