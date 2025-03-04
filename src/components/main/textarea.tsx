import React from "react";
import Strings from "../../utilities/Strings";

interface TextareaProps {
  name: string,
  className: string,
  placeholder: string,
  sizeRows: number,
  disabled?: boolean,
  value?: string,
  required?: boolean
}

export default class Textarea extends React.Component<TextareaProps> {
  render() {
    const {name, className, placeholder, sizeRows, disabled, value, required} = this.props;
    const betterLabel: string = Strings.nameToLabel(name);
    return (<div className={"form-group " + className}>
      <label htmlFor={`${name}Textarea`}>{betterLabel}</label>
      <textarea className={"form-control"}
                id={`${name}Textarea`}
                placeholder={placeholder}
                rows={sizeRows}
                disabled={disabled}
                defaultValue={value}
                required={required}
      />
    </div>);
  }
}