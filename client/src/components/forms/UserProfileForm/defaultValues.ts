import { UserProfileFormProps } from "./schema";

const defaultValues: UserProfileFormProps = {
  firstName: "",
  middleName: "",
  lastName: "",
  nameExtension: "",
  dateOfBirth: new Date(),
  phoneNumber: "",
  sex: "male",
};

export default defaultValues;
