const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "Swagger API",
    description: "Users API",
  },
  host: "localhost:3000",
  scheme: ["https", "http"]
};

const outputFile = "./swagger.json";
const endpointsFile = ["./routes/router.js"];

swaggerAutogen(outputFile, endpointsFile, doc)