import Form from "./form";

interface MainProps {
    page: string,
    type?: string
}

export default function Main({page, type}: MainProps) {
    let title;
    let summary;

    switch (page) {
        case "index": {
            title = "Bienvenue";
            if(type === "" || type === undefined){
              summary = "Vous trouverez ici les outils pour permettre de créer un client, un prospect et de les modifier en fonction de l'avancée du client.";
            }else{
              title += " sur la partie " + type;
            }
            break;
        }
        case "contact": {
            title = "Contact";
            summary = "Vous souhaitez nous contacter pour un besoin bien précis ? Veuillez utiliser le formulaire suivant.";
            break;
        }
        default: {
            title = "Erreur";
            summary = "Vous essayez d'accéder à une page qui n'existe pas."
            break;
        }
    }

    return (
        <main>
            <article>
                <header>
                    <h1>{title}</h1>
                </header>
                <section className={"container"} id={"content"}>{summary}</section>
              {
                page === "contact" && <Form typePage={page}></Form>
              }
            </article>
        </main>
    )
}