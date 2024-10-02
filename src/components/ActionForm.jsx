import { FormError, FormInput, FormTextarea } from "./FormComponent";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { appointmentSchema } from "../lib/validationSchema";
import { useState } from "react";

const ActionForm = ({ addAppointment }) => {
  const [formError, setFormError] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(appointmentSchema),
    defaultValues: {
      name: "Gulsna  Prajapt",
      email: "fulshan@gmail.com",
      phone: "9898989876",
      title: "THis is test",
    },
  });
  const sendAppt = async (data) => {
    setFormError(null);
    const error = await addAppointment(data);
    if (error) setFormError(error);
  };
  return (
    <div>
      <div className="fixed inset-0 bg-black opacity-50 z-40" />
      <div
        id="modalContent"
        className="fixed top-1/2 left-1/2 max-w-md w-full bg-white p-4 rounded shadow-lg z-50 -translate-x-1/2 -translate-y-1/2"
      >
        <h2 className="text-2xl font-bold mb-4">Book appointment</h2>

        <form onSubmit={handleSubmit(sendAppt)} className="space-y-4">
          <FormInput
            label="Title"
            name="title"
            errors={errors?.title}
            register={register}
            placeholder="e.g Apply to Job"
          />
          <FormInput
            label="Name"
            name="name"
            errors={errors?.name}
            register={register}
            placeholder="e.g Gulshan Prajapati"
          />
          <FormInput
            label="Phone"
            name="phone"
            type="number"
            errors={errors?.phone}
            register={register}
            placeholder="e.g 9834125105"
          />
          <FormInput
            label="Email"
            name="email"
            errors={errors?.email}
            register={register}
            type="email"
            placeholder="gulshanprajapati113@gmail.com"
          />
          <FormTextarea
            label="Note"
            name="note"
            errors={errors?.note}
            register={register}
            placeholder="Ready to contribute in your organisation"
            rows={4}
          />
          <FormError errors={formError} />
          <div className="flex justify-end">
            <button
              type="button"
              id="closeModal"
              className="bg-red-500 text-white px-4 py-2 rounded mr-2"
            >
              Close
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              {isSubmitting ? "Adding..." : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ActionForm;
