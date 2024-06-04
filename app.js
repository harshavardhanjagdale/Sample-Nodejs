/* eslint-disable no-undef */
const express = require("express");
const app = express();
const port = process.env.PORT || 4000;
app.use(express.json());
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
const errorHandler = require("./core/middleware/errorHandler");

const Routes = require("./routes/routes");

app.use(errorHandler);

// Swagger configuration options
const options = {
	definition: {
		openapi: "3.0.0",
		info: {
			title: "My API",
			version: "1.0.0",
			description: "A sample API",
		},
		servers: [
			{
				url: "http://localhost:4000",
			},
		],
		components: {
			securitySchemes: {
				bearerAuth: {
					type: "apiKey",
					name: "authorization",
					scheme: "bearer",
					in: "header",
				},
			},
		},
	},
	// Paths to files containing Swagger annotations
	apis: ["./swagger.js"],
};

// Initialize swagger-jsdoc
const specs = swaggerJsdoc(options);

// Serve Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

module.exports = specs;

app.use("/", Routes);

app.listen(port, () => {
	console.log(`server is running on port ${port}`);
});
