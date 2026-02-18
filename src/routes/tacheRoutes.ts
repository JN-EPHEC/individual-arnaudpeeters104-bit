import { Router, type Request, type Response } from 'express';
import Tache from '../models/Tache.js';
import User from '../models/User.js';

const router = Router();

// GET 
router.get('/', async (req: Request, res: Response) => {
    try {
        const taches = await Tache.findAll({
            include: User 
        });
        res.json(taches);
    } catch (error) {
        res.status(500).json({ error: "Erreur serveur" });
    }
});

// POST 
router.post('/', async (req: Request, res: Response) => {
    try {
        const { titre, userId } = req.body; // 'titre' au lieu de 'title'

        if (!titre || titre.trim() === "") {
            res.status(400).json({ error: "Le titre est obligatoire" });
            return;
        }
        if (!userId) {
            res.status(400).json({ error: "L'ID de l'utilisateur est obligatoire" });
            return;
        }

        const user = await User.findByPk(userId);
        if (!user) {
             res.status(404).json({ error: "Utilisateur introuvable" });
             return;
        }

        const nouvelleTache = await Tache.create({ titre, UserId: userId });
        res.status(201).json(nouvelleTache);

    } catch (error) {
        res.status(400).json({ error: "Erreur lors de la création" });
    }
});

// DELETE 
router.delete('/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const deleted = await Tache.destroy({ where: { id } });
        
        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).json({ error: "Tâche non trouvée" });
        }
    } catch (error) {
        res.status(500).json({ error: "Erreur serveur" });
    }
});

export default router;