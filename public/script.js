const userForm = document.getElementById('userForm');
const userList = document.getElementById('userList');
const tacheForm = document.getElementById('tacheForm');
const tacheList = document.getElementById('tacheList');


document.addEventListener('DOMContentLoaded', () => {
    fetchUsers();
    fetchTaches();
});

async function fetchUsers() {
    try {
        const response = await fetch('/api/users');
        const users = await response.json();
        userList.innerHTML = '';
        
        users.forEach(user => {
            const li = document.createElement('li');
            li.className = 'list-group-item d-flex justify-content-between align-items-center';
            
            
            const avatar = `https://robohash.org/${user.firstName}?set=set2&size=40x40`;

            li.innerHTML = `
                <div class="d-flex align-items-center">
                    <img src="${avatar}" class="me-3 rounded-circle" style="border: 1px solid #ddd;" alt="avatar">
                    <div>
                        <span class="fw-bold">${user.firstName} ${user.lastName}</span>
                        <span class="text-danger fw-bold ms-2">(ID: ${user.id})</span>
                    </div>
                </div>
                <button class="btn btn-outline-danger btn-sm" onclick="deleteUser(${user.id})">X</button>
            `;
            userList.appendChild(li);
        });
    } catch (e) { console.error(e); }
}

// Ajout User
userForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    
    await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstName, lastName })
    });
    fetchUsers();
    userForm.reset();
});

// Supp User
window.deleteUser = async (id) => {
    if(confirm('Supprimer cet utilisateur ?')) {
        await fetch(`/api/users/${id}`, { method: 'DELETE' });
        fetchUsers();
        fetchTaches(); // On rafraîchit aussi les tâches
    }
};

// GESTION DES TÂCHES 
async function fetchTaches() {
    try {
        const response = await fetch('/api/taches');
        const taches = await response.json();
        tacheList.innerHTML = '';

        if (taches.length === 0) {
            tacheList.innerHTML = '<li class="list-group-item text-muted">Aucune tâche en cours.</li>';
            return;
        }

        taches.forEach(tache => {
            const li = document.createElement('li');
            li.className = 'list-group-item d-flex justify-content-between align-items-center';
            
            
            const assigneA = tache.User 
                ? `<span class="badge bg-primary">${tache.User.firstName}</span>` 
                : `<span class="badge bg-secondary">ID ${tache.UserId}</span>`;

            li.innerHTML = `
                <div>
                    ${assigneA} <span class="ms-2 fw-bold">${tache.titre}</span>
                </div>
                <button class="btn btn-sm text-danger" onclick="deleteTache(${tache.id})">&times;</button>
            `;
            tacheList.appendChild(li);
        });
    } catch (e) { console.error(e); }
}

// Ajout Tâche
tacheForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const userId = document.getElementById('tacheUserId').value;
    const titre = document.getElementById('tacheTitre').value;

    const response = await fetch('/api/taches', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, titre })
    });

    if (response.ok) {
        fetchTaches();
        tacheForm.reset();
    } else {
        alert("Erreur: Vérifiez que l'ID utilisateur existe !");
    }
});

// Supp Tâche
window.deleteTache = async (id) => {
    await fetch(`/api/taches/${id}`, { method: 'DELETE' });
    fetchTaches();
};