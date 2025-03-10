import { cn } from "@/lib/utils";
import * as passwordValidator from "@/utils/validator";
import { FaCheck } from "react-icons/fa6";

type Props = {
  password: string;
};

const conditions = [
  {
    label: `Must have at least one special character: ${passwordValidator.allowedSpecialCharacters
      .split("")
      .join(", ")}`,
    validate: passwordValidator.hasSpecialCharacter,
  },
  {
    label: "Must have at least one uppercase character",
    validate: passwordValidator.hasUppercase,
  },
  {
    label: "Must have at least one lowercase character",
    validate: passwordValidator.hasLowercase,
  },
  {
    label: "Must have at least one number",
    validate: passwordValidator.hasNumber,
  },
  {
    label: "Must have at least 8 characters",
    validate: passwordValidator.hasLength,
  },
];

const PasswordValidator = (props: Props) => {
  return (
    <div className="flex flex-col gap-1">
      {conditions.map(({ label, validate }) => {
        const satisfied = validate(props.password);

        return (
          <div key={label} className="flex gap-2 items-center">
            <FaCheck
              className={cn("text-gray-500", {
                "text-green-500": satisfied,
              })}
            />
            <p
              className={cn("text-sm text-gray-500", {
                "text-green-500": satisfied,
              })}
            >
              {label}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default PasswordValidator;
