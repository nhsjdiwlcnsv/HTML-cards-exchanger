const swaggerJSDoc = require("swagger-jsdoc");


const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "HTML cards exchanger API ",
            version: "1.0.0",
            description: "API documentation for Express.js application",
        },
    },
    apis: ["./app/routes/*.js"],
    components: {
        schemas: {
            User: {
                type: "object",
                properties: {
                    id: {
                        type: "string",
                        description: "Unique identifier for the user",
                        example: "64bf99e9a8f6a9c9d2c12345",
                    },
                    username: {
                        type: "string",
                        description: "Unique username for the user",
                        example: "john_doe",
                    },
                    email: {
                        type: "string",
                        description: "Unique email for the user",
                        example: "user@mail.com",
                    },
                    password: {
                        type: "string",
                        description: "Hashed password of the user",
                        example: "$2b$10$abc123...",
                    },
                },
                required: ["username", "email", "password"],
            },
        },
    }
}

const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;