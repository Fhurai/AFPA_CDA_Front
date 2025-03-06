import React from 'react';
import {Client} from "../../model/Client";
import {Prospect} from "../../model/Prospect";
import Strings from "../../utilities/Strings";
import Input from "./input";
import Textarea from "./textarea";
import {MapContainer, Marker, TileLayer} from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import {Icon, LatLng} from "leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";
import Meteo from "../../utilities/Meteo";

export interface FormState {
  geometry: number[],
  temperature: [number, string],
  humidite: [number, string],
  pluie: [number, string],
  vent: [number, string],
  nebulosite: [number, string]
}

interface FormProps {
  typePage: string;
  client?: Client;
  prospect?: Prospect;
}

export default class Form extends React.Component<FormProps, FormState> {
  consultPages: string[] = ["view", "create", "update", "delete"];

  constructor(props: FormProps) {
    super(props);
    this.state = {
      geometry: [],
      temperature: [0, ""],
      humidite: [0, ""],
      pluie: [0, ""],
      vent: [0, ""],
      nebulosite: [0, ""]
    };
  }

  componentDidMount() {
    const {typePage} = this.props;
    if (typePage === "view") {
      this.searchGeolocalisation()
        .then(r => {
          console.log(r);
          this.getMeteo(r.toString())
            .then(r => {
              console.log(r);
          })
        });
    }
  }

  async searchGeolocalisation(): Promise<[number, number]> {
    const {client, prospect} = this.props;
    let adresse: string = "";

    if (client !== null) {
      adresse = client?.adresse.toString() as string;
    }

    if (prospect !== null) {
      adresse = prospect?.adresse.toString() as string;
    }

    const response = await fetch("https://api-adresse.data.gouv.fr/search/?q=" + adresse.replaceAll(" ", "+"));

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();

    this.setState({
      geometry: [json.features[0].geometry.coordinates[1], json.features[0].geometry.coordinates[0]]
    });

    return [json.features[0].geometry.coordinates[1], json.features[0].geometry.coordinates[0]];
  }

  async getMeteo(coordinates: string) {
    const url = "https://www.infoclimat.fr/public-api/gfs/json?_ll="+coordinates+
      "&_auth=Bx0DFAV7U3FRfFZhUCYFLAdvAjcLfQUiAX1QM1w5XyJWPVAxBGRQNgRqWicAL1dhUH0EZww3CTkHbAJ6WigDYgdtA28FblM0UT5WM1B%2FBS4HPQJnCzwFNAFrUChcLl89Vj1QPAR5UDAEaFo5AC5XZVBmBHoMMgkxB2wCelooA2EHYwNjBWdTMVE3VjNQZAUxBzICfQsrBTsBZVBkXDZfPFY8UGYEMlBhBGlaPAA4VzBQZAR6DDEJMQdgAmNaMANjB2ADYwV5Uy5RR1ZHUH0FcQd2AjcLcgUgATdQaVxl&_c=83c427140f87bd975fcfb36035f83e4b";
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    try {
      const date: Date = new Date();
      let dateString = date.toISOString().split("T")[0];
      const json = await response.json();

      if(date.getHours() <= 1){
        dateString += " 01:00:00";
      }else if(date.getHours() > 1 && date.getHours() <= 4){
        dateString += " 04:00:00";
      }else if(date.getHours() > 4 && date.getHours() <= 7){
        dateString += " 07:00:00";
      }else if(date.getHours() > 7 && date.getHours() <= 10){
        dateString += " 10:00:00";
      }else if(date.getHours() > 10 && date.getHours() <= 13){
        dateString += " 13:00:00";
      }else if(date.getHours() > 13 && date.getHours() <= 16){
        dateString += " 16:00:00";
      }else if(date.getHours() > 16 && date.getHours() <= 19){
        dateString += " 19:00:00";
      }else if(date.getHours() > 19 && date.getHours() <= 22){
        dateString += " 22:00:00";
      }else if(date.getHours() > 22){
        date.setDate(date.getDate() + 1);
        dateString = date.toISOString().split("T")[0] + "01:00:00";
      }

      this.setState({
        temperature: Meteo.getTemperature(json[dateString]),
        humidite: Meteo.getHumidite(json[dateString]),
        pluie: Meteo.getPluie(json[dateString]),
        vent: Meteo.getVent(json[dateString]),
        nebulosite: Meteo.getNebulosite(json[dateString]),
      });

      return [dateString, Meteo.getTypeMeteo(this.state.temperature[0], this.state.pluie[0], this.state.vent[0], this.state.nebulosite[0], this.state.humidite[0])];
    } catch (error: any) {
      this.setState({
        temperature: [0, ""],
        humidite: [0, ""],
        pluie: [0, ""],
        vent: [0, ""],
        nebulosite: [0, ""]
      });
      console.error(error.message);
      return ["", ""];
    }
  }

  delete(event: React.MouseEvent<HTMLButtonElement>){
    event.preventDefault();

    if(window.confirm("Confirmezvous la suppression de la société ?")){
      console.log("Redirection");
    }else{
      console.log("Stay");
    }
  }

  save(event: React.MouseEvent<HTMLButtonElement>){
    event.preventDefault();
    console.log("Save");
  }

  render() {
    const {typePage, client, prospect} = this.props;
    const disabled = typePage === "view" || typePage === "delete";

    const icon = new Icon({
      iconUrl : 'https://unpkg.com/leaflet@1.4.0/dist/images/marker-icon.png',
      iconSize : [35,55], // size of the icon
      iconAnchor : [0,0], // point of the icon which will correspond to marker's location
      popupAnchor : [-3, -76] // point from which the popup should open relative to the iconAnchor
    });

    return (<>
      <form method="post" action="#">
        <fieldset className={(typePage !== "deconnexion" ? "row" : "") + " modal-dialog-centered"}>
          {/**
           * Partie contact
           */}
          {typePage === "contact" && <>
            <Input type={"text"} name={"prenom"} className={"col-md-6"} sizeInput={30} required={true}
                   pattern={Strings.getPattern("nom")}/>
            <Input type={"text"} name={"nom"} className={"col-md-6"} sizeInput={30} required={true}
                   pattern={Strings.getPattern("nom")}/>
            <Input type={"text"} name={"adresseMail"} className={"col-md-6"} sizeInput={30} required={true}
                   pattern={Strings.getPattern("adresseMail")}/>
            <Textarea name={"message"} className={"col-md-12"} placeholder={"Le contenu de votre message"}
                      sizeRows={10} required={true}/>
          </>}
          {typePage === "connexion" && <>
            <Input type={"text"} name={"adresseMail"} className={"col-md-12"} sizeInput={30} required={true}
                   pattern={Strings.getPattern("adresseMail")}/>
            <Input type={"password"} name={"password"} className={"col-md-12"} sizeInput={30} required={true}/>
          </>}
          {typePage === "deconnexion" && <>
            <button defaultValue={"oui"} name={"answer"} className={"btn btn-success" +
              " col-md-2"}>Oui
            </button>
            <button defaultValue={"Non"} name={"answer"} className={"btn btn-danger col-md-2"}>Non</button>
          </>}
          {/**
           * Partie clients/prospects
           */}
          {this.consultPages.includes(typePage ?? "") && <>
            <legend className="border-bottom mb-4">Partie société</legend>
            <Input type={"text"} name={"raisonSociale"} className={"col-md-6"} sizeInput={30} disabled={disabled}
                   value={client !== null ? client?.raisonSociale : prospect?.raisonSociale} required={true}
                   pattern={Strings.getPattern("nom")}/>
            <Input type={"text"} name={"telephone"} className={"col-md-6"} sizeInput={12} disabled={disabled}
                   value={client !== null ? client?.telephone : prospect?.telephone} required={true}
                   pattern={Strings.getPattern("telephone")}/>
            <Input type={"text"} name={"adresseMail"} className={"col-md-6"} sizeInput={30} disabled={disabled}
                   value={client !== null ? client?.mail : prospect?.mail} required={true}
                   pattern={Strings.getPattern("adresseMail")}/>
            <Textarea name={"commentaires"} className={"col-md-12"}
                      placeholder={`Commentaires sur le ${client !== null ? "client" : "prospect"}`} sizeRows={5}
                      disabled={disabled} value={client !== null ? client?.commentaires : prospect?.commentaires}/>

            <legend className="border-bottom mb-4 mt-4 d-flex">Partie adresse{typePage === "view" ?
              <> - {Meteo.getTypeMeteo(this.state.temperature[0], this.state.pluie[0], this.state.vent[0], this.state.nebulosite[0], this.state.humidite[0])} &nbsp;
                <div className={"btn btn-primary"} data-bs-toggle="modal" data-bs-target="#modal">Voir détails</div></> : ""}</legend>
            {
              this.state.geometry.toString() !== "" &&
              <MapContainer center={new LatLng(this.state.geometry[0] ?? 48.8575, this.state.geometry[1] ?? 2.3514)} zoom={16}>
                <TileLayer
                  attribution='&copy; <a href="https://osm.org/copyright%22%3EOpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <MarkerClusterGroup>
                  <Marker icon={icon} position={new LatLng(this.state.geometry[0] ?? 48.8575, this.state.geometry[1] ?? 2.3514)} />
                </MarkerClusterGroup>
              </MapContainer>
            }


            <Input type={"text"} name={"numeroRue"} className={"col-md-3"} sizeInput={15} disabled={disabled}
                   value={client !== null ? client?.adresse.numeroRue : prospect?.adresse.numeroRue} required={true}
                   pattern={Strings.getPattern("numeroRue")}/>
            <Input type={"text"} name={"nomRue"} className={"col-md-9"} sizeInput={30} disabled={disabled}
                   value={client !== null ? client?.adresse.nomRue : prospect?.adresse.nomRue} required={true}
                   pattern={Strings.getPattern("ville")}/>
            <Input type={"text"} name={"codePostal"} className={"col-md-2"} sizeInput={5} disabled={disabled}
                   value={client !== null ? client?.adresse.codePostal : prospect?.adresse.codePostal} required={true}
                   pattern={Strings.getPattern("codePostal")}/>
            <Input type={"text"} name={"ville"} className={"col-md-10"} sizeInput={30} disabled={disabled}
                   value={client !== null ? client?.adresse.ville : prospect?.adresse.ville} required={true}
                   pattern={Strings.getPattern("ville")}/>
            <legend className="border-bottom mb-4 mt-4">Partie {client !== undefined ? "client" : "prospect"}</legend>
          </>}
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
            <Input type={"date"} name={"dateProspection"} className={"col-md-6"} disabled={disabled}
                   value={prospect?.dateProspection.toISOString()} required={true}/>
            <Input type={"checkbox"} name={"prospectInteresse"} className={"col-md-6"} disabled={disabled}
                   value={prospect?.prospectInteresse} required={true}/>
          </> : ""}
          {/**
           * Partie commune
           */}
          <hr className={"mt-4"}/>
          <div className="form-group col-md-12">
            {
              <>
                {typePage === "view" && ""}
                {typePage === "delete" && <button onClick={this.delete} className={"btn btn-danger float-end"}>Supprimer</button>}
                {["create", "update"].includes(typePage) &&
                  <button onClick={this.save} className={"btn btn-primary float-end"}>Sauvegarder</button>}
              </>
            }
          </div>
        </fieldset>
      </form>
        <div id={"modal"} className={"modal fade"}  aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabIndex={-1}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">{Meteo.getTypeMeteo(this.state.temperature[0], this.state.pluie[0], this.state.vent[0], this.state.nebulosite[0], this.state.humidite[0])}</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <div>
                  <h5>Température</h5>
                  {this.state.temperature[0]}°C - <>{this.state.temperature[1]}</>
                </div>
                <div>
                  <h5>Pluie</h5>
                  {this.state.pluie[0]}mm - <>{this.state.pluie[1]}</>
                </div>
                <div>
                  <h5>Vent</h5>
                  {this.state.vent[0]}km/h - <>{this.state.vent[1]}</>
                </div>
                <div>
                   <h5>Nébulosité</h5>
                  {this.state.nebulosite[0]}% - <>{this.state.nebulosite[1]}</>
                </div>
                <div>
                   <h5>Humidité</h5>
                  {this.state.humidite[0]}% - <>{this.state.humidite[1]}</>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}