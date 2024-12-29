import { create, engine } from "express-handlebars";
import { ConfigOptions, Engine, UnknownObject } from "express-handlebars/types";
import path from "path";
import { x8tAsync } from "x8t";
import config from "./config";

export const hbsEngineConfig: ConfigOptions = {
  extname: ".hbs",
  defaultLayout: false,
};

export const hbsEngine: Engine = engine(hbsEngineConfig);

const hbs = async (file: string, data: UnknownObject) => {
  const configOptions = create(hbsEngineConfig);
  const templatePath = path.join(__dirname, `../views/${file}.hbs`);

  const { result, error } = await x8tAsync(
    configOptions.render(templatePath, data)
  );

  if (error !== null || result === null) {
    console.log("Error rendering template:", error);
    return `<html>
      <body>
        <h1>We're sorry, but we encountered an issue with sending the email.</h1>
        <p>Please contact support at <a href="mailto:${config.smtp.sender}">${config.smtp.sender}</a> if you continue to have issues.</p>
      </body>
    </html>`;
  }

  return result;
};

export default hbs;
