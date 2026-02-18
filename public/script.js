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
        li.className = 'list-group-item'; // Classe Bootstrap pour le style
        li.textContent = `${user.firstName} ${user.lastName}`; 
        userList.appendChild(li);
    });
}

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