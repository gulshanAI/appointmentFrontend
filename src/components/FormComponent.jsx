const FormInputError = ({ errors }) => {
  if (!errors) return null;
  return <div className="text-xs text-red-500">{errors.message}</div>;
};

export const FormInput = ({
  label,
  name,
  register,
  type = "text",
  errors,
  ...props
}) => {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        id={name}
        type={type}
        {...register(name)}
        className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md ${
          errors ? "border-red-500" : "border-gray-300"
        }`}
        {...props}
      />
      <FormInputError errors={errors} />
    </div>
  );
};

export const FormTextarea = ({ label, name, register, errors, ...props }) => {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>

      <textarea
        id={name}
        {...register(name)}
        className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md ${
          errors ? "border-red-500" : "border-gray-300"
        }`}
        {...props}
      />
      <FormInputError errors={errors} />
    </div>
  );
};
export const FormError = ({ errors }) => {
  if (!errors) return null;
  return (
    <div
      className={`w-full bg-red-100 pl-2 p-0.5 border-l-4 border-red-400 my-1`}
    >
      {typeof errors === "object" ? (
        <ul className="">
          {errors.map((err, index) => (
            <li key={index}>
              {err && (
                <p className="text-red-500 text-sm">
                  {err.path}: {err.msg}
                </p>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-red-500 text-sm">{errors}</p>
      )}
    </div>
  );
};
