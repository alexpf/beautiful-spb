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

var periods;

var currentLayer = "mcg";

L.control.zoom({
     position:'bottomright'
}).addTo(map);

function removeLayers() {
    if (typeof mcg !== 'undefined') map.removeLayer(mcg);
    if (typeof heat !== 'undefined') map.removeLayer(heat);
}

function refreshLayerData(data) {

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

    var heatLayerPoints = data.map(function(item) {
        return [item.latitude, item.longitude, 2];
    });
    heat = L.heatLayer(heatLayerPoints)
}

function addMcgLayer() {
    map.addLayer(mcg);
    currentLayer = "mcg";
}

function addHeatLayer() {
    map.addLayer(heat);
    currentLayer = "heat";
}

var stateChangingButton = L.easyButton({
	position: 'bottomright',
    states: [{
            stateName: 'Cluster',
            icon:      'fa-fire',
            title:     'Change to heatmap',
            onClick: function(btn, map) {
                removeLayers();
                addHeatLayer();
                btn.state('Heatmap');
            }
    },{
            stateName: 'Heatmap',        // name the state
            icon:      'fa-star',               // and define its properties
            title:     'Change to cluster',      // like its title
            onClick: function(btn, map) {       // and its callback
                removeLayers();
                addMcgLayer();
                btn.state('Cluster');    // change state on click!
            }
        }]
});

stateChangingButton.addTo( map );

$("#time").on('change', function(data){
	console.log(data);
	alert(periods[data.value.newValue])
});