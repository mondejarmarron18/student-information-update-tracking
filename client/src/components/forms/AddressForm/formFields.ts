import { FormField } from "@/types/form.type";
import { AddressFormProps, AddressSchema } from "./schema";

type Fields = FormField & {
  name: `${keyof AddressFormProps}.${keyof AddressSchema}`;
};

const fields: (FormField & { name: keyof AddressSchema })[] = [
  {
    name: "country",
    label: "Country",
    type: "text",
    placeholder: "Country",
  },
  {
    name: "state",
    label: "State/Region",
    type: "text",
    placeholder: "State or Region",
  },
  {
    name: "city",
    label: "City/Municipality",
    type: "text",
    placeholder: "City or Municipality",
  },
  {
    name: "postalCode",
    label: "Postal/ZIP Code",
    type: "text",
    placeholder: "ZIP Code or Postal Code",
  },
  {
    name: "addressLine1",
    label: "Address Line 1",
    type: "textarea",
    placeholder: "Street Name, House Number, or P.O. Box",
  },
  {
    name: "addressLine2",
    label: "Address Line 2",
    type: "textarea",
    optional: true,
    placeholder: "Apartment, Suite, Floor, Building Name",
  },
];

const permanentFields = fields.map((field) => ({
  ...field,
  name: `permanent.${field.name}` as Fields["name"],
}));
const presentFields = fields.map((field) => ({
  ...field,
  name: `present.${field.name}` as Fields["name"],
}));

const formFields: Fields[] = permanentFields.concat(presentFields);

export default formFields;
