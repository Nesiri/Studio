document.getElementById('updateProfileForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;

    // Save the updated email and phone (you can use localStorage or send to a server)
    localStorage.setItem('userEmail', email);
    localStorage.setItem('userPhone', phone);

    alert('Profile updated successfully.');
});


