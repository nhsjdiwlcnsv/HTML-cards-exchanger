const swaggerJSDoc = require("swagger-jsdoc");

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "HTML cards exchanger API",
            version: "1.0.0",
            description: "API documentation for Express.js application",
        },
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
                Postcard: {
                    type: "object",
                    required: ["owner", "title", "description", "frame", "shareableLink"],
                    properties: {
                        _id: {
                            type: "string",
                            description: "The unique identifier of the postcard.",
                        },
                        owner: {
                            type: "string",
                            description: "The user who owns the postcard.",
                        },
                        recipients: {
                            type: "array",
                            items: {
                                type: "string",
                            },
                            description: "List of users who receive the postcard.",
                        },
                        title: {
                            type: "object",
                            properties: {
                                value: {
                                    type: "string",
                                    description: "The title of the postcard.",
                                },
                                position: {
                                    type: "object",
                                    properties: {
                                        x: {
                                            type: "number",
                                            description: "X position of the title.",
                                        },
                                        y: {
                                            type: "number",
                                            description: "Y position of the title.",
                                        },
                                    },
                                },
                            },
                        },
                        description: {
                            type: "object",
                            properties: {
                                value: {
                                    type: "string",
                                    description: "The description of the postcard.",
                                },
                                position: {
                                    type: "object",
                                    properties: {
                                        x: {
                                            type: "number",
                                            description: "X position of the description.",
                                        },
                                        y: {
                                            type: "number",
                                            description: "Y position of the description.",
                                        },
                                    },
                                },
                            },
                        },
                        background: {
                            type: "string",
                            description: "Reference to an image for the postcard background.",
                        },
                        audio: {
                            type: "string",
                            description: "Reference to an audio file attached to the postcard.",
                        },
                        frame: {
                            type: "object",
                            properties: {
                                type: {
                                    type: "string",
                                    enum: ["full", "top-bottom", "left-right"],
                                    description: "Type of the postcard frame.",
                                },
                                thickness: {
                                    type: "number",
                                    description: "Thickness of the frame.",
                                },
                                color: {
                                    type: "string",
                                    description: "Color of the frame.",
                                },
                                image: {
                                    type: "string",
                                    description: "Reference to an image for the frame.",
                                },
                            },
                        },
                        stickers: {
                            type: "array",
                            items: {
                                type: "object",
                                properties: {
                                    image: {
                                        type: "string",
                                        description: "Reference to a sticker image.",
                                    },
                                    position: {
                                        type: "object",
                                        properties: {
                                            x: {
                                                type: "number",
                                                description: "X position of the sticker.",
                                            },
                                            y: {
                                                type: "number",
                                                description: "Y position of the sticker.",
                                            },
                                        },
                                    },
                                },
                            },
                        },
                        interactiveElements: {
                            type: "array",
                            items: {
                                type: "object",
                                properties: {
                                    type: {
                                        type: "string",
                                        enum: ["textarea-button", "two-buttons", "single-button"],
                                        description: "Type of interactive element.",
                                    },
                                    position: {
                                        type: "object",
                                        properties: {
                                            x: {
                                                type: "number",
                                                description: "X position of the interactive element.",
                                            },
                                            y: {
                                                type: "number",
                                                description: "Y position of the interactive element.",
                                            },
                                        },
                                    },
                                    text: {
                                        type: "string",
                                        description: "Text associated with the interactive element.",
                                    },
                                    label: {
                                        type: "array",
                                        items: {
                                            type: "string",
                                        },
                                        description: "Labels for the interactive element buttons.",
                                    },
                                },
                            },
                        },
                        createdAt: {
                            type: "string",
                            format: "date-time",
                            description: "The timestamp when the postcard was created.",
                        },
                        updatedAt: {
                            type: "string",
                            format: "date-time",
                            description: "The timestamp when the postcard was last updated.",
                        },
                        shareableLink: {
                            type: "string",
                            description: "A unique link to share the postcard.",
                            example: "abc123xyz",
                        },
                    },
                },
            },
        },
    },
    apis: ["./app/routes/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;
