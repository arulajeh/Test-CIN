import swaggerJsdoc from "swagger-jsdoc";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: " " + process.env.NODE_ENV,
      version: "1.0.0",
    },
    servers: [
      {
        url: process.env.BASE_URL,
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
  apis: ["./src/routes/*.ts", "./src/dto/*.ts"],
};

const openapiSpecification = swaggerJsdoc(options);
export default openapiSpecification;
