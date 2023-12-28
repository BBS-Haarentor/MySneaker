import React, {ChangeEventHandler} from "react";

interface GameInputProps {
    type: React.HTMLInputTypeAttribute | undefined;
    onChange?: ChangeEventHandler<HTMLInputElement>;
    name?: string;
    className?: string;
    value?: any;
    min?: number;
}

const GameInput: React.FC<GameInputProps> = ({onChange, type, name, className, value, min}) => {
    return (
      <>
        <div className={`max-w-[300px] ${className}`}>
          <input
            onChange={onChange}
            name={name}
            min={min}
            value={value}
            className="w-full rounded-lg py-1.5 px-2 dark:bg-secondary-dark shadow"
            type={type}
          />
        </div>
      </>
    );
}

export default GameInput;