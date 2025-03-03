import React, {JSX} from 'react';
import {Client} from "../../model/Client";
import {Prospect} from "../../model/Prospect";
import Strings from "../../utilities/Strings";
import Input from "./input";
import Textarea from "./textarea";

interface FormProps {
  typePage?: string;
  client?: Client;
  prospect?: Prospect;
}

export default class Form extends React.Component<FormProps> {

  /**
   * Returns a label/textarea group
   */
  getTextarea = (
    name: string,
    placeholder: string,
    sizeRows?: number,
    value?: string,
    disabled: boolean = false
  ): JSX.Element => {
    let betterLabel: string = Strings.nameToLabel(name);

    return (
      <div className="form-group col-md-12">
        <label htmlFor={`${name}textarea`}>
          {betterLabel}
        </label>
        <textarea
          className="form-control"
          id={`${name}textarea`}
          placeholder={placeholder}
          rows={sizeRows}
          defaultValue={value}
          disabled={disabled}
        />
      </div>
    );
  };

  render() {
    const {typePage, client, prospect} = this.props;
    const disabled = typePage === "view" || typePage === "delete";

    return (
      <form method="post" action="#">
        <fieldset className="row">
          {/**
           * Partie contact
           */}
          {typePage === "contact" && <Input type={"text"} name={"prenom"} className={"col-md-6"} sizeInput={30}/>}
          {typePage === "contact" && <Input type={"text"} name={"nom"} className={"col-md-6"} sizeInput={30}/>}
          {typePage === "contact" && <Input type={"text"} name={"mail"} className={"col-md-6"} sizeInput={30}/>}
          {typePage === "contact" &&
            <Textarea name={"message"} className={"col-md-12"} placeholder={"Le contenu de votre message"}
                      sizeRows={10}/>}
          {/**
           * Partie clients/prospects
           */}
          {typePage !== "contact" && <legend className="border-bottom mb-4">Partie société</legend>}
          {typePage !== "contact" &&
            <Input type={"text"} name={"raisonSociale"} className={"col-md-6"} sizeInput={30} disabled={disabled}
                   value={client !== null ? client?.raisonSociale : prospect?.raisonSociale}/>}
          {typePage !== "contact" &&
            <Input type={"text"} name={"telephone"} className={"col-md-6"} sizeInput={12} disabled={disabled}
                   value={client !== null ? client?.telephone : prospect?.telephone}/>}
          {typePage !== "contact" &&
            <Input type={"text"} name={"adresseMail"} className={"col-md-6"} sizeInput={30} disabled={disabled}
                   value={client !== null ? client?.mail : prospect?.mail}/>}
          {typePage !== "contact" && <Textarea name={"commentaires"} className={"col-md-12"} placeholder={`Commentaires sur le ${client !== null ? "client" : "prospect"}`} sizeRows={5} disabled={disabled} value={client !== null ? client?.commentaires : prospect?.commentaires} />}
          {typePage !== "contact" && <legend className="border-bottom mb-4 mt-4">Partie adresse</legend>}
          {typePage !== "contact" &&
            <Input type={"text"} name={"numeroRue"} className={"col-md-3"} sizeInput={15} disabled={disabled}
                   value={client !== null ? client?.adresse.numeroRue : prospect?.adresse.numeroRue}/>}
          {typePage !== "contact" &&
            <Input type={"text"} name={"nomRue"} className={"col-md-9"} sizeInput={30} disabled={disabled}
                   value={client !== null ? client?.adresse.nomRue : prospect?.adresse.nomRue}/>}
          {typePage !== "contact" &&
            <Input type={"text"} name={"codePostal"} className={"col-md-2"} sizeInput={5} disabled={disabled}
                   value={client !== null ? client?.adresse.codePostal : prospect?.adresse.codePostal}/>}
          {typePage !== "contact" &&
            <Input type={"text"} name={"ville"} className={"col-md-10"} sizeInput={30} disabled={disabled}
                   value={client !== null ? client?.adresse.ville : prospect?.adresse.ville}/>}
          {typePage !== "contact" &&
            <legend className="border-bottom mb-4 mt-4">Partie {client !== undefined ? "client" : "prospect"}</legend>}
          {/**
           * Partie client
           */}
          {typePage !== "contact" && client !== null ?
            <Input type={"number"} name={"nbEmployes"} className={"col-md-6"} disabled={disabled}
                   step={0.01} value={client?.chiffreAffaires.toString()}/> : ""}
          {typePage !== "contact" && client !== null ?
            <Input type={"number"} name={"nbEmployes"} className={"col-md-6"} disabled={disabled} step={1}
                   value={client?.nbEmployes.toString()}/> : ""}
          {/**
           * Partie prospect
           */}
          {typePage !== "contact" && prospect !== null ?
            <Input type={"date"} name={"dateProspection"} className={"col-md-6"} disabled={disabled} value={prospect?.dateProspection.toISOString()} /> : ""}
          {typePage !== "contact" && prospect !== null ? <Input type={"checkbox"} name={"prospectInteresse"} className={"col-md-6"} disabled={disabled} value={prospect?.prospectInteresse} /> : ""}
          {/**
           * Partie commune
           */}
          <hr className={"mt-4"}/>
          {typePage !== "view" && <div className="form-group col-md-12">
            <button
              className={"btn btn-primary float-end"}>{typePage === "contact" ? "Envoyer" : (typePage === "delete" ? "Supprimer" : "Sauvegarder")}</button>
          </div>}
        </fieldset>
      </form>
    );
  }
}