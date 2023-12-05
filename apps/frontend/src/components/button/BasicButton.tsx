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
            <div className="max-w-[300px] mx-auto w-full">
                <button
                    type={type}
                        className={`mt-5 bg-secondary w-full rounded-lg py-1.5 transition-all hover:-translate-y-1 shadow ${className}`}
                        onClick={onClick}
                        disabled={disabled}>
                    {text}
                </button>
            </div>
        </>
    );
};

export default BasicButton;
