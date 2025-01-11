const _ = (key: string) => {
  return import.meta.env[key];
};

const config = {
  API_URL: _("VITE_API_URL"),
  RECAPTCHA_SITE_KEY: _("VITE_RECAPTCHA_SITE_KEY"),
};

export default config;
