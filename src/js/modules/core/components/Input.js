import React from "react";

const Input = ({ input, label, type, meta: { touched, error, warning } }) => {
  return (
    <div>
      <label>
        {label}
      </label>
      <div>
        <input
          style={{ width: "100%" }}
          {...input}
          placeholder={label}
          type={type}
        />
        {touched &&
          ((error &&
            <span style={{ color: "red" }}>
              {error}
            </span>) ||
            (warning &&
              <span>
                {warning}
              </span>))}
      </div>
    </div>
  );
};

export default Input