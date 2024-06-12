import swaggerJSDoc from "swagger-jsdoc";
import { SwaggerOptions } from "swagger-ui-express";

const options: swaggerJSDoc.Options = {
    swaggerDefinition: {
        openapi: "3.0.2",
        tags: [
            {
                name: "Products",
                description: "Operations about products"
            }
        ],
        info: {
            title: "REST API with Express and TypeScript",
            version: "1.0.0",
            description: "API documentation for my REST API with Express and TypeScript"
        },
    },
    apis: ["./src/router.ts"], // files containing annotations
};  

const swaggerSpec = swaggerJSDoc(options);

const swaggerUiOptions : SwaggerOptions = {
    customCss: `
    .swagger-ui .topbar {
        display: none;
    }

   `
}
export default swaggerSpec
export {swaggerUiOptions}