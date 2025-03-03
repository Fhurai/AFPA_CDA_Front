import React from "react";
import Strings from "../../utilities/Strings";

interface InputProps {
  type: string,
  name: string,
  className: string,
  sizeInput?: number,
  disabled?: boolean,
  step?: number,
  value?: any
}

export default class Input extends React.Component<InputProps> {
  render() {
    const {type, name, className, sizeInput, disabled, step, value} = this.props;
    const betterLabel: string = Strings.nameToLabel(name);
    let input: React.JSX.Element;

    switch (type) {
      case "text":{
        input = (<input type={"text"}
                        className={"form-control"}
                        id={`${name}Input`}
                        placeholder={betterLabel}
                        size={sizeInput}
                        disabled={disabled}
                        defaultValue={value}/>);
        break;
      }
      case "number":{
        input = (<input type={"number"}
                        className={"form-control"}
                        id={`${name}Input`}
                        placeholder={betterLabel}
                        disabled={disabled}
                        step={step}
                        defaultValue={value} />);
        break;
      }
      case "date":{
        input = (<input type={"date"}
                        className={"form-control"}
                        id={`${name}Input`}
                        size={10}
                        placeholder={betterLabel}
                        disabled={disabled}
                        defaultValue={value?.split("T")[0]}/>);
        break;
      }
      case "checkbox":{
        input = (<div className={"checkbox-custom"}>
                 <input type={"checkbox"}
                        className={"form-control"}
                        id={`${name}Input`}
                             disabled={disabled}/>
                 <label htmlFor={`${name}Input`}></label>
        </div>);
        break;
      }
      default: {
        input = (<input className={"form-control"}
                        id={`${name}Input`}
                        placeholder={betterLabel}
                        disabled={disabled}
                        defaultValue={value}/>);
        break;
      }
    }

    return (<div className={`form-group ` + className}>
      <label htmlFor={`${name}Input`}>{betterLabel}</label>
      {input}
    </div>);
  }
}