// User Management Portal JS (AJAX CRUD)
document.addEventListener('DOMContentLoaded', function() {
    fetchUsers();
    document.getElementById('userForm').addEventListener('submit', handleFormSubmit);
    document.getElementById('resetBtn').addEventListener('click', resetForm);
});

// Fetch all users (READ)
function fetchUsers() {
    fetch('backend/users.php')
        .then(res => res.json())
        .then(data => renderTable(data))
        .catch(() => showMessage('Failed to load users', 'error'));
}

// Render user table
function renderTable(users) {
    const tbody = document.querySelector('#userTable tbody');
    tbody.innerHTML = '';
    if (!users.length) {
        tbody.innerHTML = '<tr><td colspan="4" style="text-align:center;">No users found.</td></tr>';
        return;
    }
    users.forEach(user => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${user.id}</td>
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>
                <button class="edit-btn" onclick="editUser(${user.id})">Edit</button>
                <button class="delete-btn" onclick="deleteUser(${user.id})">Delete</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

// Handle form submit (CREATE/UPDATE)
function handleFormSubmit(e) {
    e.preventDefault();
    const id = document.getElementById('userId').value;
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    if (!name || !email) {
        showMessage('Name and Email are required.', 'error');
        return;
    }
    const method = id ? 'PUT' : 'POST';
    const btn = document.getElementById('submitBtn');
    btn.disabled = true;
    btn.textContent = id ? 'Updating...' : 'Adding...';
    fetch('backend/users.php', {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, name, email })
    })
    .then(res => res.json())
    .then(data => {
        showMessage(id ? 'User updated!' : 'User added!', 'success');
        resetForm();
        fetchUsers();
    })
    .catch(() => showMessage('Failed to save user', 'error'))
    .finally(() => {
        btn.disabled = false;
        btn.textContent = id ? 'Update User' : 'Add User';
    });
}

// Edit user (populate form)
function editUser(id) {
    fetch('backend/users.php')
        .then(res => res.json())
        .then(users => {
            const user = users.find(u => u.id == id);
            if (user) {
                document.getElementById('userId').value = user.id;
                document.getElementById('name').value = user.name;
                document.getElementById('email').value = user.email;
                document.getElementById('submitBtn').textContent = 'Update User';
            }
        });
}

// Delete user (DELETE)
function deleteUser(id) {
    if (!confirm('Are you sure you want to delete this user?')) return;
    fetch('backend/users.php', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
    })
    .then(res => res.json())
    .then(() => {
        showMessage('User deleted!', 'success');
        fetchUsers();
    })
    .catch(() => showMessage('Failed to delete user', 'error'));
}

// Reset form
function resetForm() {
    document.getElementById('userForm').reset();
    document.getElementById('userId').value = '';
    document.getElementById('submitBtn').textContent = 'Add User';
}

// Show feedback message
function showMessage(msg, type) {
    let msgBox = document.getElementById('msgBox');
    if (!msgBox) {
        msgBox = document.createElement('div');
        msgBox.id = 'msgBox';
        document.querySelector('.container').prepend(msgBox);
    }
    msgBox.textContent = msg;
    msgBox.className = type;
    setTimeout(() => { msgBox.textContent = ''; msgBox.className = ''; }, 2000);
}
