// Fallback coordinates if listing geometry is missing or invalid
const defaultLocation = [25.0143, 82.8417]; // [lat, lng]
const coordinates = (listing && listing.geometry && listing.geometry.coordinates && listing.geometry.coordinates.length === 2) 
    ? [listing.geometry.coordinates[1], listing.geometry.coordinates[0]] // Mapbox [lng, lat] -> Leaflet [lat, lng]
    : defaultLocation;

const map = L.map('map').setView(coordinates, 9);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

const marker = L.marker(coordinates).addTo(map)
    .bindPopup(`<h4>${listing.title}</h4><p>Exact location provided after booking</p>`);

if (coordinates === defaultLocation) {
    marker.setPopupContent(`<h4>${listing.title}</h4><p>Location not found, showing default area</p>`);
}
