import { Request, Response } from "express";
import Product from "../models/Product.model";
import { color } from "console-log-colors";

// este archivo es el controlador


export const getProducts = async (req: Request, res: Response) => {
    try {
        const products = await Product.findAll({
            order: [["id", "ASC"]],
        });
        res.json({ data: products });
    } catch (error) {
        console.log(error);
    }
}

export const getProductsById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const product = await Product.findByPk(id);
        if (!product) {
            res.status(404).json({ message: "Producto no encontrado" });
            return;
        }
        res.json({ data: product });
    } catch (error) {
        console.log(error);
    }
}

export const createProduct = async (req: Request, res: Response) => {
    try {
        console.log(color.yellow(`Inicia registro de producto con los siguientes datos: ${JSON.stringify(req.body)}`));
        const product = await Product.create(req.body);
        res.status(201).json({ data: product });
       
    } catch (error) {
        console.log(error);
    }
}

export const updateProduct = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const product = await Product.findByPk(id);
        if (!product) {
            res.status(404).json({ message: "Producto no encontrado" });
            return;
        }
        const updatedProduct = await product.update(req.body);
        res.json({ data: updatedProduct });
    } catch (error) {
        console.log(error);
    }
}

export const updateAvailability = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const product = await Product.findByPk(id);
        if (!product) {
            res.status(404).json({ message: "Producto no encontrado" });
            return;
        }
        product.availability = product.availability ? false : true;
        const updatedProduct = await product.save();
        res.json({ data: updatedProduct });
    } catch (error) {
        console.log(error);
    }
}

export const deleteProduct = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const product = await Product.findByPk(id);
        if (!product) {
            res.status(404).json({ message: "Producto no encontrado" });
            return;
        }
        await product.destroy();
        res.json({ data: `Producto con el ${id} fue eliminado correctamente` });
    } catch (error) {
        console.log(error);
    }
}



