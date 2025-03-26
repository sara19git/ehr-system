import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Digital Health Record API",
            version: "1.0.0",
            description: "API documentation for managing patients, doctors, and medical records",
        },
        servers: [
            {
                url: "http://localhost:8000",
                description: "Development server",
            },
        ],
    },
    apis: ["./routes/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);

const swaggerDocs = (app) => {
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    console.log("Swagger Docs available at http://localhost:8000/api-docs");
};

export default swaggerDocs;
