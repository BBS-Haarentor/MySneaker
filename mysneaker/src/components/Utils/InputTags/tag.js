import React from "react";
import { css } from "goober";
import cc from "./classnames";

interface TagProps {
    text: string;
    remove: any;
    disabled?: boolean;
}

const tagStyles = css({
    alignItems: "center",
    background: "var(--rti-tag)",
    borderRadius: "var(--rti-radius)",
    display: "inline-flex",
    justifyContent: "center",
    padding: "var(--rti-tag-padding)",

    button: {
        background: "none",
        border: 0,
        borderRadius: "50%",
        cursor: "pointer",
        lineHeight: "inherit",
        padding: "0 var(--rti-s)",
        backgroundColor: "dark:bg-[#1f2733]",

        "&:hover": {
            color: "var(--rti-tag-remove)",
        },
    },
});

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