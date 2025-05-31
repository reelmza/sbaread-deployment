import ThemeSpacer from "./ThemeSpacer";

type InputType = {
  name: string;
  type: "text" | "password" | "textarea" | "tel" | "number";
  label: string;
  required?: boolean;
  placeholder?: string;
  defaultValue?: string;
  className?: string;
};

const Input = ({
  label,
  name,
  type,
  required,
  placeholder,
  defaultValue,
  className,
}: InputType) => {
  return (
    <div className="flex flex-col text-sm">
      {/* Input Label */}
      <label htmlFor="bookTitle">
        {label}
        {required ? (
          <span className="text-gray-400 mb-2 text-xs font-light ml-1 italic">
            - required
          </span>
        ) : (
          ""
        )}
      </label>
      <ThemeSpacer size="unit" />

      {/* Input element */}
      {type !== "textarea" ? (
        <input
          id={name}
          name={name}
          type={type}
          className={`bg-gray-100 border outline-none h-12 rounded-md px-5 ${className}`}
          placeholder={placeholder ? placeholder : ""}
          defaultValue={defaultValue ? defaultValue : ""}
        />
      ) : (
        <textarea
          id={name}
          name={name}
          className={`bg-gray-100 h-28 rounded-md p-5 ${className}`}
          placeholder={placeholder ? placeholder : ""}
          defaultValue={defaultValue ? defaultValue : ""}
        ></textarea>
      )}
      <ThemeSpacer size="element" />
    </div>
  );
};

export default Input;
