/**
 * Helper function to create main structure
 * This function creates the main HTML structure including main, article, header, and section elements
 * @param {HTMLElement} root - The root element to append the main structure to
 * @param {string} title - The title to be displayed in the header
 * @param {string} content - The content to be displayed in the section
 * @returns {HTMLElement} The created article element
 */
function createMainStructure(root, title, content) {
    const main = document.createElement("main");
    root.appendChild(main);

    const article = document.createElement("article");
    main.appendChild(article);

    const header = document.createElement("header");
    header.innerHTML = `<h1>${title}</h1>`;
    article.appendChild(header);

    const section = document.createElement("section");
    section.classList = "container";
    section.id = "content";
    section.innerHTML = `<span class='handlewidth'>${content}</span>`;
    article.appendChild(section);

    return article;
}

/**
 * Helper function to create action buttons
 * This function returns a string containing HTML for action buttons (view, update, delete)
 * @returns {string} HTML string for action buttons
 */
function createActionButtons() {
    let actionBtns = "";
    actionBtns += "<a href=\"./view.html\" title=\"Consulter\"><span class=\"material-symbols-outlined\">visibility</span></a>";
    actionBtns += "<a href=\"./update.html\" title=\"Mettre à jour\"><span class=\"material-symbols-outlined warning\">edit</span></a>";
    actionBtns += "<a href=\"./delete.html\" title=\"Supprimer\"><span class=\"material-symbols-outlined danger\">delete</span></a>";
    return actionBtns;
}

/**
 * Function to generate the index page
 * @param {HTMLElement} root - The root element to append the index page content to
 */
function genIndex(root) {
    createMainStructure(root, "Bienvenue", "Vous trouverez ici les outils pour permettre de créer un client, un prospect et de les modifier en fonction de l'avancée du client.");
}

/**
 * Function to generate the contact page
 * @param {HTMLElement} root - The root element to append the contact page content to
 */
function genContact(root) {
    const article = createMainStructure(root, "Contact", "Vous souhaitez nous contacter pour un besoin bien précis ? Veuillez utiliser le formulaire suivant.");
    genUtilisateurForm(article);
}

/**
 * Function to generate the connexion page
 * @param {HTMLElement} root - The root element to append the connexion page content to
 */
function genConnexion(root) {
    const article = createMainStructure(root, "Connexion", "Page de connexion sur Reverso.");
    genUtilisateurForm(article);
}

/**
 * Function to generate the deconnexion page
 * @param {HTMLElement} root - The root element to append the deconnexion page content to
 */
function genDeconnexion(root) {
    const article = createMainStructure(root, "Déconnexion", "Souhaitez-vous vous déconnecter de l'application ?");
    genUtilisateurForm(article);
}

/**
 * Function to generate the societe index page
 * This function generates the main structure for the societe index page, creates a button for adding new entries, and generates a table with data
 * @param {HTMLElement} root - The root element to append the societe index page content to
 */
function genSocieteIndex(root) {
    const typeSociete = getCurrentPage().split("/")[1];
    const headerData = (typeSociete === "clients") ? [
        {
            "libelle": "#",
            "class": "smaller",
            "type": "number",
            "step": 1,
            "min": 1
        },
        {
            "libelle": "Raison sociale",
            "class": "",
            "type": "text"
        },
        {
            "libelle": "Adresse postale",
            "class": "longer",
            "type": "text"
        },
        {
            "libelle": "Téléphone",
            "class": "",
            "type": "text"
        },
        {
            "libelle": "Adresse Mail",
            "class": "long",
            "type": "text"
        },
        {
            "libelle": "Chiffre d'affaires",
            "class": "handlewidth",
            "type": "number",
            "step": 0.01,
            "min": 250
        },
        {
            "libelle": "Nb Employés",
            "class": "handlewidth",
            "type": "number",
            "step": 1,
            "min": 1
        },
        {
            "libelle": "Actions",
            "class": "small",
            "type": null
        }
    ] : [
        {
            "libelle": "#",
            "class": "smaller",
            "type": "number"
        },
        {
            "libelle": "Raison sociale",
            "class": "",
            "type": "text"
        },
        {
            "libelle": "Adresse postale",
            "class": "longer",
            "type": "text"
        },
        {
            "libelle": "Téléphone",
            "class": "",
            "type": "text"
        },
        {
            "libelle": "Adresse Mail",
            "class": "long",
            "type": "text"
        },
        {
            "libelle": "Date prospection",
            "class": "handlewidth",
            "type": "date"
        },
        {
            "libelle": "Prospect intéressé",
            "class": "handlewidth",
            "type": "boolean"
        },
        {
            "libelle": "Actions",
            "class": "small",
            "type": null
        }
    ];

    const bodyData = (typeSociete === "clients") ? [
        [{"value": 1}, {"value": "Falcom"}, {"value": "2 bis rue Ardant du Picq 57004 Metz"}, {"value": "0387543400"}, {"value": "contact@falcom.com"}, {"value": 999999.99}, {"value": 80}, {"value": createActionButtons()}],
        [{"value": 2}, {"value": "Capcom"}, {"value": "25 rue de la Taye 57130 Jussy"}, {"value": "0387758575"}, {"value": "contact@capcom.com"}, {"value": 4813.00}, {"value": 6}, {"value": createActionButtons()}],
        [{"value": 3}, {"value": "Monolith Software"}, {"value": "3 rue des Michottes 54000 Nancy"}, {"value": "0383375640"}, {"value": "contact@monolith-soft.com"}, {"value": 50000.00}, {"value": 1}, {"value": createActionButtons()}],
    ] : [
        [{"value": 1}, {"value": "Skeb"}, {"value": "28 Boulevard Albert 1er 54000 Nancy"}, {"value": "0388553370"}, {"value": "contact@skeb.com"}, {"value": "2025-10-09"}, {"value": false}, {"value": createActionButtons()}],
        [{"value": 2}, {"value": "Vgen"}, {"value": "80 ter Quai Voltaire 95870 Bezons"}, {"value": "0173260000"}, {"value": "contact@vgen.com"}, {"value": "2024-05-28"}, {"value": false}, {"value": createActionButtons()}],
        [{"value": 3}, {"value": "Gank"}, {"value": "276b Avenue du président Wilson 93210 St-Denis"}, {"value": "0387172390"}, {"value": "contact@gank.com"}, {"value": "2024-10-10"}, {"value": true}, {"value": createActionButtons()}],
        [{"value": 4}, {"value": "Artistsnclients"}, {"value": "25 Rue Serpenoise 57000 Metz"}, {"value": "0354626299"}, {"value": "contact@artistsnclients.com"}, {"value": "2023-10-15"}, {"value": true}, {"value": createActionButtons()}],
        [{"value": 5}, {"value": "Discord"}, {"value": "46 Rue des Rats 54000 Nancy"}, {"value": "0394135679"}, {"value": "contact@discord.gg"}, {"value": "2024-10-12"}, {"value": false}, {"value": createActionButtons()}],
    ];

    const article = createMainStructure(root, "Bienvenue", `sur la partie ${typeSociete}`);
    const createBtn = document.createElement("a");
    createBtn.classList = "btn btn-primary float-end d-flex";
    createBtn.href = `../${typeSociete}/create.html`;
    createBtn.innerHTML = `<div class="material-symbols-outlined danger">Add</div><div class="handlewidth">Ajout d'un </div>&nbsp;${typeSociete.substring(0, typeSociete.length - 1)}`;
    article.querySelector("#content").appendChild(createBtn);

    genHoverTable(article, headerData, bodyData);
}

/**
 * Function to generate the societe view page
 * This function generates the main structure for the societe view page and adds a societe form
 * @param {HTMLElement} root - The root element to append the societe view page content to
 */
function genSocieteView(root) {
    const typeSociete = getCurrentPage().split("/")[1];
    const article = createMainStructure(root, "Consultation", `Vous consultez les données actuellement disponibles pour le ${typeSociete.substring(0, typeSociete.length - 1)} n°1 :`);
    genSocieteForm(article, typeSociete);
}

/**
 * Function to generate the societe create page
 * This function generates the main structure for the societe create page and adds a societe form
 * @param {HTMLElement} root - The root element to append the societe create page content to
 */
function genSocieteCreate(root) {
    const typeSociete = getCurrentPage().split("/")[1];
    const article = createMainStructure(root, "Création", `Quel nouveau ${typeSociete.substring(0, typeSociete.length - 1)} souhaitez vous créer ?`);
    genSocieteForm(article, typeSociete);
}

/**
 * Function to generate the societe update page
 * This function generates the main structure for the societe update page and adds a societe form
 * @param {HTMLElement} root - The root element to append the societe update page content to
 */
function genSocieteUpdate(root) {
    const typeSociete = getCurrentPage().split("/")[1];
    const article = createMainStructure(root, "Modification", "Vous modifiez les données.");
    genSocieteForm(article, typeSociete);
}

/**
 * Function to generate the societe delete page
 * This function generates the main structure for the societe delete page and adds a societe form
 * @param {HTMLElement} root - The root element to append the societe delete page content to
 */
function genSocieteDelete(root) {
    const typeSociete = getCurrentPage().split("/")[1];
    const article = createMainStructure(root, "Suppression", "Vous souhaitez supprimer les données ?");
    genSocieteForm(article, typeSociete);
}