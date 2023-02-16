import React from "react";

interface TagProps {
    text: string;
    remove: any;
    disabled?: boolean;
}

export default function Tag({ text, remove, disabled }: TagProps) {
    const handleOnRemove = e => {
        e.stopPropagation();
        remove(text);
    };

    return (
        <span className="dark:bg-[#18202a] bg-[#e5e5e5] py-[3px] dark:text-white pointer rounded-xl px-[0.5rem]">
      <span>{text}</span>
            {!disabled && (
                <button
                    type="button"
                    onClick={handleOnRemove}
                    className="mx-[10px]"
                    aria-label={`remove ${text}`}
                >
                    &#10005;
                </button>
            )}
    </span>
    );
}