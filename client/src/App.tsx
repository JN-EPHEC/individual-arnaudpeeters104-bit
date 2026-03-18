import { useEffect, useState } from "react";
import "./index.css"; // On importe votre CSS

interface User {
  id: number;
  firstName: string;
  lastName: string;
}

function App() {
  const [data, setData] = useState<User[]>([]);
  
  // États pour le formulaire
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  // Fonction pour récupérer la liste depuis le backend
  const fetchUsers = () => {
    
    fetch(`${import.meta.env.VITE_API_URL}/users`)
      .then(res => res.json())
      .then(result => setData(result))
      .catch(err => console.error(err));
  };

  // Se lance au démarrage de la page
  useEffect(() => {
    fetchUsers();
  }, []);

  // Fonction appelée quand on clique sur "Ajouter"
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Empêche la page de se recharger
    
    // On envoie les données au backend
    
    fetch(`${import.meta.env.VITE_API_URL}/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ firstName, lastName })
    })
    .then(() => {
      fetchUsers(); // On met à jour la liste affichée
      setFirstName(""); // On vide le champ Prénom
      setLastName(""); // On vide le champ Nom
    })
    .catch(err => console.error(err));
  };

  return (
    <div className="container">
      <h1 className="text-center mb-4">Gestion des Utilisateurs de Arnaud</h1>

      <section className="mb-5">
        <h3>Ajouter un utilisateur</h3>
        <form onSubmit={handleSubmit} className="row g-3">
          <div className="col-md-6">
            <label htmlFor="firstName" className="form-label">Prénom</label>
            <input 
              type="text" 
              className="form-control" 
              id="firstName" 
              placeholder="Jean" 
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required 
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="lastName" className="form-label">Nom</label>
            <input 
              type="text" 
              className="form-control" 
              id="lastName" 
              placeholder="Dupont" 
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required 
            />
          </div>
          <div className="col-12">
            <button type="submit" className="btn btn-primary w-100">Ajouter</button>
          </div>
        </form>
      </section>

      <hr />

      <section>
        <h3>Liste des utilisateurs</h3>
        <ul className="list-group">
          {data.length === 0 ? (
            <li className="list-group-item text-muted">Aucun utilisateur pour le moment...</li>
          ) : (
            data.map((item) => (
              <li key={item.id} className="list-group-item user-list-item">
                {item.firstName} {item.lastName}
              </li>
            ))
          )}
        </ul>
      </section>
    </div>
  );
}

export default App;