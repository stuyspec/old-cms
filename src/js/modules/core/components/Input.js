import React from "react";
import injectSheet from "react-jss";

const styles = {
  input: {
    padding: "20px",
    maxWidth: "500px",
    fontSize: "1.1em"
  },
  textArea: {
    padding: "4px",
    fontSize: "1.1em"
  }
};

const Input = ({
  classes,
  input,
  label,
  type,
  meta: { touched, error, warning }
}) => {
  return (
    <div className={classes.input}>
      <label>
        {label}
      </label>
      <div>
        <input
          className={classes.textArea}
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

export default injectSheet(styles)(Input);
