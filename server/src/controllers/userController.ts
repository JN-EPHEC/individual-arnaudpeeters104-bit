import type { Request, Response } from "express";
import User from "../models/User.js";

// GET /api/users
export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
};

// GET /api/users/:id
// Ajout du typage <{ id: string }> ici pour rassurer TypeScript
export const getUserById = async (req: Request<{ id: string }>, res: Response) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ error: "Utilisateur non trouvé" });
        }
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de la récupération de l'utilisateur" });
    }
};

// POST /api/users
export const createUser = async (req: Request, res: Response) => {
    try {
        const { firstName, lastName } = req.body;
        const newUser = await User.create({ firstName, lastName });
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ error: "Erreur lors de la création de l'utilisateur" });
    }
};

// PUT /api/users/:id
// Ajout du typage <{ id: string }> ici
export const updateUser = async (req: Request<{ id: string }>, res: Response) => {
    try {
        const { firstName, lastName } = req.body;
        const user = await User.findByPk(req.params.id);
        
        if (user) {
            await user.update({ firstName, lastName });
            res.status(200).json(user);
        } else {
            res.status(404).json({ error: "Utilisateur non trouvé" });
        }
    } catch (error) {
        res.status(400).json({ error: "Erreur lors de la mise à jour de l'utilisateur" });
    }
};

// DELETE /api/users/:id
// Ajout du typage <{ id: string }> ici
export const deleteUser = async (req: Request<{ id: string }>, res: Response) => {
    try {
        const deleted = await User.destroy({
            where: { id: req.params.id }
        });
        
        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).json({ error: "Utilisateur non trouvé" });
        }
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de la suppression" });
    }
};