
function getLocation() {
    const status = document.getElementById("location-status");
    const locationInput = document.getElementById("pickup-location");

    if (navigator.geolocation) {
        status.textContent = "Fetching location...";
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;

                fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`)
                    .then(response => response.json())
                    .then(data => {
                        const address = data.address;
                        const place = `${address.road || ''}, ${address.suburb || ''}, ${address.city || address.town || address.village || ''}, ${address.state || ''}, ${address.country || ''}`;
                        locationInput.value = place.trim().replace(/,+/g, ',').replace(/^,|,$/g, '');
                        status.textContent = "Location fetched successfully.";
                    })
                    .catch(() => {
                        status.textContent = "Failed to retrieve address. Please enter manually.";
                    });
            },
            () => {
                status.textContent = "Unable to fetch location. Please enter manually.";
            }
        );
    } else {
        status.textContent = "Geolocation is not supported by this browser.";
    }
}

