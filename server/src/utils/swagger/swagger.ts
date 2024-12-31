import swaggerJSDoc from "swagger-jsdoc";
import swaggerUI from "swagger-ui-express";
import config from "../config";

export const swaggerOptions: swaggerJSDoc.Options = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "API Documentation",
      version: "1.0.0",
      description: config.appName,
    },
  },
  apis: ["./src/domains/**/*.yaml", "./src/utils/swagger/*.yaml"],
};

export const swaggerDoc = swaggerJSDoc(swaggerOptions);
export const swaggerSetup = swaggerUI.setup(swaggerDoc, {
  customSiteTitle: config.appName || "API Documentation",
  customCss: ".topbar { display: none; };",
});
