import React, {ChangeEventHandler} from "react";

interface BasicInputProps {
    label: string;
    type: React.HTMLInputTypeAttribute | undefined;
    onChange?: ChangeEventHandler<HTMLInputElement>;
    name?: string;
    className?: string;
}

const BasicInput: React.FC<BasicInputProps> = ({onChange, label, type, name, className}) => {
    return (
      <>
        <div className={`max-w-[300px] mx-auto my-2.5 w-full ${className}`}>
          <label>{label}</label>
          <input
            onChange={onChange}
            name={name}
            className="w-full rounded-lg py-1.5 px-2 dark:bg-secondary-dark mt-2.5 shadow"
            type={type}
          />
        </div>
      </>
    );
}

export default BasicInput;