import * as yup from "yup";

export const appointmentSchema = yup.object({
  email: yup.string().email().required().label("Email"),
  name: yup.string().required().label("Name"),
  phone: yup
    .string()
    .matches(/^[0-9]{10}$/, "Phone number must be exactly 10 digits")
    .required()
    .label("Phone"),
  title: yup.string().required().label("Title"),
});
