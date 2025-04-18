// const userEmail = "{{user.email}}"; // from session in Express if available
//     const data = JSON.parse(localStorage.getItem('submittedServiceData'));
//     data.userEmail = userEmail;
//     const summary = `
//         <strong>Waste Type:</strong> ${data.wasteType}<br>
//         <strong>Amount:</strong> ${data.wasteAmount} kg<br>
//         <strong>Pickup Location:</strong> ${data.pickupLocation}<br>
//         <strong>Pickup Date:</strong> ${data.pickupDate}<br>
//         <strong>Notes:</strong> ${data.additionalNotes || 'None'}
//     `;
//     document.getElementById('summary-details').innerHTML = summary;

//     async function confirmRequest() {
//         try {
//             const response = await fetch('/api/confirmation', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify(data)
//             });

//             if (response.ok) {
//                 await Swal.fire({
//                     icon: 'success',
//                     title: 'Request Confirmed!',
//                     text: 'Your waste pickup request has been submitted successfully.',
//                     confirmButtonColor: '#28a745'
//                 });

//                 localStorage.removeItem('submittedServiceData');
//                 window.location.href = '/';
//             } else {
//                 throw new Error("Server error");
//             }
//         } catch (error) {
//             Swal.fire({
//                 icon: 'error',
//                 title: 'Oops!',
//                 text: 'Something went wrong. Please try again later.'
//             });
//         }
//     }


document.addEventListener('DOMContentLoaded', () => {
    const data = JSON.parse(localStorage.getItem('submittedServiceData'));
    if (data) {
        document.getElementById('wasteType').textContent = data.wasteType || '';
        document.getElementById('wasteAmount').textContent = data.wasteAmount || '';
        document.getElementById('pickupLocation').textContent = data.pickupLocation || '';
        document.getElementById('pickupDate').textContent = data.pickupDate || '';
        document.getElementById('additionalNotes').textContent = data.additionalNotes || '';
        const price = (parseFloat(data.wasteAmount) * 10).toFixed(2);
        document.getElementById('totalPrice').textContent = price;
    }
});

async function confirmRequest() {
   var data = JSON.parse(localStorage.getItem('submittedServiceData'));

    if (!data) {
        alert("No data to submit!");
        return;
    }

    try {
        const response = await fetch('/confirmation', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            localStorage.removeItem('submittedServiceData');
            var popup = document.getElementById("popup");
            popup.classList.add("show");

            setTimeout(() => {
                popup.classList.remove("show");
                window.location.href = 'home_page';
            }, 2500);
        } else {
            throw new Error("Server Error");
        }
    } catch (error) {
        console.error(error);
        alert("Error submitting request.");
        
    }
}


// const submittedData = JSON.parse(localStorage.getItem("submittedServiceData"));

//     // Populate HTML fields with stored data
//     if (submittedData) {
//         document.querySelector("li:nth-child(1)").innerHTML = `<strong>Waste Type:</strong> ${submittedData.wasteType}`;
//         document.querySelector("li:nth-child(2)").innerHTML =` <strong>Amount:</strong> ${submittedData.wasteAmount} kg`;
//         document.querySelector("li:nth-child(3)").innerHTML = `<strong>Pickup Location:</strong> ${submittedData.pickupLocation}`;
//         document.querySelector("li:nth-child(4)").innerHTML = `<strong>Pickup Date:</strong> ${submittedData.pickupDate}`;
//         document.querySelector("li:nth-child(5)").innerHTML = `<strong>Notes:</strong> ${submittedData.additionalNotes}`;
//         document.querySelector("li:nth-child(6)").innerHTML = `<strong>Total Price:</strong> ₹${submittedData.totalPrice}`;
//     }

//     async function showPopup() {
//         try {
//             // Send data to backend
//             await fetch('http://localhost:3000/submit-service', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify(submittedData)
//             });

//             // Show confirmation popup
//             await Swal.fire({
//                 icon: 'success',
//                 title: 'Request Confirmed!',
//                 text: 'Your waste pickup request has been submitted successfully.',
//                 confirmButtonColor: '#28a745',
//                 timer: 2500,
//                 timerProgressBar: true,
//                 showConfirmButton: false
//             });

//             // ✅ Clear the data after submitting
//             localStorage.removeItem("submittedServiceData");

//             // Redirect
//             window.location.href = "home_page";

//         } catch (error) {
//             console.error("Submission failed:", error);
//             Swal.fire("Oops!", "Something went wrong. Try again later.", "error");
//         }
// }


