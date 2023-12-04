import React from "react";

interface BasicButtonProps {
  text: string;
  onClick: () => void;
  disabled?: boolean;
  className?: string;
  type?: "button" | "submit" | "reset";
}

const BasicButton: React.FC<BasicButtonProps> = ({
  type,
  className,
  text,
  onClick,
  disabled,
}) => {
  return (
    <>
      <button
        type={type}
        className={`px-8 py-2 font-bold text-lg bg-secondary transition-all hover:-translate-y-1 rounded-lg dark:text-white text-gray-900 ${className}`}
        onClick={onClick}
        disabled={disabled}
      >
        {text}
      </button>
    </>
  );
};

export default BasicButton;
