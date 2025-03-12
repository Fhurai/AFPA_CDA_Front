function genDOM() {
    genHeader(document.body)
    switch (getCurrentPage()) {
        case "Front/index.html":
            genIndex(document.body);
            break;
        case "Front/contact.html":
            genContact(document.body);
            break;
        case "Front/connexion.html":
            genConnexion(document.body);
            break;
        case "Front/deconnexion.html":
            genDeconnexion(document.body);
            break;
        case "Front/clients/index.html":
        case "Front/prospects/index.html":
            genSocieteIndex(document.body);
            break;
        case "Front/clients/view.html":
        case "Front/prospects/view.html":
            genSocieteView(document.body);
            break;
        case "Front/clients/create.html":
        case "Front/prospects/create.html":
            genSocieteCreate(document.body);
            break;
        case "Front/clients/update.html":
        case "Front/prospects/update.html":
            genSocieteUpdate(document.body);
            break;
        case "Front/clients/delete.html":
        case "Front/prospects/delete.html":
            genSocieteDelete(document.body);
            break;
        default:
            console.error("Page non reconnue !");
    }
    genFooter(document.body);
}

function genIndex(root) {
    const main = document.createElement("main");
    root.appendChild(main);

    const article = document.createElement("article");
    main.appendChild(article);

    const header = document.createElement("header");
    header.innerHTML = "<h1>Bienvenue</h1>";
    article.appendChild(header);

    const section = document.createElement("section");
    section.classList = "container";
    section.id = "content";
    section.innerHTML = "<span class='handlewidth'>" +
        "Vous trouverez ici les outils pour permettre de créer un client, un prospect et de les modifier en fonction de l'avancée du client." +
        "</span>";
    article.appendChild(section);
}

function genContact(root) {
    const main = document.createElement("main");
    root.appendChild(main);

    const article = document.createElement("article");
    main.appendChild(article);

    const header = document.createElement("header");
    header.innerHTML = "<h1>Contact</h1>";
    article.appendChild(header);

    const section = document.createElement("section");
    section.classList = "container";
    section.id = "content";
    section.innerHTML = "<span class='handlewidth'>" +
        "Vous souhaitez nous contacter pour un besoin bien précis ? Veuillez utiliser le formulaire suivant." +
        "</span>";
    article.appendChild(section);

    genUtilisateurForm(article);
}

function genConnexion(root) {
    const main = document.createElement("main");
    root.appendChild(main);

    const article = document.createElement("article");
    main.appendChild(article);

    const header = document.createElement("header");
    header.innerHTML = "<h1>Connexion</h1>";
    article.appendChild(header);

    const section = document.createElement("section");
    section.classList = "container";
    section.id = "content";
    section.innerHTML = "<span class='handlewidth'>" +
        "Page de connexion sur Reverso." +
        "</span>";
    article.appendChild(section);

    const form = document.createElement("form");
    form.action = "#";
    form.method = "post";
    article.appendChild(form);

    genUtilisateurForm(article);
}

function genDeconnexion(root) {
    const main = document.createElement("main");
    root.appendChild(main);

    const article = document.createElement("article");
    main.appendChild(article);

    const header = document.createElement("header");
    header.innerHTML = "<h1>Déconnexion</h1>";
    article.appendChild(header);

    const section = document.createElement("section");
    section.classList = "container";
    section.id = "content";
    section.innerHTML = "<span class='handlewidth'>" +
        "Souhaitez-vous vous déconnecter de l'application ?" +
        "</span>";
    article.appendChild(section);

    genUtilisateurForm(article);
}

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

    let actionBtns = "";
    actionBtns += "<a href=\"./view.html\" title=\"Consulter\"><span class=\"material-symbols-outlined\">visibility</span></a>";
    actionBtns += "<a href=\"./update.html\" title=\"Mettre à jour\"><span class=\"material-symbols-outlined warning\">edit</span></a>";
    actionBtns += "<a href=\"./delete.html\" title=\"Supprimer\"><span class=\"material-symbols-outlined danger\">delete</span></a>";

    const bodyData = (typeSociete === "clients") ? [
        [{"value": 1}, {"value": "Falcom"}, {"value": "2 bis rue Ardant du Picq 57004 Metz"}, {"value": "0387543400"}, {"value": "contact@falcom.com"}, {"value": 999999.99}, {"value": 80}, {"value": actionBtns}],
        [{"value": 2}, {"value": "Capcom"}, {"value": "25 rue de la Taye 57130 Jussy"}, {"value": "0387758575"}, {"value": "contact@capcom.com"}, {"value": 4813.00}, {"value": 6}, {"value": actionBtns}],
        [{"value": 3}, {"value": "Monolith Software"}, {"value": "3 rue des Michottes 54000 Nancy"}, {"value": "0383375640"}, {"value": "contact@monolith-soft.com"}, {"value": 50000.00}, {"value": 1}, {"value": actionBtns}],
    ] : [
        [{"value": 1}, {"value": "Skeb"}, {"value": "28 Boulevard Albert 1er 54000 Nancy"}, {"value": "0388553370"}, {"value": "contact@skeb.com"}, {"value": "2025-10-09"}, {"value": false}, {"value": actionBtns}],
        [{"value": 2}, {"value": "Vgen"}, {"value": "80 ter Quai Voltaire 95870 Bezons"}, {"value": "0173260000"}, {"value": "contact@vgen.com"}, {"value": "2024-05-28"}, {"value": false}, {"value": actionBtns}],
        [{"value": 3}, {"value": "Gank"}, {"value": "276b Avenue du président Wilson 93210 St-Denis"}, {"value": "0387172390"}, {"value": "contact@gank.com"}, {"value": "2024-10-10"}, {"value": true}, {"value": actionBtns}],
        [{"value": 4}, {"value": "Artistsnclients"}, {"value": "25 Rue Serpenoise 57000 Metz"}, {"value": "0354626299"}, {"value": "contact@artistsnclients.com"}, {"value": "2023-10-15"}, {"value": true}, {"value": actionBtns}],
        [{"value": 5}, {"value": "Discord"}, {"value": "46 Rue des Rats 54000 Nancy"}, {"value": "0394135679"}, {"value": "contact@discord.gg"}, {"value": "2024-10-12"}, {"value": false}, {"value": actionBtns}],
    ];

    const main = document.createElement("main");
    root.appendChild(main);

    const article = document.createElement("article");
    main.appendChild(article);

    const header = document.createElement("header");
    header.innerHTML = "<h1>Bienvenue</h1>";
    article.appendChild(header);

    const section = document.createElement("section");
    section.classList = "container";
    section.id = "content";
    section.innerHTML = "<span class='handlewidth'>sur la partie " + typeSociete + "</span>";
    article.appendChild(section);

    const createBtn = document.createElement("a");
    createBtn.classList = "btn btn-primary float-end d-flex";
    createBtn.href = `../${typeSociete}/create.html`;
    createBtn.innerHTML = "<div class=\"material-symbols-outlined" +
        " danger\">Add</div><div class=\"handlewidth\">Ajout d'un" +
        " </div>&nbsp;" + typeSociete.substring(0, typeSociete.length - 1);
    section.appendChild(createBtn);

    genHoverTable(article, headerData, bodyData);
}

function genSocieteView(root) {
    const typeSociete = getCurrentPage().split("/")[1];

    const main = document.createElement("main");
    root.appendChild(main);

    const article = document.createElement("article");
    main.appendChild(article);

    const header = document.createElement("header");
    header.innerHTML = "<h1>Consultation</h1>";
    article.appendChild(header);

    const section = document.createElement("section");
    section.classList = "container";
    section.id = "content";
    section.innerHTML = "<span class='handlewidth'>Vous consultez les données actuellement disponibles pour le " + typeSociete.substring(0, typeSociete.length - 1) + " n°1 : </span>";
    article.appendChild(section);

    genSocieteForm(article, typeSociete);
}

function genSocieteCreate(root) {
    const typeSociete = getCurrentPage().split("/")[1];

    const main = document.createElement("main");
    root.appendChild(main);

    const article = document.createElement("article");
    main.appendChild(article);

    const header = document.createElement("header");
    header.innerHTML = "<h1>Création</h1>";
    article.appendChild(header);

    const section = document.createElement("section");
    section.classList = "container";
    section.id = "content";
    section.innerHTML = "<span class='handlewidth'>Quel nouveau " + typeSociete.substring(0, typeSociete.length - 1) + " souhaitez vous créer ?</span>";
    article.appendChild(section);

    genSocieteForm(article, typeSociete);
}

function genSocieteUpdate(root) {
    const typeSociete = getCurrentPage().split("/")[1];

    const main = document.createElement("main");
    root.appendChild(main);

    const article = document.createElement("article");
    main.appendChild(article);

    const header = document.createElement("header");
    header.innerHTML = "<h1>Modification</h1>";
    article.appendChild(header);

    const section = document.createElement("section");
    section.classList = "container";
    section.id = "content";
    section.innerHTML = "<span class='handlewidth'>Vous modifiez les données.</span>";
    article.appendChild(section);

    genSocieteForm(article, typeSociete);
}

function genSocieteDelete(root) {
    const typeSociete = getCurrentPage().split("/")[1];

    const main = document.createElement("main");
    root.appendChild(main);

    const article = document.createElement("article");
    main.appendChild(article);

    const header = document.createElement("header");
    header.innerHTML = "<h1>Modification</h1>";
    article.appendChild(header);

    const section = document.createElement("section");
    section.classList = "container";
    section.id = "content";
    section.innerHTML = "<span class='handlewidth'>Vous souhaitez supprimer les données ?</span>";
    article.appendChild(section);

    genSocieteForm(article, typeSociete);
}

function genHeader(root) {
    const header = document.createElement("header");
    header.classList = "header";
    root.appendChild(header);

    const nav = document.createElement("nav");
    nav.classList = "navbar navbar-expand-lg fixed-top";
    header.appendChild(nav);

    //***
    const containerFluid = document.createElement("div");
    containerFluid.classList = "container-fluid";
    nav.appendChild(containerFluid);

    const titleLink = document.createElement("a");
    titleLink.classList = "navbar-brand";
    titleLink.href = (getCurrentPage().split("/").length === 2 ? '.' : '..') + "/index.html";
    titleLink.textContent = "Reverso";
    containerFluid.appendChild(titleLink);

    const navbarToggler = document.createElement("button");
    navbarToggler.ariaLabel = "navbar-toggler";
    navbarToggler.classList = navbarToggler.ariaLabel;
    navbarToggler.id = navbarToggler.ariaLabel;
    navbarToggler.type = "button";
    navbarToggler.dataset.bsTarget = "#offcanvasNavbar";
    navbarToggler.dataset.bsToggle = "offcanvas";
    navbarToggler.innerHTML = "<span class=\"navbar-toggler-icon\"></span>";
    containerFluid.appendChild(navbarToggler);

    //***
    const offcanvas = document.createElement("div");
    offcanvas.classList = "offcanvas offcanvas-end";
    offcanvas.id = "offcanvasNavbar";
    offcanvas.tabIndex = "-1";
    nav.appendChild(offcanvas);

    const offcanvasHeader = document.createElement("div");
    offcanvasHeader.classList = "offcanvas-header";
    offcanvas.appendChild(offcanvasHeader);

    const offcanvasTitle = document.createElement("h5");
    offcanvasTitle.classList = "offcanvas-title";
    offcanvasTitle.id = "offcanvasNavbarLabel";
    offcanvasTitle.textContent = "Reverso";
    offcanvasHeader.appendChild(offcanvasTitle);

    const btnClose = document.createElement("button");
    btnClose.ariaLabel = "Close";
    btnClose.classList = "btn-close";
    btnClose.type = "button";
    btnClose.dataset.bsDismiss = "offcanvas";
    offcanvasHeader.appendChild(btnClose);

    const offcanvasBody = document.createElement("div");
    offcanvasBody.classList = "offcanvas-body";
    offcanvas.appendChild(offcanvasBody);

    // ***
    const centerList = document.createElement("ul");
    centerList.classList = "navbar-nav justify-content-end flex-grow-1 pe-3";
    offcanvasBody.appendChild(centerList);

    const accueilItem = document.createElement("li");
    accueilItem.ariaLabel = "Page d'accueil";
    accueilItem.classList = "nav-item";
    centerList.appendChild(accueilItem);

    const accueilLink = document.createElement("a");
    accueilLink.classList = "nav-link active";
    accueilLink.href = (getCurrentPage().split("/").length === 2 ? '.' : '..') + "/index.html";
    accueilLink.innerHTML = "<div class=\"material-symbols-outlined\">home</div><div>Accueil</div>";
    accueilItem.appendChild(accueilLink);

    const clientsItem = document.createElement("li");
    clientsItem.ariaLabel = "Partie Clients";
    clientsItem.classList = "nav-item";
    centerList.appendChild(clientsItem);

    const clientsLink = document.createElement("a");
    clientsLink.classList = "nav-link active";
    clientsLink.href = (getCurrentPage().split("/").length === 2 ? '.' : '..') + "/clients/index.html";
    clientsLink.innerHTML = "<div" +
        " class=\"material-symbols-outlined\">contact_page</div><div>Clients</div>";
    clientsItem.appendChild(clientsLink);

    const prospectsItem = document.createElement("li");
    prospectsItem.ariaLabel = "Partie Prospects";
    prospectsItem.classList = "nav-item";
    centerList.appendChild(prospectsItem);

    const prospectsLink = document.createElement("a");
    prospectsLink.classList = "nav-link active";
    prospectsLink.href = (getCurrentPage().split("/").length === 2 ? '.' : '..') + "/prospects/index.html";
    prospectsLink.innerHTML = "<div" +
        " class=\"material-symbols-outlined\">perm_contact_calendar</div><div>Prospects</div>";
    prospectsItem.appendChild(prospectsLink);

    // ***
    const hr = document.createElement("hr");
    offcanvasBody.appendChild(hr);

    // ***
    const endList = document.createElement("ul");
    endList.classList = "navbar-nav justify-content-end flex-grow-1 pe-3";
    offcanvasBody.appendChild(endList);

    const connexionItem = document.createElement("li");
    connexionItem.ariaLabel = "Page de connexion";
    connexionItem.classList = "nav-item";
    endList.appendChild(connexionItem);

    const connexionLink = document.createElement("a");
    connexionLink.classList = "nav-link active";
    connexionLink.href = (getCurrentPage().split("/").length === 2 ? '.' : '..') + "/connexion.html";
    connexionLink.innerHTML = "<div" +
        " class=\"material-symbols-outlined\">login</div><div>Connexion</div>";
    connexionItem.appendChild(connexionLink);

    const deconnexionItem = document.createElement("li");
    deconnexionItem.ariaLabel = "Page de déconnexion";
    deconnexionItem.classList = "nav-item";
    endList.appendChild(deconnexionItem);

    const deconnexionLink = document.createElement("a");
    deconnexionLink.classList = "nav-link active";
    deconnexionLink.href = (getCurrentPage().split("/").length === 2 ? '.' : '..') + "/deconnexion.html";
    deconnexionLink.innerHTML = "<div" +
        " class=\"material-symbols-outlined\">logout</div><div>Déconnexion</div>";
    deconnexionItem.appendChild(deconnexionLink);
}

function genFooter(root) {
    const footer = document.createElement("footer");
    footer.classList = "footer";
    root.appendChild(footer);

    const containerFluid = document.createElement("div");
    containerFluid.classList = "container-fluid";
    footer.appendChild(containerFluid);

    const row = document.createElement("div");
    row.classList = "row";
    containerFluid.appendChild(row);

    const container1 = document.createElement("div");
    container1.classList = "col-4";
    container1.innerHTML = "Done with <a href='https://getbootstrap.com'>Bootstrap</a>";
    row.appendChild(container1);

    const container2 = document.createElement("div");
    container2.classList = "col-4";
    let link = (getCurrentPage().split("/").length === 2 ? '.' : '..') + "/contact.html";
    container2.innerHTML = "<a href='" + link + "'>Nous contacter</a>";
    row.appendChild(container2);

    const container3 = document.createElement("div");
    container3.classList = "col-4";
    link = (getCurrentPage().split("/").length === 2 ? '.' : '..') + "/sitemap.xml";
    container3.innerHTML = "<a href='" + link + "'>Plan du site</a>";
    row.appendChild(container3);
}

function genUtilisateurForm(root) {
    const form = document.createElement("form");
    form.action = "#";
    form.method = "post";
    form.addEventListener("submit", function (e) {
        e.preventDefault();

        let formData = new FormData(form);

        document.querySelectorAll("form input, form textarea").forEach((champ) => {
            let nomChamp = champ.id.replace("Input", "").replace("Textarea", "");
            let valeur = (champ.type === "checkbox") ? champ.checked : champ.value;
            formData.append(nomChamp, valeur);
        });

        formData.forEach((value, key) => {
            console.info(key + " : " + value);
        });
    });
    root.appendChild(form);

    const fieldset = document.createElement("fieldset");
    fieldset.classList = "row modal-dialog-centered";
    form.appendChild(fieldset);

    if (getCurrentPage() === "Front/contact.html") {
        const prenomGroup = document.createElement("div");
        prenomGroup.classList = "form-group col-md-6";
        prenomGroup.innerHTML = "<label for='prenomInput'>Prénom</label>";
        fieldset.appendChild(prenomGroup);

        const prenomInput = document.createElement("input");
        prenomInput.classList = "form-control";
        prenomInput.id = "prenomInput";
        prenomInput.type = "text";
        prenomInput.pattern = "^[A-Za-zÀ-ÿ' \\-]+$";
        prenomInput.placeholder = "Prénom";
        prenomInput.required = "required";
        prenomInput.size = "30";
        prenomGroup.appendChild(prenomInput);

        const nomGroup = document.createElement("div");
        nomGroup.classList = "form-group col-md-6";
        nomGroup.innerHTML = "<label for='nomInput'>Nom</label>";
        fieldset.appendChild(nomGroup);

        const nomInput = document.createElement("input");
        nomInput.classList = "form-control";
        nomInput.id = "nomInput";
        nomInput.type = "text";
        nomInput.pattern = "^[A-Za-zÀ-ÿ' \\-]+$";
        nomInput.placeholder = "Nom";
        nomInput.required = "required";
        nomInput.size = "30";
        nomGroup.appendChild(nomInput);

        const mailGroup = document.createElement("div");
        mailGroup.classList = "form-group col-md-6";
        mailGroup.innerHTML = "<label for='adresseMailInput'>Adresse Mail</label>";
        fieldset.appendChild(mailGroup);

        const adresseMailInput = document.createElement("input");
        adresseMailInput.classList = "form-control";
        adresseMailInput.id = "adresseMailInput";
        adresseMailInput.type = "text";
        adresseMailInput.pattern = "^[A-Za-z0-9._%+\\-]+@[A-Za-z0-9]+.[A-Za-z0-9.\\-]{2,}";
        adresseMailInput.placeholder = "Adresse mail";
        adresseMailInput.required = "required";
        adresseMailInput.size = "30";
        mailGroup.appendChild(adresseMailInput);

        const commentairesGroup = document.createElement("div");
        commentairesGroup.classList = "form-group col-md-12";
        commentairesGroup.innerHTML = "<label" +
            " for='commentairesTextarea'>Commentaires / Message</label>";
        fieldset.appendChild(commentairesGroup);

        const commentairesTextarea = document.createElement("textarea");
        commentairesTextarea.classList = "form-control";
        commentairesTextarea.id = "commentairesTextarea";
        commentairesTextarea.placeholder = "Le contenu de votre message";
        commentairesTextarea.required = "required";
        commentairesTextarea.rows = 10;
        commentairesGroup.appendChild(commentairesTextarea);
    } else if (getCurrentPage() === "Front/connexion.html") {
        const mailGroup = document.createElement("div");
        mailGroup.classList = "form-group col-md-6";
        mailGroup.innerHTML = "<label for='adresseMailInput'>Adresse Mail</label>";
        fieldset.appendChild(mailGroup);

        const adresseMailInput = document.createElement("input");
        adresseMailInput.classList = "form-control";
        adresseMailInput.id = "adresseMailInput";
        adresseMailInput.type = "text";
        adresseMailInput.pattern = "^[A-Za-z0-9._%+\\-]+@[A-Za-z0-9]+.[A-Za-z0-9.\\-]{2,}";
        adresseMailInput.placeholder = "Adresse mail";
        adresseMailInput.required = "required";
        adresseMailInput.size = "30";
        mailGroup.appendChild(adresseMailInput);

        const passwordGroup = document.createElement("div");
        passwordGroup.classList = "form-group col-md-6";
        passwordGroup.innerHTML = "<label for='adresseMailInput'>Mot de" +
            " passe</label>";
        fieldset.appendChild(passwordGroup);

        const passwordInput = document.createElement("input");
        passwordInput.classList = "form-control";
        passwordInput.id = "passwordInput";
        passwordInput.type = "password";
        passwordInput.placeholder = "Mot de passe";
        passwordInput.required = "required";
        passwordInput.size = "30";
        passwordGroup.appendChild(passwordInput);
    } else if (getCurrentPage() === "Front/deconnexion.html") {
        const ouiGroup = document.createElement("div");
        ouiGroup.classList = "form-group col-md-6 d-flex justify-content-center";
        ouiGroup.innerHTML = "<input type=\"submit\" class=\"btn btn-success" +
            " float-end\" name='answer' value='Oui'>";
        fieldset.appendChild(ouiGroup);

        const nonGroup = document.createElement("div");
        nonGroup.classList = "form-group col-md-6 d-flex justify-content-center";
        nonGroup.innerHTML = "<input type=\"submit\" class=\"btn btn-danger" +
            " float-end\" name='answer' value='Non'>";
        fieldset.appendChild(nonGroup);
    }

    if (getCurrentPage() !== "Front/deconnexion.html") {
        const hr = document.createElement("hr");
        fieldset.appendChild(hr);

        const envoyerGroup = document.createElement("div");
        envoyerGroup.classList = "form-group col-md-12";
        envoyerGroup.innerHTML = "<button class=\"btn btn-primary float-end\">Envoyer</button>";
        fieldset.appendChild(envoyerGroup);
    }
}

function genHoverTable(root, headerData, bodyData) {
    const hovertable = document.createElement("div");
    hovertable.classList = "hovertable";
    root.appendChild(hovertable);

    const hovertableHead = document.createElement("div");
    hovertableHead.classList = "hovertable-head";
    hovertable.appendChild(hovertableHead);

    const hovertableHeaders = document.createElement("div");
    hovertableHeaders.classList = "hovertable-row";
    hovertableHead.appendChild(hovertableHeaders);

    const hovertableSearchers = document.createElement("div");
    hovertableSearchers.classList = "hovertable-row";
    hovertableHead.appendChild(hovertableSearchers);

    headerData.forEach(header => {
        hovertableHeaders.innerHTML += "<div" +
            " class=\"hovertable-cell " + header.class + "\">" + header.libelle + "</div>";

        let searchField;

        if (header.type === null) {
            searchField = null;
        } else if (header.type === "boolean") {
            searchField = document.createElement("select");
            searchField.innerHTML = "<option default></option>" +
                "<option>Oui</option>" +
                "<option>Non</option>";
        } else {
            searchField = document.createElement("input");
            searchField.type = header.type;
            searchField.placeholder = "...";

            if (header.type === "date") {
                searchField.type = "text";
                searchField.placeholder = "jj/mm/aaaa";
            } else if (header.type === "number") {
                searchField.step = header.step ?? 1;
                searchField.min = header.min ?? 1;
            }
        }

        const cell = document.createElement("div");
        cell.classList = "hovertable-cell" + (header.class !== "" ? " " + header.class : "");
        if (searchField !== null) cell.appendChild(searchField)

        hovertableSearchers.appendChild(cell);
    });

    const hovertableBody = document.createElement("div");
    hovertableBody.classList = "hovertable-body";
    hovertable.appendChild(hovertableBody);

    bodyData.forEach(row => {
        const hoverRow = document.createElement("div");
        hoverRow.classList = "hovertable-row";

        row.forEach((cell, idx) => {
            hoverRow.innerHTML += "<div class=\"hovertable-cell " + headerData[idx].class + "\">" + cell.value + "</div>";
        });

        hovertableBody.appendChild(hoverRow);
    });
}

function genSocieteForm(root, typeSociete) {
    const form = document.createElement("form");
    form.action = "#";
    form.method = "post";
    form.addEventListener("submit", function (e) {
        e.preventDefault();

        if (getCurrentPage().split("/")[2] === "delete.html") {
            if (confirm("Confirmer la suppression ?")) {
                console.info("Suppression de " + document.querySelector("input[id='raisonSocialeInput']").value);
                return true;
            }
            return false;
        } else {
            let formData = new FormData(form);

            document.querySelectorAll("form input, form textarea").forEach((champ) => {
                let nomChamp = champ.id.replace("Input", "").replace("Textarea", "");
                let valeur = (champ.type === "checkbox") ? champ.checked : champ.value;
                formData.append(nomChamp, valeur);
            });

            formData.forEach((value, key) => {
                console.info(key + " : " + value);
            });
        }
    });
    root.appendChild(form);

    const fieldset = document.createElement("fieldset");
    fieldset.classList = "row modal-dialog-centered";
    form.appendChild(fieldset);

    const idInput = document.createElement("input");
    idInput.type = "hidden";
    idInput.value = 1;
    idInput.id = "identifiantInput";
    fieldset.appendChild(idInput);

    // *** Partie société
    const societeLegend = document.createElement("legend");
    societeLegend.innerText = "Partie société";
    societeLegend.classList = "border-bottom mb-4";
    fieldset.appendChild(societeLegend);

    const raisonSocialeGroup = document.createElement("div");
    raisonSocialeGroup.classList = "form-group col-md-6"
    raisonSocialeGroup.innerHTML = "<label for=\"raisonSocialeInput\">Raison Sociale</label>";
    fieldset.appendChild(raisonSocialeGroup);

    const raisonSocialeInput = document.createElement("input");
    raisonSocialeInput.classList = "form-control";
    raisonSocialeInput.disabled = (["view.html", "delete.html"].includes(getCurrentPage().split("/")[2]));
    raisonSocialeInput.id = "raisonSocialeInput";
    raisonSocialeInput.pattern = "^[A-Za-zÀ-ÿ' \\-]+$";
    raisonSocialeInput.placeholder = "Raison Sociale";
    raisonSocialeInput.required = "required";
    raisonSocialeInput.size = "30";
    raisonSocialeInput.type = "text";
    raisonSocialeInput.value = (typeSociete === "clients") ? "Falcom" : "Skeb";
    raisonSocialeGroup.appendChild(raisonSocialeInput);

    const telephoneGroup = document.createElement("div");
    telephoneGroup.classList = "form-group col-md-6"
    telephoneGroup.innerHTML = "<label for=\"telephoneInput\">Téléphone</label>";
    fieldset.appendChild(telephoneGroup);

    const telephoneInput = document.createElement("input");
    telephoneInput.classList = "form-control";
    telephoneInput.disabled = (["view.html", "delete.html"].includes(getCurrentPage().split("/")[2]));
    telephoneInput.id = "telephoneInput";
    telephoneInput.pattern = "^(?:\\+33|0033|0)[1-9](?:[ .\\-]?\\d{2}){4}$";
    telephoneInput.placeholder = "Téléphone";
    telephoneInput.required = "";
    telephoneInput.size = "12";
    telephoneInput.type = "text";
    telephoneInput.value = (typeSociete === "clients") ? "0387543400" : "0388553370";
    telephoneGroup.appendChild(telephoneInput);

    const adresseMailGroup = document.createElement("div");
    adresseMailGroup.classList = "form-group col-md-6"
    adresseMailGroup.innerHTML = "<label for=\"adresseMailInput\">Adresse Mail</label>";
    fieldset.appendChild(adresseMailGroup);

    const adresseMailInput = document.createElement("input");
    adresseMailInput.classList = "form-control";
    adresseMailInput.disabled = (["view.html", "delete.html"].includes(getCurrentPage().split("/")[2]));
    adresseMailInput.id = "adresseMailInput";
    adresseMailInput.pattern = "^[a-zA-Z0-9._%+\\-]+@[a-zA-Z0-9.\\-]+\\.[a-zA-Z]{2,}$";
    adresseMailInput.placeholder = "Adresse Mail";
    adresseMailInput.required = "";
    adresseMailInput.size = "30";
    adresseMailInput.type = "text";
    adresseMailInput.value = (typeSociete === "clients") ? "contact@falcom.com" : "contact@skeb.com";
    adresseMailGroup.appendChild(adresseMailInput);

    const commentairesGroup = document.createElement("div");
    commentairesGroup.classList = "form-group col-md-12"
    commentairesGroup.innerHTML = "<label for=\"commentairesTextarea\">Commentaires</label>";
    fieldset.appendChild(commentairesGroup);

    const commentairesTextarea = document.createElement("textarea");
    commentairesTextarea.classList = "form-control";
    commentairesTextarea.disabled = (["view.html", "delete.html"].includes(getCurrentPage().split("/")[2]));
    commentairesTextarea.id = "commentairesTextarea";
    commentairesTextarea.placeholder = "Commentaires sur le " + typeSociete.substring(0, typeSociete.length - 1);
    commentairesTextarea.rows = "5";
    commentairesTextarea.value = (typeSociete === "clients") ? "La drogue avec Trails" : "";
    commentairesGroup.appendChild(commentairesTextarea);

    // *** Partie adresse, géolocalisation + météo
    const adresseLegend = document.createElement("legend");
    adresseLegend.innerText = "Partie adresse - ";
    adresseLegend.innerHTML += "<div id=\"labelAdresseMeteo\"></div> " +
        "<div class=\"btn btn-primary\" data-bs-target=\"#modal\" data-bs-toggle=\"modal\">Voir détails</div>";
    adresseLegend.classList = "border-bottom mb-4 d-flex";
    fieldset.appendChild(adresseLegend);

    // fieldset.innerHTML += "<div id=\"map\"></div>";
    const mapDiv = document.createElement("div");
    mapDiv.id = "map";
    fieldset.appendChild(mapDiv);

    const numeroRueGroup = document.createElement("div");
    numeroRueGroup.classList = "form-group col-md-3"
    numeroRueGroup.innerHTML = "<label for=\"numeroRueInput\">Numéro rue</label>";
    fieldset.appendChild(numeroRueGroup);

    const numeroRueInput = document.createElement("input");
    numeroRueInput.classList = "form-control";
    numeroRueInput.disabled = (["view.html", "delete.html"].includes(getCurrentPage().split("/")[2]));
    numeroRueInput.id = "numeroRueInput";
    numeroRueInput.pattern = "(?:\\d{0,3} +(bis|ter|quat)|(?:^|\\b))|(?:\\b\\d{0,3}[ab]*\\b)";
    numeroRueInput.placeholder = "Numero Rue";
    numeroRueInput.required = "";
    numeroRueInput.size = "15";
    numeroRueInput.type = "text";
    numeroRueInput.value = (typeSociete === "clients") ? "2 bis" : "28";
    numeroRueGroup.appendChild(numeroRueInput);


    const nomRueGroup = document.createElement("div");
    nomRueGroup.classList = "form-group col-md-9"
    nomRueGroup.innerHTML = "<label for=\"nomRueInput\">Nom rue</label>";
    fieldset.appendChild(nomRueGroup);

    const nomRueInput = document.createElement("input");
    nomRueInput.classList = "form-control";
    nomRueInput.disabled = (["view.html", "delete.html"].includes(getCurrentPage().split("/")[2]));
    nomRueInput.id = "nomRueInput";
    nomRueInput.pattern = "\\b([a-zA-Z0-9]+(?:[.\\- ']*[a-zA-Z0-9]+)*)\\b";
    nomRueInput.placeholder = "Nom Rue";
    nomRueInput.required = "";
    nomRueInput.size = "30";
    nomRueInput.type = "text";
    nomRueInput.value = (typeSociete === "clients") ? "rue Ardant du Picq" : "Boulevard Albert 1er";
    nomRueGroup.appendChild(nomRueInput);

    const codePostalGroup = document.createElement("div");
    codePostalGroup.classList = "form-group col-md-2"
    codePostalGroup.innerHTML = "<label for=\"codePostalInput\">Code Postal</label>";
    fieldset.appendChild(codePostalGroup);

    const codePostalInput = document.createElement("input");
    codePostalInput.classList = "form-control";
    codePostalInput.disabled = (["view.html", "delete.html"].includes(getCurrentPage().split("/")[2]));
    codePostalInput.id = "codePostalInput";
    codePostalInput.pattern = "\\b\\d{5}\\b";
    codePostalInput.placeholder = "Code Postal";
    codePostalInput.required = "";
    codePostalInput.size = "5";
    codePostalInput.type = "text";
    codePostalInput.value = (typeSociete === "clients") ? "57004" : "54000";
    codePostalGroup.appendChild(codePostalInput);

    const villeGroup = document.createElement("div");
    villeGroup.classList = "form-group col-md-10";
    villeGroup.innerHTML = "<label for=\"villeInput\">Ville</label>";
    fieldset.appendChild(villeGroup);

    const villeInput = document.createElement("input");
    villeInput.classList = "form-control";
    villeInput.disabled = (["view.html", "delete.html"].includes(getCurrentPage().split("/")[2]));
    villeInput.id = "villeInput";
    villeInput.pattern = "\\b([a-zA-Z]+(?:[.\\- ']*[a-zA-Z]+)*)\\b";
    villeInput.placeholder = "Ville";
    villeInput.required = "";
    villeInput.size = "30";
    villeInput.type = "text";
    villeInput.value = (typeSociete === "clients") ? "Metz" : "Nancy";
    villeGroup.appendChild(villeInput);

    // *** Partie client/prospect
    const childLegend = document.createElement("legend");
    childLegend.innerText = "Partie " + typeSociete.substring(0, typeSociete.length - 1);
    childLegend.classList = "border-bottom mb-4";
    fieldset.appendChild(childLegend);

    if (typeSociete === "clients") {
        const CaGroup = document.createElement("div");
        CaGroup.classList = "form-group col-md-6";
        CaGroup.innerHTML = "<label for=\"chiffreAffairesInput\">Chiffre Affaires</label>";
        fieldset.appendChild(CaGroup);

        const chiffreAffairesInput = document.createElement("input");
        chiffreAffairesInput.classList = "form-control";
        chiffreAffairesInput.disabled = (["view.html", "delete.html"].includes(getCurrentPage().split("/")[2]));
        chiffreAffairesInput.id = "chiffreAffairesInput";
        chiffreAffairesInput.placeholder = "Chiffre Affaires";
        chiffreAffairesInput.required = "";
        chiffreAffairesInput.step = "0.01";
        chiffreAffairesInput.type = "number";
        chiffreAffairesInput.value = "999999.99";
        CaGroup.appendChild(chiffreAffairesInput);

        const nbEmployesGroup = document.createElement("div");
        nbEmployesGroup.classList = "form-group col-md-6";
        nbEmployesGroup.innerHTML = "<label for=\"nbEmployesInput\">Nb Employes</label>";
        fieldset.appendChild(nbEmployesGroup);

        const nbEmployesInput = document.createElement("input");
        nbEmployesInput.classList = "form-control";
        nbEmployesInput.disabled = (["view.html", "delete.html"].includes(getCurrentPage().split("/")[2]));
        nbEmployesInput.id = "nbEmployesInput";
        nbEmployesInput.placeholder = "Nb Employes";
        nbEmployesInput.required = "";
        nbEmployesInput.step = "1";
        nbEmployesInput.type = "number";
        nbEmployesInput.value = "80";
        nbEmployesGroup.appendChild(nbEmployesInput);
    } else {
        const dateProspectionGroup = document.createElement("div");
        dateProspectionGroup.classList = "form-group col-md-6";
        dateProspectionGroup.innerHTML = "<label for=\"dateProspectionInput\">Date Prospection</label>";
        fieldset.appendChild(dateProspectionGroup);

        const dateProspectionInput = document.createElement("input");
        dateProspectionInput.classList = "form-control";
        dateProspectionInput.disabled = (["view.html", "delete.html"].includes(getCurrentPage().split("/")[2]));
        dateProspectionInput.id = "dateProspectionInput";
        dateProspectionInput.placeholder = "Date Prospection";
        dateProspectionInput.required = "";
        dateProspectionInput.size = "10";
        dateProspectionInput.type = "date";
        dateProspectionInput.value = "2025-10-09";
        dateProspectionGroup.appendChild(dateProspectionInput);

        const prospectInteresseInput = document.createElement("input");
        prospectInteresseInput.classList = "form-control";
        prospectInteresseInput.disabled = (["view.html", "delete.html"].includes(getCurrentPage().split("/")[2]));
        prospectInteresseInput.id = "prospectInteresseInput";
        prospectInteresseInput.type = "checkbox";

        const checkboxCustom = document.createElement("div");
        checkboxCustom.classList = "checkbox-custom";
        checkboxCustom.appendChild(prospectInteresseInput);
        checkboxCustom.innerHTML += "<label for=\"prospectInteresseInput\"></label>";


        const prospectInteresseGroup = document.createElement("div");
        prospectInteresseGroup.classList = "form-group col-md-6";
        prospectInteresseGroup.innerHTML += "<label for=\"prospectInteresseInput\">Prospect Interesse</label>";
        prospectInteresseGroup.appendChild(checkboxCustom);
        fieldset.appendChild(prospectInteresseGroup);
    }

    const hr = document.createElement("hr");
    hr.classList = "mt-4";
    fieldset.appendChild(hr);

    if (getCurrentPage().split("/")[2] !== "view.html") {
        document.querySelector("legend.d-flex").innerText = "Partie adresse";

        const submit = document.createElement("div");
        submit.classList = "form-group col-md-12";
        submit.innerHTML = "<button class=\"btn btn-primary float-end\">" + (getCurrentPage().split("/")[2] !== "delete.html" ? "Sauvegarder" : "Supprimer") + "</button>";
        fieldset.appendChild(submit);
    } else {
        const modal = document.createElement("div");
        modal.ariaHidden = "true";
        modal.ariaLabelledby = "exampleModalToggleLabel";
        modal.classList = "modal fade";
        modal.id = "modal";
        modal.tabIndex = "-1";
        root.appendChild(modal);

        const modalDialog = document.createElement("div");
        modalDialog.classList = "modal-dialog";
        modal.appendChild(modalDialog);

        const modalContent = document.createElement("div");
        modalContent.classList = "modal-content";
        modalDialog.appendChild(modalContent);

        const modalHeader = document.createElement("div");
        modalHeader.classList = "modal-header";
        modalHeader.innerHTML = "<h1 class=\"modal-title fs-5\" id=\"modalMeteo\"></h1>";
        modalHeader.innerHTML += "<button aria-label=\"Close\" class=\"btn-close\" data-bs-dismiss=\"modal\" type=\"button\"></button>";
        modalContent.appendChild(modalHeader);

        const modalBody = document.createElement("div");
        modalBody.classList = "modal-body";
        modalBody.innerHTML = "<div><h5>Température</h5><div id=\"resultT\"></div></div>";
        modalBody.innerHTML += "<div><h5>Pluie</h5><div id=\"resultP\"></div></div>";
        modalBody.innerHTML += "<div><h5>Vent</h5><div id=\"resultV\"></div></div>";
        modalBody.innerHTML += "<div><h5>Nébulosité</h5><div id=\"resultN\"></div></div>";
        modalBody.innerHTML += "<div><h5>Humidité</h5><div id=\"resultH\"></div></div>";
        modalContent.appendChild(modalBody);

        const modalFooter = document.createElement("div");
        modalFooter.classList = "modal-footer";
        modalFooter.innerHTML = "<button class=\"btn btn-secondary\" data-bs-dismiss=\"modal\" type=\"button\">Close</button>";
        modalContent.appendChild(modalFooter);
    }

    if (getCurrentPage().split("/")[2] === "create.html") {
        Array.from(document.querySelectorAll("input")).forEach((input) => {
            input.value = null;
        });
        Array.from(document.querySelectorAll("textarea")).forEach((input) => {
            input.value = null;
        });
    }
}