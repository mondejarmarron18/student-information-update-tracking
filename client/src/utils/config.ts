const _ = (key: string) => {
  return import.meta.env[key];
};

const config = {
  API_URL: _("VITE_API_URL"),
};

export default config;
