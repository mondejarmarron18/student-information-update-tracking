import { config as dotenvConfig } from "dotenv";

dotenvConfig({
  path: ".env",
});

const _ = (key: string) => process.env[key];

const config = {
  nodeEnv: _("NODE_ENV"),
  appName: _("APP_NAME"),
  port: _("PORT"),
  dbUrl: _("DB_URL"),
  clientUrl: _("CLIENT_URL"),
  smtp: {
    host: _("SMTP_HOST"),
    port: Number(_("SMTP_PORT")) || 587,
    user: _("SMTP_USER"),
    password: _("SMTP_PASSWORD"),
    service: _("SMTP_SERVICE"),
    sender: _("SMTP_SENDER"),
    secure: _("SMTP_SECURE") === "true",
  },
  jwt: {
    secret: _("JWT_SECRET"),
    secretExpiresIn: _("JWT_SECRET_EXPIRES_IN"),
    refreshSecret: _("JWT_REFRESH_SECRET"),
    refreshSecretExpiresIn: _("JWT_REFRESH_SECRET_EXPIRES_IN"),
  },
};

export default config;
