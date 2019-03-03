var osmUrl='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
var osmAttrib='Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors';
var osm = new L.TileLayer(osmUrl, {minZoom: 8, maxZoom: 16, attribution: osmAttrib});		

var map = L.map('map', {
  center: L.latLng(59.9375, 30.308611),
  zoom: 11,
  layers: [osm],
  zoomControl:false
});

var heat;
var mcg;

L.control.zoom({
     position:'bottomright'
}).addTo(map);

function addMcgLayer(data) {
    if (typeof mcg !== 'undefined') map.removeLayer(mcg);
    if (typeof heat !== 'undefined') map.removeLayer(heat);

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
    if (typeof mcg !== 'undefined') map.removeLayer(mcg);
    if (typeof heat !== 'undefined') map.removeLayer(heat);

    var heatLayerPoints = data.map(function(item) {
        return [item.latitude, item.longitude, 1];
    });
    heat = L.heatLayer(heatLayerPoints, {radius: 15, blur : 1, gradient: {0.4: 'blue', 0.65: 'lime', 1: 'red'}})
    map.addLayer(heat);
}

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