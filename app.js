document.addEventListener('DOMContentLoaded', function () {
  const startPoint = { lat: 28.7565, lng: 77.756578 };
  const endPoint = { lat: 28.9565, lng: 77.706578 };

  const map = L.map('map').setView(startPoint, 13);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
  }).addTo(map);

  const avatarIcon = L.icon({
    iconUrl: 'drown.png', 
    iconSize: [40, 40],
    iconAnchor: [20, 20],
    popupAnchor: [0, -20]
  });

  const avatarMarker = L.marker(startPoint, { icon: avatarIcon }).addTo(map);

  const path = [startPoint, endPoint];

  const line = L.polyline(path, { color: 'blue' }).addTo(map);

  // Move the avatar along the path
  const duration = 30000; // 30 seconds
  const steps = 100;
  const delay = duration / steps;

  let currentStep = 0;

  function moveAvatar() {
    if (currentStep < steps) {
      const ratio = currentStep / steps;
      const lat = startPoint.lat + ratio * (endPoint.lat - startPoint.lat);
      const lng = startPoint.lng + ratio * (endPoint.lng - startPoint.lng);

      avatarMarker.setLatLng({ lat, lng });

      currentStep++;
      setTimeout(moveAvatar, delay);
    }
  }

  moveAvatar();
});