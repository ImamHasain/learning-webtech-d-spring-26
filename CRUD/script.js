document.addEventListener('DOMContentLoaded', function() {
    fetchUsers();
    document.getElementById('userForm').addEventListener('submit', handleFormSubmit);
});

function fetchUsers() {
    fetch('backend/users.php')
        .then(res => res.json())
        .then(data => renderTable(data));
}

function renderTable(users) {
    const tbody = document.querySelector('#userTable tbody');
    tbody.innerHTML = '';
    users.forEach(user => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${user.id}</td>
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>
                <button onclick="editUser(${user.id})">Edit</button>
                <button onclick="deleteUser(${user.id})">Delete</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

function handleFormSubmit(e) {
    e.preventDefault();
    const id = document.getElementById('userId').value;
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const method = id ? 'PUT' : 'POST';
    fetch('backend/users.php', {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, name, email })
    })
    .then(res => res.json())
    .then(() => {
        document.getElementById('userForm').reset();
        fetchUsers();
    });
}

function editUser(id) {
    fetch('backend/users.php')
        .then(res => res.json())
        .then(users => {
            const user = users.find(u => u.id == id);
            if (user) {
                document.getElementById('userId').value = user.id;
                document.getElementById('name').value = user.name;
                document.getElementById('email').value = user.email;
            }
        });
}

function deleteUser(id) {
    fetch('backend/users.php', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
    })
    .then(res => res.json())
    .then(() => fetchUsers());
}
