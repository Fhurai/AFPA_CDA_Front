import React, {JSX} from 'react';
import { Client } from "../../model/Client";
import { Prospect } from "../../model/Prospect";

interface FormProps {
  typePage?: string;
  client?: Client;
  prospect?: Prospect;
}

export default class Form extends React.Component<FormProps> {
  /**
   * Returns a label/text input group
   */
  getTextInput = (
    name: string,
    sizeGroup: number,
    sizeInput?: number,
    value?: string
  ): JSX.Element => {
    return (
      <div className={`form-group col-md-${(sizeGroup / 100 * 12)}`}>
        <label htmlFor={`${name}input`}>
          {name.charAt(0).toUpperCase() + name.slice(1)}
        </label>
        <input
          type="text"
          className="form-control"
          id={`${name}input`}
          placeholder={name.charAt(0).toUpperCase() + name.slice(1)}
          size={sizeInput}
          defaultValue={value ?? ""}
        />
      </div>
    );
  };

  /**
   * Returns a label/textarea group
   */
  getTextarea = (
    name: string,
    placeholder: string,
    sizeRows?: number,
    value?: string
  ): JSX.Element => {
    return (
      <div className="form-group col-md-12">
        <label htmlFor={`${name}textarea`}>
          {name.charAt(0).toUpperCase() + name.slice(1)}
        </label>
        <textarea
          className="form-control"
          id={`${name}textarea`}
          placeholder={placeholder}
          rows={sizeRows}
          defaultValue={value}
        />
      </div>
    );
  };

  render() {
    const { typePage } = this.props;

    return (
      <form method="post" action="#">
        <fieldset className="row">
          {typePage === "contact" && this.getTextInput("prenom", 50, 30)}
          {typePage === "contact" && this.getTextInput("nom", 50, 30)}
          {typePage === "contact" && this.getTextInput("email", 50, 30)}
          {typePage === "contact" && this.getTextarea("Message", "Le contenu de votre message", 10)}
          <div className="form-group col-md-12">
            <input
              className="btn btn-primary"
              type="submit"
              defaultValue="Envoyer"
            />
          </div>
        </fieldset>
      </form>
    );
  }
}