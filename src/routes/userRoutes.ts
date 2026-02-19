import { Router, type Request, type Response } from 'express';
import User from '../models/User.js';
import * as userController from "../controllers/userController.js";

const router = Router();

/*interface Users {
    id: number;
    name: string;
}

const users: Users[] = [
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" },
]; 

router.get('/', (req: Request, res: Response) => {
    res.json(users);
}); */

//recupe les users
/*router.get('/', async (req: Request, res: Response) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de la récupération des utilisateurs" });
    }
});*/


router.get("/", userController.getAllUsers);


//creer les users
router.post('/', async (req: Request, res: Response) => {
    try {
        const { firstName, lastName } = req.body;
        const newUser = await User.create({ firstName, lastName });
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ error: "Erreur lors de la création de l'utilisateur" });
    }
});

//supprimer les users
router.delete('/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const deleted = await User.destroy({
            where: { id: id }
        });
        
        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).json({ error: "Utilisateur non trouvé" });
        }
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de la suppression" });
    }
});

export default router;