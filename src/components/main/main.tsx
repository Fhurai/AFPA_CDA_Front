import React, {JSX} from 'react';
import Form from "./form";
import Hovertable from "./hovertable";
import {useParams} from 'react-router-dom';
import {Client} from "../../model/Client";
import {Adresse} from "../../model/Adresse";
import {Prospect} from "../../model/Prospect";
import {Contrat} from "../../model/Contrat";

// Create a HOC to pass params to class component
const withParams = (Component: any) => {
  return (props: any) => <Component {...props} params={useParams()}/>;
};

interface MainProps {
  page: string;
  type: string;
  params?: {
    id?: string;
  };
}

class Main extends React.Component<MainProps> {

  getClient = (
    id: number
  ): Client => {
    let search: Client;

    const data = [
      new Client(1, "Falcom", new Adresse(1, "2 bis", "rue Ardant du Picq", "57004", "Metz"), "0387543400", "contact@falcom.com", "La drogue avec Trails", 999999.99, 80),
      new Client(2, "Capcom", new Adresse(2, "25", "rue de la Taye", "57130", "Jussy"), "0387758575", "contact@capcom.com", "Réel âge d'or ?", 4813.00, 6),
      new Client(3, "Monolith Software", new Adresse(3, "3", "rue des Michottes", "54000", "Nancy"), "0383375640", "contact@monolith-soft.com", "Xenoblade", 50000, 1),
    ];

    data[0].addContrat(new Contrat(1, "Contrat G+", 1500.0, 1));
    data[0].addContrat(new Contrat(2, "Contrat iGoogle", 4500.0, 1));
    data[2].addContrat(new Contrat(3, "Contrat Metaverse", 2000000.0, 3));

    search = data.at(id - 1) as Client;

    return search;
  };

  getProspect = (
    id: number
  ): Prospect => {
    let search: Prospect;

    const data = [
      new Prospect(1, "Skeb", new Adresse(1, "28", "Boulevard Albert 1er", "54000", "Nancy"), "0388553370", "contact@skeb.com", "", new Date("2025-10-09"), "Non"),
      new Prospect(2, "Vgen", new Adresse(1, "80 ter", "Quai Voltaire", "95870", "Bezons"), "0173260000", "contact@artistsnclients.com", "", new Date("2024-05-28"), "Non"),
      new Prospect(3, "Gank", new Adresse(1, "276b", "Avenue du président Wilson", "93210", "St Denis"), "0387172390", "contact@artistsnclients.com", "", new Date("2024-10-10"), "Oui"),
      new Prospect(4, "Artistsnclients", new Adresse(1, "25", "Rue Serpenoise", "57000", "Metz"), "0354626299", "contact@artistsnclients.com", "", new Date("2023-10-15"), "Oui"),
      new Prospect(5, "Discord", new Adresse(1, "46", "Rue des Rats", "54000", "Nancy"), "0394135679", "contact@discord.gg", "", new Date("2024-10-12"), "Non"),
    ];

    search = data.at(id - 1) as Prospect;

    return search;
  };

  render() {
    const {page, type} = this.props;
    let title: string;
    let summary: string | JSX.Element;
    let hovertableColumns: any[] = [];
    let hovertableData: any[] = [];
    const id = parseInt(this.props.params?.id as string) || null;

    let client: any = (type === "client") ? (id !== null ? this.getClient(id) : new Client(0, "", new Adresse(0, "", "", "", ""), "", "", "", 0, 0)) : null;
    let prospect: any = (type === "prospect") ? (id !== null ? this.getProspect(id) : new Prospect(0, "", new Adresse(0, "", "", "", ""), "", "", "", new Date(), "")) : null;

    switch (page) {
      case "index": {
        title = "Bienvenue";
        summary = (type === undefined || type === "")
          ? "Vous trouverez ici les outils pour permettre de créer un client, un prospect et de les modifier en fonction de l'avancée du client."
          : ` sur la partie ${type}`;

        if (type === "clients") {
          hovertableColumns = [
            {"name": "#", "type": "integer", "edit": false},
            {"name": "Raison sociale", "type": "string", "edit": false},
            {"name": "Adresse postale", "type": "string", "edit": false, "className": "longer"},
            {"name": "Téléphone", "type": "string", "edit": false},
            {"name": "Adresse email", "type": "string", "edit": false, "className": "long"},
            {"name": "Chiffre d'affaires", "type": "double", "edit": false, "className": "handlewidth"},
            {"name": "Nb employés", "type": "integer", "edit": false, "className": "handlewidth"}
          ];

          hovertableData = [
            [{"value": 1}, {"value": "Falcom"}, {"value": "2 bis rue Ardant du Picq 57004 Metz"}, {"value": "0387543400"}, {"value": "contact@falcom.com"}, {"value": 999999.99}, {"value": 80}],
            [{"value": 2}, {"value": "Capcom"}, {"value": "25 rue de la Taye 57130 Jussy"}, {"value": "0387758575"}, {"value": "contact@capcom.com"}, {"value": 4813.00}, {"value": 6}],
            [{"value": 3}, {"value": "Monolith Software"}, {"value": "3 rue des Michottes 54000 Nancy"}, {"value": "0383375640"}, {"value": "contact@monolith-soft.com"}, {"value": 50000.00}, {"value": 1}],
          ];
          console.log(hovertableData);
        } else if (type === "prospects") {
          hovertableColumns = [
            {"name": "#", "type": "integer", "edit": false},
            {"name": "Raison sociale", "type": "string", "edit": false},
            {"name": "Adresse postale", "type": "string", "edit": false, "className": "longer"},
            {"name": "Téléphone", "type": "string", "edit": false},
            {"name": "Adresse email", "type": "string", "edit": false, "className": "long"},
            {"name": "Date prospection", "type": "date", "edit": false, "className": "handlewidth"},
            {"name": "Prospect intéressé", "type": "boolean", "edit": false, "className": "handlewidth"}
          ];

          hovertableData = [
            [{"value": 1}, {"value": "Skeb"}, {"value": "28 Boulevard Albert 1er 54000 Nancy"}, {"value": "0388553370"}, {"value": "contact@skeb.com"}, {"value": "2025-10-09"}, {"value": false}],
            [{"value": 2}, {"value": "Vgen"}, {"value": "80 ter Quai Voltaire 95870 Bezons"}, {"value": "0173260000"}, {"value": "contact@vgen.com"}, {"value": "2024-05-28"}, {"value": false}],
            [{"value": 3}, {"value": "Gank"}, {"value": "276b Avenue du président Wilson 93210 St-Denis"}, {"value": "0387172390"}, {"value": "contact@gank.com"}, {"value": "2024-10-10"}, {"value": true}],
            [{"value": 4}, {"value": "Artistsnclients"}, {"value": "25 Rue Serpenoise 57000 Metz"}, {"value": "0354626299"}, {"value": "contact@artistsnclients.com"}, {"value": "2023-10-15"}, {"value": true}],
            [{"value": 5}, {"value": "Discord"}, {"value": "46 Rue des Rats 54000 Nancy"}, {"value": "0394135679"}, {"value": "contact@discord.gg"}, {"value": "2024-10-12"}, {"value": false}],
          ];
        }
        break;
      }
      case "contact": {
        title = "Contact";
        summary = "Vous souhaitez nous contacter pour un besoin bien précis ? Veuillez utiliser le formulaire suivant.";
        break;
      }
      case "connexion":{
        title = "Connexion";
        summary = "Page de connexion sur Reverso.";
        break;
      }
      case "deconnexion":{
        title = "Deconnexion";
        summary = "Souhaitez-vous vous déconnecter de l'application ?";
        break;
      }
      case "view": {
        title = (type.charAt(0).toUpperCase() + type.slice(1)) + " n° " + id;
        summary = `Vous consultez les données actuellement disponibles pour le ${type}.`;
        break;
      }
      case "create": {
        title = `Création d'un nouveau ${type}`;
        summary = `Vous souhaitez créer un nouveau ${type}.`;
        break;
      }
      case "update": {
        title = `${type.charAt(0).toUpperCase() + type.slice(1)} n° ` + id;
        summary = `Vous modifiez les données du ${type}.`;
        break;
      }
      case "delete": {
        title = `${type.charAt(0).toUpperCase() + type.slice(1)} n° ` + id;
        summary = `Vous êtes sur le point de supprimer le ${type}.`;
        break;
      }
      default: {
        title = "Erreur";
        summary = "Vous essayez d'accéder à une page qui n'existe pas.";
        break;
      }
    }

    return (
      <main>
        <article>
          <header>
            <h1>{title}</h1>
          </header>
          <section className="container" id="content">
            <span className={"handlewidth"}>{summary}</span>
            {page === "index" && type !== "" &&
              <a href={`/${type}/create`} className={"btn btn-primary float-end d-flex"}>
                <div className={"material-symbols-outlined danger"}>Add</div>
                <div className={"handlewidth"}>Ajout d'un {type.slice(0, -1)}</div>
              </a>}
          </section>
          {page === "contact" && <Form typePage={page}/>}
          {page === "connexion" && <Form typePage={page} />}
          {page === "deconnexion" && <Form typePage={page} />}
          {page === "index" && type !== "" &&
            <Hovertable
              tablecolumns={hovertableColumns}
              tabledata={hovertableData}
              datatype={type.slice(0, -1)}
            />}
          {page === "view" && <Form typePage={page} client={client} prospect={prospect}></Form>}
          {page === "create" && <Form typePage={page} client={client} prospect={prospect}></Form>}
          {page === "update" && <Form typePage={page} client={client} prospect={prospect}></Form>}
          {page === "delete" && <Form typePage={page} client={client} prospect={prospect}></Form>}
        </article>
      </main>
    );
  }
}

export default withParams(Main);