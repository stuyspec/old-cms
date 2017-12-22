import React from "react";
import Select from "react-select";

const ContributorsInput = ({ className, input, options, name, multi }) =>
  <Select
    className={className}
    {...input}
    name={name}
    options={options}
    value={input.value}
    onChange={value => input.onChange(value)}
    onBlur={() => input.onBlur(input.value)}
    multi={multi}
    joinValues={true}
    clearable={false}
  />;

export default ContributorsInput;
