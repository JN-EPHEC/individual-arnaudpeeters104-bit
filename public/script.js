const userForm = document.getElementById('userForm');
const userList = document.getElementById('userList');

document.addEventListener('DOMContentLoaded', () => {
    fetchUsers();
});

async function fetchUsers() {
    try {
        const response = await fetch('/api/users'); // Appel à l'API
        const users = await response.json();
        
        displayUsers(users); // Maj affichage
    } catch (error) {
        console.error('Erreur lors du chargement:', error);
    }
}

function displayUsers(users) {
    userList.innerHTML = ''; // vide la liste éviter les doublons

    users.forEach(user => {
        const li = document.createElement('li');
         // Classe Bootstrap pour le style
        li.className = 'list-group-item d-flex justify-content-between align-items-center';
        
        //crée une URL image unique basée sur le prénom
        const avatar = `https://robohash.org/${user.firstName}?set=set2&size=40x40`;

        li.innerHTML = `
           <div class="d-flex align-items-center">
                <img src="${avatar}" alt="Avatar" class="rounded-circle me-3" style="border: 1px solid #ddd;">
                <span class="fw-bold">${user.firstName} ${user.lastName}</span>
            </div>
            <button class="btn btn-danger btn-sm" onclick="deleteUser(${user.id})">X</button>
        `;
        userList.appendChild(li);
    });
}

//ajoute le user
userForm.addEventListener('submit', async (event) => {
    event.preventDefault(); 

    const firstNameInput = document.getElementById('firstName');
    const lastNameInput = document.getElementById('lastName');

    const newUser = {
        firstName: firstNameInput.value,
        lastName: lastNameInput.value
    };

    try {
        const response = await fetch('/api/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newUser)
        });

        if (response.ok) {
            
            fetchUsers(); 
            userForm.reset();
        } else {
            alert("Erreur lors de l'ajout de l'utilisateur");
        }
    } catch (error) {
        console.error('Erreur:', error);
    }
});

//supp l'user avec la case
window.deleteUser = async (id) => {
    if (!confirm("Voulez-vous vraiment supprimer cet utilisateur ?")) return;

    try {
        const response = await fetch(`/api/users/${id}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            fetchUsers(); // Refresh la liste après supp
        } else {
            alert("Erreur lors de la suppression");
        }
    } catch (error) {
        console.error('Erreur:', error);
    }
};