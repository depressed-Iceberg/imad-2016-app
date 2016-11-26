var gMapAPIKey='AIzaSyDpGPvX8TOalQ_kyzk2Wpx0rmEvlJxiPAo';
var key= 'AIzaSyArkFLQB5ijw3y-W6mBy9B0jElyOvF79W4';

var map;
function initMap() {
    map = new google.maps.Map(document.getElementById('hplusMap'), {
          center: {lat: 39.29817, lng: -122.16797},
          zoom: 8,
          mapTypeId: google.maps.MapTypeId.HYBRID
        });
}
