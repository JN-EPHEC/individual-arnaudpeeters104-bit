import { useEffect, useState } from "react";

// On adapte l'interface pour correspondre à votre base de données
interface User {
  id: number;
  firstName: string;
  lastName: string;
}

function App() {
  const [data, setData] = useState<User[]>([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/users")
      .then(res => res.json())
      .then(result => {
        console.log("Données reçues :", result); // <-- Pour voir ce qui arrive vraiment
        setData(result);
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h1>Liste des utilisateurs</h1>
      <ul>
        {data.map((item) => (
          // On affiche maintenant firstName et lastName
          <li key={item.id}>{item.firstName} {item.lastName}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;