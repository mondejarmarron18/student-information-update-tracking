import { subYears } from "date-fns";
import { UserProfileFormProps } from "./schema";

const defaultValues: UserProfileFormProps = {
  firstName: "",
  middleName: "",
  lastName: "",
  nameExtension: "",
  dateOfBirth: subYears(new Date(), 18),
  phoneNumber: "",
  sex: "male",
};

export default defaultValues;
