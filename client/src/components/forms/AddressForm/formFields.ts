import { FormField } from "@/types/form.type";
import { AddressFormProps, AddressSchema } from "./schema";

type Fields = FormField & {
  name: `${keyof AddressFormProps}.${keyof AddressSchema}`;
};

const fields: (FormField & { name: keyof AddressSchema })[] = [
  {
    name: "houseNumber",
    label: "House Number",
    type: "text",
    placeholder: "123",
  },
  {
    name: "street",
    label: "Street",
    type: "text",
    placeholder: "Street",
  },
  {
    name: "barangay",
    label: "Barangay",
    type: "text",
    placeholder: "Barangay",
  },
  {
    name: "city",
    label: "City",
    type: "text",
    placeholder: "City",
  },
  {
    name: "province",
    label: "Province",
    type: "text",
    placeholder: "Province",
  },
  {
    name: "zipCode",
    label: "ZIP Code",
    type: "text",
    placeholder: "ZIP Code",
  },
  {
    name: "region",
    label: "Region",
    type: "text",
    placeholder: "Region",
  },

  {
    name: "country",
    label: "Country",
    type: "text",
    placeholder: "Country",
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
