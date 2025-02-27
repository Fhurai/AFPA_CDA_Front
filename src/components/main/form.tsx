import {JSX} from "react";
import {Client} from "../../Client";
import {Prospect} from "../../model/Prospect";

interface FormProps {
  typePage?: string,
  client?: Client,
  prospect?: Prospect
}

/**
 * Méthode pour retourner un groupe label/input texte.
 * @param name Le nom de l'input
 * @param sizeGroup Taille en % du groupe sur sa ligne de formulaire.
 * @param sizeInput Nombre de caractères pour l'input dans le groupe.
 * @param value Valeur par défaut de l'input.
 */
function getTextInput(name: string, sizeGroup: number, sizeInput?: number, value?: string): JSX.Element {
  return (
    <div className={"form-group col-md-" + (sizeGroup / 100 * 12)}>
      <label htmlFor={name + "input"}>{String(name).charAt(0).toUpperCase() + String(name).slice(1)}</label>
      <input type="text" className={"form-control"} id={name + "input"} placeholder={String(name).charAt(0).toUpperCase() + String(name).slice(1)} size={sizeInput} defaultValue={value ?? ""}/>
    </div>
  )
}

/**
 * Méthode pour retourner un groupe label/textarea
 * @param name Le nom du textarea.
 * @param placeholder Placeholder du textarea.
 * @param sizeRows Taille du textarea en nombre de lignes.
 * @param value Valeur par défaut du textarea.
 */
function getTextarea(name: string, placeholder: string, sizeRows?: number, value?: string): JSX.Element {
  return (
    <div className={"form-group col-md-12"}>
      <label htmlFor={name + "textarea"}>{String(name).charAt(0).toUpperCase() + String(name).slice(1)}</label>
      <textarea className={"form-control"} id={name + "textarea"} placeholder={placeholder} rows={sizeRows}>{value}</textarea>
    </div>
  )
}

export default function Form({typePage, client, prospect }: FormProps): JSX.Element {
  return (
    <form method={"post"} action={"#"}>
      <fieldset>
      {typePage === "contact" && getTextInput("prenom", 50, 30)}
      {typePage === "contact" && getTextInput("nom", 50, 30)}
      {typePage === "contact" && getTextInput("email", 50, 30)}
      {typePage === "contact" && getTextarea("Message", "Le contenu de votre message", 10)}
      <div className={"form-group col-md-12"}>
        <input className={"btn btn-primary"} type={"submit"} defaultValue={"Envoyer"}></input>
      </div>
      </fieldset>
    </form>
  )
}