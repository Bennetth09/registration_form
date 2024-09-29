document.getElementById('registration-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const dob = new Date(document.getElementById('dob').value);
    const termsAccepted = document.getElementById('terms').checked;

    const age = new Date().getFullYear() - dob.getFullYear();
    const isValidAge = age >= 18 && age <= 55;

    if (!isValidAge) {
        alert('You must be between 18 and 55 years old.');
        return;
    }

   
    const registrationData = { name, email, password, dob: dob.toISOString().split('T')[0], termsAccepted };
    const existingData = JSON.parse(localStorage.getItem('registrations')) || [];
    existingData.push(registrationData);
    localStorage.setItem('registrations', JSON.stringify(existingData));

   
    this.reset();

    
    updateTable();
});

function updateTable() {
    const existingData = JSON.parse(localStorage.getItem('registrations')) || [];
    const tableBody = document.querySelector('#data-table tbody');
    tableBody.innerHTML = '';

    existingData.forEach(data => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${data.name}</td>
            <td>${data.email}</td>
            <td>${data.password}</td>
            <td>${data.dob}</td>
            <td>${data.termsAccepted ? 'Yes' : 'No'}</td>
        `;
        tableBody.appendChild(row);
    });
}


window.onload = updateTable;
