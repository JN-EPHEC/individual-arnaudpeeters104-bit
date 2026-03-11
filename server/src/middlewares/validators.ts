import type { Request, Response, NextFunction } from 'express';

export const checkIdParam = (req: Request<{ id: string }>, res: Response, next: NextFunction): void => {
    const id = parseInt(req.params.id, 10);
    
    if (isNaN(id)) {
        res.status(400).json({ error: "Requête invalide : L'ID fourni doit être un nombre entier." });
        return;
    }
    
    next();
};