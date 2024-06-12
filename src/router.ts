import { Router } from "express";
import { createProduct, deleteProduct, getProducts, getProductsById, updateAvailability, updateProduct } from "./handlers/products";
import { handleInputErrors, validateId } from "./middleware";

const router = Router();
/**
 * @swagger
 * components:
 *  schemas:
 *    Product:
 *      type: object
 *      properties:
 *             id:   
 *               type: integer
 *               description: The auto-generated id of the product
 *               example: 1
 *             name:   
 *               type: string
 *               description: The name of the product
 *               example: monitor curvo
 *             price:   
 *               type: number
 *               description: The price of the product
 *               example: 100
 *             availability:   
 *               type: boolean
 *               description: The availability of the product
 *               example: true
 */

/**
 * @swagger
 * /api/products:
 *  get:
 *    summary: Get all products
 *    tags: [Products]
 *    responses:
 *      200:
 *        description: The list of the products
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Product'
 */

/**
 * @swagger
 * /api/products/{id}:
 *  get:
 *    summary: Get a product by id
 *    tags: [Products]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *        description: The product id
 *    responses:
 *      200:
 *        description: The product description by the id
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Product'
 *      404:
 *        description: The product was not found
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  description: The message of error
 *                  example: Product not found
 *      400:
 *            description: The product was not found
 *            content:
 *              application/json:
 *                schema:
 *                  type: object
 *                  properties:
 *                    error:
 *                      type: string
 *                      description: The message of error
 *                      example: bad request - invalid id

 */

/** 
 * @swagger
 * /api/products:
 *  post:
 *    summary: Create a product
 *    tags: [Products]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *              type: object
 *              properties:
 *                  name:
 *                    type: string
 *                    description: The name of the product
 *                    example: monitor curvo
 *                  price:
 *                    type: number
 *                    description: The price of the product
 *                    example: 100
 *                  availability:
 *                    type: boolean
 *                    description: The availability of the product
 *                    example: true
 *    responses:
 *      201:
 *        description: The product was successfully created
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Product'
 *      400: 
 *         description: bad request    
 *      500:
 *        description: Some server error
 */

/** 
 * @swagger
 * /api/products/{id}:
 *  put:
 *    summary: Update a product
 *    tags: [Products]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *        description: The product id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *              type: object
 *              properties:
 *                  name:
 *                    type: string
 *                    description: The name of the product
 *                    example: monitor curvo
 *                  price:
 *                    type: number
 *                    description: The price of the product
 *                    example: 100
 *                  availability:
 *                    type: boolean
 *                    description: The availability of the product
 *                    example: true
 *    responses:
 *      200:
 *        description: The product was successfully updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Product'
 *      400: 
 *         description: bad request
 * 
 *      404: 
 *         description: The product was not found   
 * 
 *      500:
 *        description: Some server error
 */

/**     
 * @swagger 
 *   /api/products/{id}:
 *    patch:
 *      summary: Update availability
 *      tags: [Products]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: integer
 *          required: true
 *          description: The product id
 *      responses:
 *        200:
 *          description: The product was successfully updated
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Product'
 *        400: 
 *           description: bad request
*/

/** 
 *  @swagger
 * /api/products/{id}:
 *  delete:
 *    summary: Delete a product
 *    tags: [Products]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *        description: The product id
 *    responses:
 *      200:
 *        description: The product was delete
 *        content:
 *          application/json:
 *            schema:
 *                type: object
 *                properties:
 *                  data:
 *                      type: string
 *                      description: The message of error
 *                      example: Product deleted

 *                    
 *      404:
 *        description: The product was not found
 */
router.get("/", getProducts);
router.get("/:id", validateId,getProductsById);
router.post("/", handleInputErrors, createProduct);
router.put("/:id", validateId, handleInputErrors, updateProduct);
router.patch("/:id", validateId,updateAvailability);
router.delete("/:id", validateId, deleteProduct);

export default router;