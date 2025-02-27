import React, {JSX} from 'react';
import Form from "./form";
import Hovertable from "./hovertable";

interface MainProps {
  page: string;
  type?: string;
}

export default class Main extends React.Component<MainProps> {
  render() {
    const { page, type } = this.props;
    let title: string;
    let summary: string | JSX.Element;
    let hovertableColumns: any[] = [];
    let hovertableData: any[] = [];

    switch (page) {
      case "index": {
        title = "Bienvenue";
        summary = (type === undefined)
          ? "Vous trouverez ici les outils pour permettre de créer un client, un prospect et de les modifier en fonction de l'avancée du client."
          : ` sur la partie ${type}`;
        break;
      }
      case "contact": {
        title = "Contact";
        summary = "Vous souhaitez nous contacter pour un besoin bien précis ? Veuillez utiliser le formulaire suivant.";
        break;
      }
      case "clients-index": {
        title = "Liste des clients";
        summary = "Consulter l'ensemble des clients disponibles actuellement.";
        hovertableColumns = [
          {"name": "#", "type": "integer", "edit": false},
          {"name": "Raison sociale", "type": "string", "edit": false},
          {"name": "Téléphone", "type": "string", "edit": false},
          {"name": "Adresse email", "type": "string", "edit": false},
          {"name": "Chiffre d'affaires", "type": "double", "edit": false},
          {"name": "Nb employés", "type": "integer", "edit": false}
        ];
        hovertableData = [
          [{"value": 1},{"value": "Falcom"}, {"value": "0387543400"}, {"value": "contact@falcom.com"}, {"value": 999999.99}, {"value": 80}],
          [{"value": 2},{"value": "Capcom"}, {"value": "0387758575"}, {"value": "contact@capcom.com"}, {"value": 4813.00}, {"value": 6}],
          [{"value": 3},{"value": "Monolith Software"}, {"value": "0383375640"}, {"value": "contact@monolith-soft.com"}, {"value": 50000.00}, {"value": 1}],
        ];
        break;
      }
      case "prospects-index": {
        title = "Liste des prospects";
        summary = "Consulter l'ensemble des prospects disponibles actuellement.";
        hovertableColumns = [
          {"name": "#", "type": "integer", "edit": false},
          {"name": "Raison sociale", "type": "string", "edit": false},
          {"name": "Téléphone", "type": "string", "edit": false},
          {"name": "Adresse email", "type": "string", "edit": false},
          {"name": "Date prospection", "type": "date", "edit": false},
          {"name": "Prospect intéressé", "type": "boolean", "edit": false}
        ];

        hovertableData = [
          [{"value": 1}, {"value": "Skeb"}, {"value": "0388553370"}, {"value": "contact@skeb.com"}, {"value": "2025-10-09"}, {"value": false}],
          [{"value": 2}, {"value": "Vgen"}, {"value": "0173260000"}, {"value": "contact@vgen.com"}, {"value": "2024-05-28"}, {"value": false}],
          [{"value": 3}, {"value": "Gank"}, {"value": "0387172390"}, {"value": "contact@gank.com"}, {"value": "2024-10-10"}, {"value": true}],
          [{"value": 4}, {"value": "Artistsnclients"}, {"value": "0354626299"}, {"value": "contact@artistsnclients.com"}, {"value": "2023-10-15"}, {"value": true}],
          [{"value": 5}, {"value": "Discord"}, {"value": "0394135679"}, {"value": "contact@discord.gg"}, {"value": "2024-10-12"}, {"value": false}],
        ];
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
          <section className="container" id="content">{summary}</section>
          {page === "contact" && <Form typePage={page} />}
          {page === "clients-index" &&
            <Hovertable
              tablecolumns={hovertableColumns}
              tabledata={hovertableData}
            />}
          {page === "prospects-index" &&
            <Hovertable
              tablecolumns={hovertableColumns}
              tabledata={hovertableData}
            />}
        </article>
      </main>
    );
  }
}