
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

// form get
document.getElementById('service-form').addEventListener('submit', function (e) {
    e.preventDefault();

    // const data = {
    //     wasteType: document.getElementById('waste-type').value,
    //     wasteAmount: document.getElementById('waste-amount').value,
    //     pickupLocation: document.getElementById('pickup-location').value,
    //     pickupDate: document.getElementById('pickup-date').value,
    //     additionalNotes: document.getElementById('additional-notes').value
    // };

     // Get the required input elements
     const wasteTypeInput = document.getElementById('waste-type');
     const amountInput = document.getElementById('waste-amount');
     const locationInput = document.getElementById('pickup-location');
     const pickupDateInput = document.getElementById('pickup-date');
     const notesInput = document.getElementById('additional-notes');

    const serviceData = {
        wasteType: wasteTypeInput.value,
        wasteAmount: amountInput.value,
        pickupLocation: locationInput.value,
        pickupDate: pickupDateInput.value,
        additionalNotes: notesInput.value
    };
    
    // Store data temporarily in localStorage
    localStorage.setItem('submittedServiceData', JSON.stringify(serviceData));

    // Redirect to confirmation page
    window.location.href = '/confirmation';
});



