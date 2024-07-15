/* eslint-disable react/prop-types */
import { FiInfo } from "react-icons/fi";

const Input = ({
  label,
  value,
  name,
  id,
  onChange,
  onBlur = () => {},
  type = "text",
  placeholder,
  icon,
  invalid,
  multline = false,
  cols,
  rows,
  errorText,
}) => {
  const handleInputBlur = (e) => {
    onBlur(e);
  };

  return (
    <>
      <label htmlFor={id} className="mb-1">
        {label}
      </label>
      <div className="relative">
        {icon && (
          <div
            className={`absolute top-1/2 -translate-y-1/2 left-2 text-slate-400 ${
              invalid && "text-red500"
            } ${multline && "!top-3 translate-y-0"}`}
          >
            {icon}
          </div>
        )}
        {invalid && (
          <div
            className={`absolute top-1/2 -translate-y-1/2 right-2 ${
              multline && "!top-3 translate-y-0"
            }`}
          >
            <FiInfo className="text-red500" />
          </div>
        )}
        {multline ? (
          <textarea
            cols={cols}
            rows={rows}
            value={value}
            id={id}
            name={name}
            onChange={onChange}
            onBlur={handleInputBlur}
            className={`flex w-full !rounded-md !border border-zinc-300 bg-white dark:border-zinc-600 dark:bg-zinc-800 px-3 py-1 pt-2 !shadow-sm transition-colors placeholder:text-slate-400 focus-visible:outline-none focus:border-transparent focus-visible:ring-2 focus-visible:ring-[#0bab7c] disabled:cursor-not-allowed disabled:opacity-50 ${
              invalid
                ? "!ring-2 !ring-red500 focus-visible:!ring-red500 !border-transparent"
                : ""
            } ${icon ? "pl-7" : ""}`}
            autoComplete="off"
            placeholder={placeholder}
          />
        ) : (
          <input
            type={type}
            value={value}
            id={id}
            name={name}
            onChange={onChange}
            onBlur={handleInputBlur}
            className={`flex h-10 w-full !rounded-md !border border-zinc-300 bg-white dark:border-zinc-600 dark:bg-zinc-800 px-3 py-1 !shadow-sm transition-colors placeholder:text-slate-400 focus-visible:outline-none focus:border-transparent focus-visible:ring-2 focus-visible:ring-primry disabled:cursor-not-allowed disabled:opacity-50 ${
              invalid
                ? "!ring-2 !ring-red500 focus-visible:!ring-red500 !border-transparent"
                : ""
            } ${icon ? "pl-7" : ""}`}
            autoComplete="off"
            placeholder={placeholder}
          />
        )}
      </div>
      {errorText && <p className="mt-2 text-sm text-red500">{errorText}</p>}
    </>
  );
};

export default Input;
