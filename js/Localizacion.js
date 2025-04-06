// Comprobar si la geolocalización está disponible

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
        const userLat = position.coords.latitude;
        const userLng = position.coords.longitude;

        // Crear el mapa y centrarlo en la ubicación del usuario
        const map = L.map('map').setView([userLat, userLng], 13);

        // Cargar el mapa de OpenStreetMap
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        // Ubicación del negocio
        const businessLat = 38.35128; // Latitud
        const businessLng = -0.49681; // Longitud

        const marker = L.marker([businessLat, businessLng]).addTo(map);
        marker.bindPopup("<b>Skaramuza13</b><br>Av de los Condes de Soto Ameno").openPopup();

        // Ruta desde la ubicación del usuario hasta el negocio
        L.Routing.control({
            waypoints: [
                L.latLng(userLat, userLng), // Coordenadas del usuario
                L.latLng(businessLat, businessLng) // Coordenadas del negocio
            ],
            routeWhileDragging: true
        }).addTo(map);
        
    });
} else {
    alert("Geolocalización no está disponible en este navegador.");
}