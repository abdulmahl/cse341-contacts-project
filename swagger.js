const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "Swagger API",
    description: "Users API",
  },
  host: "localhost:3000/users",
  scheme: ["https", "http"]
};

const outputFile = "./swagger.json";
const endpointsFile = ["./routes/index.js"];

swaggerAutogen(outputFile, endpointsFile, doc)