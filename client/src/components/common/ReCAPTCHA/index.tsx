import ReCAPTCHA from "react-google-recaptcha";
import config from "@/utils/config";
import { useEffect, useRef } from "react";

type AppRecaptchaProps = {
  onChange: (value: string | null) => void;
};

const AppRecaptcha = ({ onChange }: AppRecaptchaProps) => {
  const recaptchaRef = useRef<ReCAPTCHA | null>(null);

  useEffect(() => {
    if (recaptchaRef.current) {
      recaptchaRef.current.reset();
    }
  }, []);

  return (
    <ReCAPTCHA
      ref={recaptchaRef}
      sitekey={config.RECAPTCHA_SITE_KEY}
      size="normal"
      theme="dark"
      onChange={onChange}
    />
  );
};

export default AppRecaptcha;
