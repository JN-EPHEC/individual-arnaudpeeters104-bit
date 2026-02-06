import express from 'express';

const app = express();
const port = 3000;

app.get('/',(req,res) => {
    res.send('Bienvenue sur mon serveur API')
});

app.listen(port, () => {
    console.log(`Serveur lancé sur http://localhost:${port}`);
});

function greet(name: string): string {
    return `Hello, ${name}!`;
}
let message = greet("Arnaud");
console.log(message);
