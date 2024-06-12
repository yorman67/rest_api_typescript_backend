import { Request, Response, NextFunction } from "express";
import { check, validationResult } from "express-validator";

export const handleInputErrors = async (req: Request, res: Response, next: NextFunction) => {
 // Validaciones
    await check("name")
        .notEmpty().withMessage("El nombre es obligatorio")
        .run(req);
    await check("price")
        .isNumeric().withMessage("El precio debe ser un numero")
        .not().isString().withMessage("El precio debe ser un numero")
        .notEmpty().withMessage("El precio es obligatorio")
        .custom((value) => {
            if (value <= 0) {
                throw new Error("El precio debe ser mayor a 0");
            }
            return true;
        })
        .run(req);

    await check("availability")
    .isBoolean().withMessage("La disponibilidad debe ser un booleano")
    .run(req);

    let errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    } next();
}

export const validateId= (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    if (isNaN(Number(id))) {
        return res.status(400).json({ error: "El ID debe ser un numero" });
    }
    next();
}
