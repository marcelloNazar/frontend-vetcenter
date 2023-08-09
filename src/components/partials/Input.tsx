import { InputHTMLAttributes, forwardRef } from "react";
import { ref } from "yup";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  error?: string;
};

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ type = "text", name = "", error = "", ...props }, ref) => {
    return (
      <div className="flex flex-col w-full px-1">
        <input
          className="vet-input"
          type={type}
          name={name}
          ref={ref}
          {...props}
        />
        {error && <p className="text-xs pl-1 text-red-600">{error}</p>}
      </div>
    );
  }
);

export default Input;
