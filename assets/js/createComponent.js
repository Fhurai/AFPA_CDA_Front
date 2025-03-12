/**
 * Function to generate a hover table
 * @param {HTMLElement} root - The root element to append the table to.
 * @param {Array} headerData - Array of header data objects.
 * @param {Array} bodyData - Array of body data objects.
 */
function genHoverTable(root, headerData, bodyData) {
    const hovertable = createDivWithClass("hovertable");
    root.appendChild(hovertable);

    const hovertableHead = createDivWithClass("hovertable-head");
    hovertable.appendChild(hovertableHead);

    const hovertableHeaders = createDivWithClass("hovertable-row");
    hovertableHead.appendChild(hovertableHeaders);

    const hovertableSearchers = createDivWithClass("hovertable-row");
    hovertableHead.appendChild(hovertableSearchers);

    headerData.forEach(header => {
        hovertableHeaders.innerHTML += `<div class="hovertable-cell ${header.class}">${header.libelle}</div>`;
        const searchField = createSearchField(header);
        const cell = createDivWithClass(`hovertable-cell ${header.class}`);
        if (searchField) cell.appendChild(searchField);
        hovertableSearchers.appendChild(cell);
    });

    const hovertableBody = createDivWithClass("hovertable-body");
    hovertable.appendChild(hovertableBody);

    bodyData.forEach(row => {
        const hoverRow = createDivWithClass("hovertable-row");
        row.forEach((cell, idx) => {
            hoverRow.innerHTML += `<div class="hovertable-cell ${headerData[idx].class}">${cell.value}</div>`;
        });
        hovertableBody.appendChild(hoverRow);
    });
}

/**
 * Function to create a div with a specific class
 * @param {string} className - The class name to assign to the div.
 * @returns {HTMLDivElement} - The created div element.
 */
function createDivWithClass(className) {
    const div = document.createElement("div");
    div.classList = className;
    return div;
}

/**
 * Function to create a search field based on header type
 * @param {Object} header - The header object containing type information.
 * @returns {HTMLElement|null} - The created search field element or null.
 */
function createSearchField(header) {
    let searchField = null;
    if (header.type === "boolean") {
        searchField = document.createElement("select");
        searchField.innerHTML = "<option default></option><option>Oui</option><option>Non</option>";
    } else if (header.type) {
        searchField = document.createElement("input");
        searchField.type = header.type === "date" ? "text" : header.type;
        searchField.placeholder = header.type === "date" ? "jj/mm/aaaa" : "...";
        if (header.type === "number") {
            searchField.step = header.step ?? 1;
            searchField.min = header.min ?? 1;
        }
    }
    return searchField;
}

/**
 * Function to generate a user form
 * @param {HTMLElement} root - The root element to append the form to.
 */
function genUtilisateurForm(root) {
    const form = createForm();
    root.appendChild(form);

    const fieldset = createFieldset();
    form.appendChild(fieldset);

    if (getCurrentPage() === "Front/contact.html") {
        createContactFormFields(fieldset);
    } else if (getCurrentPage() === "Front/connexion.html") {
        createConnexionFormFields(fieldset);
    } else if (getCurrentPage() === "Front/deconnexion.html") {
        createDeconnexionFormFields(fieldset);
    }

    if (getCurrentPage() !== "Front/deconnexion.html") {
        addSubmitButton(fieldset, "Envoyer");
    }
}

/**
 * Function to create a form element
 * @returns {HTMLFormElement} - The created form element.
 */
function createForm() {
    const form = document.createElement("form");
    form.action = "#";
    form.method = "post";
    form.addEventListener("submit", handleFormSubmit);
    return form;
}

/**
 * Function to handle form submission
 * @param {Event} e - The submit event.
 */
function handleFormSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    document.querySelectorAll("form input, form textarea").forEach(champ => {
        const nomChamp = champ.id.replace("Input", "").replace("Textarea", "");
        const valeur = champ.type === "checkbox" ? champ.checked : champ.value;
        formData.append(nomChamp, valeur);
    });
    formData.forEach((value, key) => {
        console.info(`${key} : ${value}`);
    });
}

/**
 * Function to create a fieldset element
 * @returns {HTMLFieldSetElement} - The created fieldset element.
 */
function createFieldset() {
    const fieldset = document.createElement("fieldset");
    fieldset.classList = "row modal-dialog-centered";
    return fieldset;
}

/**
 * Function to create contact form fields
 * @param {HTMLFieldSetElement} fieldset - The fieldset element to append the fields to.
 */
function createContactFormFields(fieldset) {
    createInputGroup(fieldset, "Prénom", "prenomInput", "text", "^[A-Za-zÀ-ÿ' \\-]+$", "Prénom", true, 30);
    createInputGroup(fieldset, "Nom", "nomInput", "text", "^[A-Za-zÀ-ÿ' \\-]+$", "Nom", true, 30);
    createInputGroup(fieldset, "Adresse Mail", "adresseMailInput", "text", "^[A-Za-z0-9._%+\\-]+@[A-Za-z0-9]+.[A-Za-z0-9.\\-]{2,}", "Adresse mail", true, 30);
    createTextareaGroup(fieldset, "Commentaires / Message", "commentairesTextarea", "Le contenu de votre message", true, 10);
}

/**
 * Function to create connexion form fields
 * @param {HTMLFieldSetElement} fieldset - The fieldset element to append the fields to.
 */
function createConnexionFormFields(fieldset) {
    createInputGroup(fieldset, "Adresse Mail", "adresseMailInput", "text", "^[A-Za-z0-9._%+\\-]+@[A-Za-z0-9]+.[A-Za-z0-9.\\-]{2,}", "Adresse mail", true, 30);
    createInputGroup(fieldset, "Mot de passe", "passwordInput", "password", "", "Mot de passe", true, 30);
}

/**
 * Function to create deconnexion form fields
 * @param {HTMLFieldSetElement} fieldset - The fieldset element to append the fields to.
 */
function createDeconnexionFormFields(fieldset) {
    createButtonGroup(fieldset, "Oui", "btn btn-success float-end");
    createButtonGroup(fieldset, "Non", "btn btn-danger float-end");
}

/**
 * Function to create an input group
 * @param {HTMLFieldSetElement} fieldset - The fieldset element to append the input group to.
 * @param {string} label - The label text for the input.
 * @param {string} id - The id for the input element.
 * @param {string} type - The type of the input element.
 * @param {string} pattern - The pattern for the input element.
 * @param {string} placeholder - The placeholder text for the input element.
 * @param {boolean} required - Whether the input is required.
 * @param {number} size - The size of the input element.
 * @param {boolean} [disabled=false] - Whether the input is disabled.
 * @param {string} [value=""] - The value of the input element.
 */
function createInputGroup(fieldset, label, id, type, pattern, placeholder, required, size, disabled = false, value = "") {
    const group = document.createElement("div");
    group.classList = `form-group col-md-${type === "textarea" ? "12" : "6"}`;
    group.innerHTML = `<label for='${id}'>${label}</label>`;
    fieldset.appendChild(group);

    const input = document.createElement(type === "textarea" ? "textarea" : "input");
    input.classList = "form-control";
    input.id = id;
    input.type = type;
    input.pattern = pattern;
    input.placeholder = placeholder;
    input.required = required ? "required" : "";
    input.size = size;
    input.disabled = disabled;
    input.value = value;
    group.appendChild(input);
}

/**
 * Function to create a textarea group
 * @param {HTMLFieldSetElement} fieldset - The fieldset element to append the textarea group to.
 * @param {string} label - The label text for the textarea.
 * @param {string} id - The id for the textarea element.
 * @param {string} placeholder - The placeholder text for the textarea element.
 * @param {boolean} required - Whether the textarea is required.
 * @param {number} rows - The number of rows for the textarea element.
 * @param {boolean} [disabled=false] - Whether the textarea is disabled.
 * @param {string} [value=""] - The value of the textarea element.
 */
function createTextareaGroup(fieldset, label, id, placeholder, required, rows, disabled = false, value = "") {
    const group = document.createElement("div");
    group.classList = "form-group col-md-12";
    group.innerHTML = `<label for='${id}'>${label}</label>`;
    fieldset.appendChild(group);

    const textarea = document.createElement("textarea");
    textarea.classList = "form-control";
    textarea.id = id;
    textarea.placeholder = placeholder;
    textarea.required = required ? "required" : "";
    textarea.rows = rows;
    textarea.disabled = disabled;
    textarea.value = value;
    group.appendChild(textarea);
}

/**
 * Function to create a button group
 * @param {HTMLFieldSetElement} fieldset - The fieldset element to append the button group to.
 * @param {string} value - The value for the button.
 * @param {string} className - The class name for the button.
 */
function createButtonGroup(fieldset, value, className) {
    const group = document.createElement("div");
    group.classList = "form-group col-md-6 d-flex justify-content-center";
    group.innerHTML = `<input type="submit" class="${className}" name='answer' value='${value}'>`;
    fieldset.appendChild(group);
}

/**
 * Function to add a submit button
 * @param {HTMLFieldSetElement} fieldset - The fieldset element to append the submit button to.
 * @param {string} buttonText - The text for the submit button.
 */
function addSubmitButton(fieldset, buttonText) {
    const hr = document.createElement("hr");
    fieldset.appendChild(hr);

    const envoyerGroup = document.createElement("div");
    envoyerGroup.classList = "form-group col-md-12";
    envoyerGroup.innerHTML = `<button class="btn btn-primary float-end">${buttonText}</button>`;
    fieldset.appendChild(envoyerGroup);
}

/**
 * Function to generate a company form
 * @param {HTMLElement} root - The root element to append the form to.
 * @param {string} typeSociete - The type of the company (clients or prospects).
 */
function genSocieteForm(root, typeSociete) {
    const disabled = ["view.html", "delete.html"].includes(getCurrentPage().split("/")[2]);

    const form = createForm();
    root.appendChild(form);

    const fieldset = createFieldset();
    form.appendChild(fieldset);

    const idInput = createHiddenInput("identifiantInput", 1);
    fieldset.appendChild(idInput);

    createSocieteFields(fieldset, typeSociete, disabled);
    createAdresseFields(fieldset, typeSociete, disabled);
    createClientProspectFields(fieldset, typeSociete, disabled);

    const hr = document.createElement("hr");
    hr.classList = "mt-4";
    fieldset.appendChild(hr);

    if (getCurrentPage().split("/")[2] !== "view.html") {
        document.querySelector("legend.d-flex").innerText = "Partie adresse";
        const submit = createSubmitButton();
        fieldset.appendChild(submit);
    } else {
        createModal(root);
    }

    if (getCurrentPage().split("/")[2] === "create.html") {
        clearFormInputs();
    }
}

/**
 * Function to create a hidden input
 * @param {string} id - The id for the hidden input element.
 * @param {string} value - The value for the hidden input element.
 * @returns {HTMLInputElement} - The created hidden input element.
 */
function createHiddenInput(id, value) {
    const input = document.createElement("input");
    input.type = "hidden";
    input.value = value;
    input.id = id;
    return input;
}

/**
 * Function to create company fields
 * @param {HTMLFieldSetElement} fieldset - The fieldset element to append the company fields to.
 * @param {string} typeSociete - The type of the company (clients or prospects).
 * @param {boolean} [disabled=false] - Whether the fields are disabled.
 */
function createSocieteFields(fieldset, typeSociete, disabled = false) {
    const societeLegend = createLegend("Partie société");
    fieldset.appendChild(societeLegend);

    createInputGroup(fieldset, "Raison Sociale", "raisonSocialeInput", "text", "^[A-Za-zÀ-ÿ' \\-]+$", "Raison Sociale", true, 30, disabled, (typeSociete === "clients") ? "Falcom" : "Skeb");
    createInputGroup(fieldset, "Téléphone", "telephoneInput", "text", "^(?:\\+33|0033|0)[1-9](?:[ .\\-]?\\d{2}){4}$", "Téléphone", false, 12, disabled, (typeSociete === "clients") ? "0387543400" : "0388553370");
    createInputGroup(fieldset, "Adresse Mail", "adresseMailInput", "text", "^[a-zA-Z0-9._%+\\-]+@[a-zA-Z0-9.\\-]+\\.[a-zA-Z]{2,}$", "Adresse Mail", false, 30, disabled, (typeSociete === "clients") ? "contact@falcom.com" : "contact@skeb.com");
    createTextareaGroup(fieldset, "Commentaires", "commentairesTextarea", `Commentaires sur le ${typeSociete.substring(0, typeSociete.length - 1)}`, false, 5, disabled, (typeSociete === "clients") ? "La drogue avec Trails" : "Les commissions, c'est mal, m'voyez ?");
}

/**
 * Function to create address fields
 * @param {HTMLFieldSetElement} fieldset - The fieldset element to append the address fields to.
 * @param {string} typeSociete - The type of the company (clients or prospects).
 * @param {boolean} [disabled=false] - Whether the fields are disabled.
 */
function createAdresseFields(fieldset, typeSociete, disabled = false) {
    const adresseLegend = createLegend("Partie adresse - ");
    adresseLegend.innerHTML += `<div id="labelAdresseMeteo"></div> <div class="btn btn-primary" data-bs-target="#modal" data-bs-toggle="modal">Voir détails</div>`;
    adresseLegend.classList.add("d-flex");
    fieldset.appendChild(adresseLegend);

    const mapDiv = createDivWithClass("map");
    mapDiv.id = "map";
    fieldset.appendChild(mapDiv);

    createInputGroup(fieldset, "Numéro rue", "numeroRueInput", "text", "(?:\\d{0,3} +(bis|ter|quat)|(?:^|\\b))|(?:\\b\\d{0,3}[ab]*\\b)", "Numero Rue", false, 15, disabled, (typeSociete === "clients") ? "2 bis" : "28");
    createInputGroup(fieldset, "Nom rue", "nomRueInput", "text", "\\b([a-zA-Z0-9]+(?:[.\\- ']*[a-zA-Z0-9]+)*)\\b", "Nom Rue", false, 30, disabled, (typeSociete === "clients") ? "rue Ardant du Picq" : "Boulevard Albert 1er");
    createInputGroup(fieldset, "Code Postal", "codePostalInput", "text", "\\b\\d{5}\\b", "Code Postal", false, 5, disabled, (typeSociete === "clients") ? "57004" : "54000");
    createInputGroup(fieldset, "Ville", "villeInput", "text", "\\b([a-zA-Z]+(?:[.\\- ']*[a-zA-Z]+)*)\\b", "Ville", false, 30, disabled, (typeSociete === "clients") ? "Metz" : "Nancy");
}

/**
 * Function to create client/prospect fields
 * @param {HTMLFieldSetElement} fieldset - The fieldset element to append the client/prospect fields to.
 * @param {string} typeSociete - The type of the company (clients or prospects).
 * @param {boolean} [disabled=false] - Whether the fields are disabled.
 */
function createClientProspectFields(fieldset, typeSociete, disabled = false) {
    const childLegend = createLegend(`Partie ${typeSociete.substring(0, typeSociete.length - 1)}`);
    fieldset.appendChild(childLegend);

    if (typeSociete === "clients") {
        createInputGroup(fieldset, "Chiffre Affaires", "chiffreAffairesInput", "number", "", "Chiffre Affaires", false, 15, disabled, 999999.99);
        createInputGroup(fieldset, "Nb Employes", "nbEmployesInput", "number", "", "Nb Employes", false, 5, disabled, 80);
    } else {
        createInputGroup(fieldset, "Date Prospection", "dateProspectionInput", "date", "", "Date Prospection", false, 10, disabled, "2025-10-09");
        createCheckboxGroup(fieldset, "Prospect Interesse", "prospectInteresseInput", disabled, false);
    }
}

/**
 * Function to create a legend element
 * @param {string} text - The text for the legend element.
 * @returns {HTMLLegendElement} - The created legend element.
 */
function createLegend(text) {
    const legend = document.createElement("legend");
    legend.innerText = text;
    legend.classList = "border-bottom mb-4";
    return legend;
}

/**
 * Function to create a checkbox group
 * @param {HTMLFieldSetElement} fieldset - The fieldset element to append the checkbox group to.
 * @param {string} label - The label text for the checkbox.
 * @param {string} id - The id for the checkbox element.
 * @param {boolean} [disabled=false] - Whether the checkbox is disabled.
 * @param {boolean} [value=false] - The value of the checkbox element.
 */
function createCheckboxGroup(fieldset, label, id, disabled = false, value = false) {
    const group = document.createElement("div");
    group.classList = "form-group col-md-6";
    group.innerHTML = `<label for='${id}'>${label}</label>`;
    fieldset.appendChild(group);

    const checkboxCustom = document.createElement("div");
    checkboxCustom.classList = "checkbox-custom";

    const input = document.createElement("input");
    input.classList = "form-control";
    input.id = id;
    input.type = "checkbox";
    input.disabled = disabled;
    input.checked = value;
    checkboxCustom.appendChild(input);

    checkboxCustom.innerHTML += `<label for='${id}'></label>`;
    group.appendChild(checkboxCustom);
}

/**
 * Function to create a submit button
 * @returns {HTMLDivElement} - The created submit button element.
 */
function createSubmitButton() {
    const submit = document.createElement("div");
    submit.classList = "form-group col-md-12";
    submit.innerHTML = `<button class="btn btn-primary float-end">${getCurrentPage().split("/")[2] !== "delete.html" ? "Sauvegarder" : "Supprimer"}</button>`;
    return submit;
}

/**
 * Function to create a modal
 * @param {HTMLElement} root - The root element to append the modal to.
 */
function createModal(root) {
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
    modalHeader.innerHTML = `<h1 class="modal-title fs-5" id="modalMeteo"></h1><button aria-label="Close" class="btn-close" data-bs-dismiss="modal" type="button"></button>`;
    modalContent.appendChild(modalHeader);

    const modalBody = document.createElement("div");
    modalBody.classList = "modal-body";
    modalBody.innerHTML = `<div><h5>Température</h5><div id="resultT"></div></div><div><h5>Pluie</h5><div id="resultP"></div></div><div><h5>Vent</h5><div id="resultV"></div></div><div><h5>Nébulosité</h5><div id="resultN"></div></div><div><h5>Humidité</h5><div id="resultH"></div></div>`;
    modalContent.appendChild(modalBody);

    const modalFooter = document.createElement("div");
    modalFooter.classList = "modal-footer";
    modalFooter.innerHTML = `<button class="btn btn-secondary" data-bs-dismiss="modal" type="button">Close</button>`;
    modalContent.appendChild(modalFooter);
}

/**
 * Function to clear form inputs
 */
function clearFormInputs() {
    document.querySelectorAll("input").forEach(input => input.value = null);
    document.querySelectorAll("textarea").forEach(input => input.value = null);
}