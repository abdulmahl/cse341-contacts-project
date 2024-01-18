const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "Contacts API",
    description: "Swagger Contacts API",
  },
  host: "localhost:3000",
  schemes: ["http", "https"],
};

const outputFile = "./swagger.json";
const endPointFile = ["./routes/index.js"];

swaggerAutogen(outputFile, endPointFile, doc)