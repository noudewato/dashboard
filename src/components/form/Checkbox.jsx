/* eslint-disable react/prop-types */

const Checkbox = ({ label, value, id, onChange, checked }) => {
  return (
    <label className="flex items-center my-3 cursor-pointer select-none gap-x-2 w-fit"
     htmlFor={id}
    >
      <input
        type="checkbox"
        className="appearance-none w-5 h-5 border border-zinc-300 shadow-sm dark:border-zinc-600 rounded grid place-items-center checked:before:content-['\002714'] checked:text-white checked:text-[0.6rem] checked:bg-primry checked:border-2 checked:border-white dark:checked:border-[#1e1e1e]  relative checked:after:absolute checked:after:w-6 checked:after:h-6 checked:after:border-2 checked:after:border-primry checked:after:rounded"
        value={value}
        id={id}
        onChange={onChange}
        checked={checked}
      />
      <span>{label}</span>
    </label>
  );
};

export default Checkbox;
