import React from "react";

import "../assets/style/ios-checkbox.styles.css"; // Import the styles

type Props = {
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isDisabled?: boolean;
  size?: string;
};

export const CheckBox: React.FC<Props> = ({
  checked,
  onChange,
  isDisabled,
  size,
}) => {
  return (
    <div className="flex gap-2">
      <label
        className="ios-checkbox table-checkbox blue"
        style={{ width: `${size}px`, height: `${size}px` }}
      >
        <input type="checkbox" checked={checked} onChange={onChange} />
        <div
          className="checkbox-wrapper"
          style={{ width: `${size}px`, height: `${size}px` }}
        >
          <div
            className={`checkbox-bg table-checkbox-bg ${
              isDisabled && "disabled-checkbox"
            }`}
          ></div>
          <svg fill="none" viewBox="0 0 24 24" className="checkbox-icon">
            <path
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="3"
              stroke="currentColor"
              d="M4 12L10 18L20 6"
              className="check-path"
            />
          </svg>
        </div>
      </label>
    </div>
  );
};
