import { css, setup } from "goober";
import React, { useEffect, useState } from "react";

import cc from "./classnames";
import Tag from "./tag";

export interface TagsInputProps {
    name?: string;
    placeHolder?: string;
    value?: string[];
    onChange?: (tags: string[]) => void;
    onBlur?: any;
    seprators?: string[];
    onExisting?: (tag: string) => void;
    onRemoved?: (tag: string) => void;
    disabled?: boolean;
    isEditOnRemove?: boolean;
    beforeAddValidate?: (tag: string, existingTags: string[]) => boolean;
}

// initialize goober once
setup(React.createElement);

const defaultSeprators = ["Enter"];

export const TagsInput = ({
                              name,
                              placeHolder,
                              value,
                              onChange,
                              onBlur,
                              seprators,
                              onExisting,
                              onRemoved,
                              disabled,
                              isEditOnRemove,
                              beforeAddValidate,
                          }: TagsInputProps) => {
    const [tags, setTags] = useState(value || []);

    useEffect(() => {
        onChange && onChange(tags);
    }, [tags]);

    const handleOnKeyUp = e => {
        e.stopPropagation();

        const text = e.target.value;

        if (e.key === "Backspace" && tags.length && !text) {
            e.target.value = isEditOnRemove ? `${tags.at(-1)} ` : "";
            setTags([...tags.slice(0, -1)]);
        }

        if (text && (seprators || defaultSeprators).includes(e.key)) {
            if (beforeAddValidate && !beforeAddValidate(text, tags)) return;

            if(!Number(text)) {
                return
            }

            setTags([...tags, text]);
            e.target.value = "";
            e.preventDefault();
        }
    };

    const onTagRemove = text => {
        setTags(tags.filter(tag => tag !== text));
        onRemoved && onRemoved(text);
    };

    return (
        <div aria-labelledby={name} className="w-[100%] dark:text-white dark:bg-[#1f2733] items-center flex-wrap dark:border-[#282d3c] p-2 border-[#4fd1c5] border-solid border-2 rounded-2xl">
            {tags.map(tag => (
                <Tag key={tag} text={tag} remove={onTagRemove} disabled={disabled} />
            ))}

            <input
                className="dark:bg-[#1f2733] bg-white"
                type="text"
                name={name}
                placeholder={placeHolder}
                onKeyDown={handleOnKeyUp}
                onBlur={onBlur}
                disabled={disabled}
            />
        </div>
    );
};