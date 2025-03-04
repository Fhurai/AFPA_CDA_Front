import React, {JSX} from 'react';
import {Client} from "../../model/Client";
import {Prospect} from "../../model/Prospect";
import Strings from "../../utilities/Strings";
import Input from "./input";
import Textarea from "./textarea";

interface FormState{
  geometry?: string
}

interface FormProps {
  typePage?: string;
  client?: Client;
  prospect?: Prospect;
}

export default class Form extends React.Component<FormProps, FormState> {
  consultPages: string[] = ["view", "create", "update", "delete"];

  constructor(props: FormProps) {
    super(props);
    this.state ={geometry: ""};
  }

  componentDidMount() {
    this.getGeolocalisation().then(r => this.setState({
      geometry: r
    }))
  }

  async getGeolocalisation(){
    const {typePage, client, prospect} = this.props;
    let adresse : string = "";
    let ret: string = "";

    if(client !== null){
      adresse = client?.adresse.toString() as string;
    }

    if(prospect !== null){
      adresse = prospect?.adresse.toString() as string;
    }

    try {
      const response = await fetch("https://api-adresse.data.gouv.fr/search/?q=" + adresse.replace(" ", "+"));

      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const json = await response.json();
      ret = "- Géolocalisation : " + json.features[0].geometry.coordinates[0] + ","+ json.features[0].geometry.coordinates[1];
    } catch (error: any) {
      console.error(error.message);
    }
    return ret;
  }

  render() {
    const {typePage, client, prospect} = this.props;
    const disabled = typePage === "view" || typePage === "delete";

    return (
      <form method="post" action="#">
        <fieldset className={(typePage !== "deconnexion" ? "row" : "")+" modal-dialog-centered"}>
          {/**
           * Partie contact
           */}
          {typePage === "contact" && <>
            <Input type={"text"} name={"prenom"} className={"col-md-6"} sizeInput={30} required={true} pattern={Strings.getPattern("nom")}/>
            <Input type={"text"} name={"nom"} className={"col-md-6"} sizeInput={30} required={true} pattern={Strings.getPattern("nom")}/>
            <Input type={"text"} name={"adresseMail"} className={"col-md-6"} sizeInput={30} required={true} pattern={Strings.getPattern("adresseMail")}/>
            <Textarea name={"message"} className={"col-md-12"} placeholder={"Le contenu de votre message"}
                      sizeRows={10} required={true}/>
          </>}
          {typePage === "connexion" && <>
            <Input type={"text"} name={"adresseMail"} className={"col-md-12"} sizeInput={30} required={true} pattern={Strings.getPattern("adresseMail")} />
            <Input type={"password"} name={"password"} className={"col-md-12"} sizeInput={30} required={true} />
           </>}
          {typePage === "deconnexion" && <>
            <button defaultValue={"oui"} name={"answer"} className={"btn btn-success" +
            " col-md-2"}>Oui</button>
            <button defaultValue={"Non"} name={"answer"} className={"btn btn-danger col-md-2"}>Non</button>
           </>}
          {/**
           * Partie clients/prospects
           */}
          {this.consultPages.includes(typePage ?? "") && <><legend className="border-bottom mb-4">Partie société</legend>
            <Input type={"text"} name={"raisonSociale"} className={"col-md-6"} sizeInput={30} disabled={disabled}
                   value={client !== null ? client?.raisonSociale : prospect?.raisonSociale} required={true} pattern={Strings.getPattern("nom")}/>
            <Input type={"text"} name={"telephone"} className={"col-md-6"} sizeInput={12} disabled={disabled}
                   value={client !== null ? client?.telephone : prospect?.telephone} required={true} pattern={Strings.getPattern("telephone")}/>
            <Input type={"text"} name={"adresseMail"} className={"col-md-6"} sizeInput={30} disabled={disabled}
                   value={client !== null ? client?.mail : prospect?.mail} required={true} pattern={Strings.getPattern("adresseMail")}/>
            <Textarea name={"commentaires"} className={"col-md-12"} placeholder={`Commentaires sur le ${client !== null ? "client" : "prospect"}`} sizeRows={5} disabled={disabled} value={client !== null ? client?.commentaires : prospect?.commentaires} />
            <legend className="border-bottom mb-4 mt-4">Partie adresse {typePage === "view" ? this.state.geometry+" - " : ""}</legend>
            <Input type={"text"} name={"numeroRue"} className={"col-md-3"} sizeInput={15} disabled={disabled}
                   value={client !== null ? client?.adresse.numeroRue : prospect?.adresse.numeroRue} required={true} pattern={Strings.getPattern("numeroRue")}/>
            <Input type={"text"} name={"nomRue"} className={"col-md-9"} sizeInput={30} disabled={disabled}
                   value={client !== null ? client?.adresse.nomRue : prospect?.adresse.nomRue} required={true} pattern={Strings.getPattern("ville")}/>
            <Input type={"text"} name={"codePostal"} className={"col-md-2"} sizeInput={5} disabled={disabled}
                   value={client !== null ? client?.adresse.codePostal : prospect?.adresse.codePostal} required={true} pattern={Strings.getPattern("codePostal")}/>
            <Input type={"text"} name={"ville"} className={"col-md-10"} sizeInput={30} disabled={disabled}
                   value={client !== null ? client?.adresse.ville : prospect?.adresse.ville} required={true} pattern={Strings.getPattern("ville")}/>
            <legend className="border-bottom mb-4 mt-4">Partie {client !== undefined ? "client" : "prospect"}</legend></>}
          {/**
           * Partie client
           */}
          {this.consultPages.includes(typePage ?? "") && client !== null ? <>
            <Input type={"number"} name={"chiffreAffaires"} className={"col-md-6"} disabled={disabled}
                   step={0.01} value={client?.chiffreAffaires.toString()} required={true}/>
            <Input type={"number"} name={"nbEmployes"} className={"col-md-6"} disabled={disabled} step={1}
                   value={client?.nbEmployes.toString()} required={true}/>
            </> : ""}
          {/**
           * Partie prospect
           */}
          {this.consultPages.includes(typePage ?? "") && prospect !== null ? <>
            <Input type={"date"} name={"dateProspection"} className={"col-md-6"} disabled={disabled} value={prospect?.dateProspection.toISOString()} required={true} />
            <Input type={"checkbox"} name={"prospectInteresse"} className={"col-md-6"} disabled={disabled} value={prospect?.prospectInteresse} required={true} />
            </> : ""}
          {/**
           * Partie commune
           */}
          <hr className={"mt-4"}/>
          {typePage !== "view" && <div className="form-group col-md-12">
            <button
              className={"btn btn-primary float-end"}>{!this.consultPages.includes(typePage ?? "") ? "Envoyer" : (typePage === "delete" ? "Supprimer" : "Sauvegarder")}</button>
          </div>}
        </fieldset>
      </form>
    );
  }
}