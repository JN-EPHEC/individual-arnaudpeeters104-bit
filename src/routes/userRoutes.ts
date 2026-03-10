import { Router, type Request, type Response } from 'express';
import User from '../models/User.js';
import * as userController from "../controllers/userController.js";

const router = Router();

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Récupère la liste des utilisateurs
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Succès
 */
router.get("/", userController.getAllUsers);

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Crée un nouvel utilisateur
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *     responses:
 *       201:
 *         description: Utilisateur créé avec succès
 *       400:
 *         description: Erreur lors de la création de l'utilisateur
 */
router.post('/', async (req: Request, res: Response) => {
    try {
        const { firstName, lastName } = req.body;
        const newUser = await User.create({ firstName, lastName });
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ error: "Erreur lors de la création de l'utilisateur" });
    }
});

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Supprime un utilisateur via son ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de l'utilisateur à supprimer
 *     responses:
 *       204:
 *         description: Utilisateur supprimé avec succès
 *       404:
 *         description: Utilisateur non trouvé
 *       500:
 *         description: Erreur lors de la suppression
 */
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