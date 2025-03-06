function getCurrentPage() {
    const pathArray = window.location.pathname.split("/");
    let page;

    if (pathArray.length === 9) {
        page = pathArray[7] + "/" + pathArray[8];
    } else if (pathArray.length === 10) {
        page = pathArray[7] + "/" + pathArray[8] + "/" + pathArray[9];
    }
    return page;
}

function securiteChiffreAffaires() {
    return document.querySelector("form input#chiffreAffairesInput").value < 200;
}

function securiteNbEmployes() {
    return document.querySelector("form input#nbEmployesInput").value < 1;
}

function detectHovertable() {
    return document.querySelector(".hovertable") !== null;
}

function searchValueHovertable(value, column) {
    Array.from(document.querySelectorAll(".hovertable .hovertable-body .hovertable-row")).forEach((row) => {
        let searchFalse;

        if (row.getAttribute("searchFalse") !== null) {
            searchFalse = JSON.parse(row.getAttribute("searchFalse"));
        } else {
            searchFalse = [];
        }

        if (!row.children[column].innerText.includes(value) && value !== "") {
            searchFalse.push(column);
        } else {
            let index = searchFalse.indexOf(column);
            if (index > -1) {
                searchFalse.splice(index, 1);
            }
        }

        row.setAttribute("searchFalse", JSON.stringify(searchFalse));
    });
    hideRowIfMarked();
}

function hideRowIfMarked() {
    Array.from(document.querySelectorAll(".hovertable .hovertable-body .hovertable-row")).forEach((row) => {
        console.log(row.children[0].innerHTML.trim() + " : " + row.getAttribute("searchFalse"));
        let searchFalse;

        if (row.getAttribute("searchFalse") !== null) {
            searchFalse = JSON.parse(row.getAttribute("searchFalse"));
        }

        if (searchFalse.length > 0) {
            row.setAttribute("hidden", "hidden");
        } else {
            row.removeAttribute("hidden");
        }
    });
}

async function searchGeolocalisation() {
    const adresse = document.getElementById("numeroRueInput").value + " " +
        document.getElementById("nomRueInput").value + " " +
        document.getElementById("codePostalInput").value + " " +
        document.getElementById("villeInput").value;

    const response = await fetch("https://api-adresse.data.gouv.fr/search/?q=" + adresse.replaceAll(" ", "+"));

    if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();

    return [json.features[0].geometry.coordinates[1], json.features[0].geometry.coordinates[0]];
}

function createLeafletMap(array) {
    const adresse = document.getElementById("numeroRueInput").value + " " +
        document.getElementById("nomRueInput").value + " " +
        document.getElementById("codePostalInput").value + " " +
        document.getElementById("villeInput").value;

    map = L.map('map').setView(array, 16);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 23,
        attribution: '&copy; <a href="https://osm.org/copyright%22%3EOpenStreetMap</a> contributors',
        id: 'mapbox.streets'
    }).addTo(map);

    var marker = L.marker(array).addTo(map);
    marker.bindPopup(document.getElementById("raisonSocialeInput").value + "<br/>" + adresse).openPopup();
}

async function createMeteoModale(array) {
    const url = "https://www.infoclimat.fr/public-api/gfs/json?_ll=" + array[0] + "," + array[1] +
        "&_auth=Bx0DFAV7U3FRfFZhUCYFLAdvAjcLfQUiAX1QM1w5XyJWPVAxBGRQNgRqWicAL1dhUH0EZww3CTkHbAJ6WigDYgdtA28FblM0UT5WM1B%2FBS4HPQJnCzwFNAFrUChcLl89Vj1QPAR5UDAEaFo5AC5XZVBmBHoMMgkxB2wCelooA2EHYwNjBWdTMVE3VjNQZAUxBzICfQsrBTsBZVBkXDZfPFY8UGYEMlBhBGlaPAA4VzBQZAR6DDEJMQdgAmNaMANjB2ADYwV5Uy5RR1ZHUH0FcQd2AjcLcgUgATdQaVxl&_c=83c427140f87bd975fcfb36035f83e4b";
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();

    try {
        const date = new Date();
        let dateString = date.toISOString().split("T")[0];

        if (date.getHours() <= 1) {
            dateString += " 01:00:00";
        } else if (date.getHours() > 1 && date.getHours() <= 4) {
            dateString += " 04:00:00";
        } else if (date.getHours() > 4 && date.getHours() <= 7) {
            dateString += " 07:00:00";
        } else if (date.getHours() > 7 && date.getHours() <= 10) {
            dateString += " 10:00:00";
        } else if (date.getHours() > 10 && date.getHours() <= 13) {
            dateString += " 13:00:00";
        } else if (date.getHours() > 13 && date.getHours() <= 16) {
            dateString += " 16:00:00";
        } else if (date.getHours() > 16 && date.getHours() <= 19) {
            dateString += " 19:00:00";
        } else if (date.getHours() > 19 && date.getHours() <= 22) {
            dateString += " 22:00:00";
        } else if (date.getHours() > 22) {
            date.setDate(date.getDate() + 1);
            dateString = date.toISOString().split("T")[0] + "01:00:00";
        }

        return json[dateString];
    } catch (error) {
        console.error(error);
        return "";
    }
}

function getTemperature(json) {
    const valeur = Math.floor(json.temperature["sol"] - 273.15);

    const libelle = (valeur < 0 && "Très froid") ||
        (valeur >= 0 && valeur < 10 && "Froid") ||
        (valeur >= 10 && valeur < 20 && "Frais") ||
        (valeur >= 20 && valeur < 30 && "Doux") ||
        (valeur >= 30 && "Chaud/Canicule");

    return [valeur, libelle];
}

function getPluie(json) {
    const valeur = Math.floor(json.pluie);

    const libelle = (valeur === 0 && "Aucune") ||
        (valeur > 0 && valeur < 2 && "Très faible") ||
        (valeur >= 2 && valeur < 10 && "Faible") ||
        (valeur >= 10 && valeur < 30 && "Modérée") ||
        (valeur >= 30 && valeur < 50 && "Forte") ||
        (valeur >= 50 && "Très forte");

    return [valeur, libelle];
}

function getVent(json) {
    const valeur = Math.floor(json.vent_moyen["10m"]);

    const libelle = (valeur >= 0 && valeur < 10 && "Calme") ||
        (valeur >= 10 && valeur < 20 && "Léger") ||
        (valeur >= 20 && valeur < 40 && "Modéré") ||
        (valeur >= 40 && valeur < 60 && "Fort") ||
        (valeur >= 60 && "Tempête/Ouragan");

    return [valeur, libelle];
}

function getNebulosite(json) {
    const valeur = Math.floor(json.nebulosite["totale"]);

    const libelle = (valeur >= 0 && valeur < 20 && "Dégagé") ||
        (valeur >= 20 && valeur < 50 && "Partiellement nuageux") ||
        (valeur >= 50 && valeur < 80 && "Nuageux") ||
        (valeur >= 80 && valeur < 100 && "Très nuageux") ||
        (valeur >= 100 && "Brouillard");

    return [valeur, libelle];
}

function getHumidite(json) {
    const valeur = Math.floor(json.humidite["2m"]);

    const libelle = (valeur < 30 && "Très sec") ||
        (valeur >= 30 && valeur < 50 && "Sec") ||
        (valeur >= 50 && valeur < 70 && "Modéré") ||
        (valeur >= 70 && valeur < 90 && "Humide") ||
        (valeur >= 90 && "Très humide");

    return [valeur, libelle];
}

function getTypeMeteo(valueTemperature, valuePluie, valueVent, valueNebulosite, valueHumidite) {
    if (valueTemperature >= 10 && valueTemperature < 30 &&
        valuePluie >= 0 && valuePluie < 2 &&
        valueVent >= 0 && valueVent < 20 &&
        valueNebulosite >= 0 && valueNebulosite < 20 &&
        valueHumidite >= 30 && valueHumidite < 70) {
        return "Météo claire et ensoleillée"
    } else if (valueTemperature >= 10 && valueTemperature < 30 &&
        valuePluie >= 2 && valuePluie < 30 &&
        valueVent >= 10 && valueVent < 40 &&
        valueNebulosite >= 50 && valueNebulosite <= 100 &&
        valueHumidite >= 50 && valueHumidite < 90) {
        return "Météo nuageuse/grise"
    } else if (valueTemperature >= 5 && valueTemperature < 25 &&
        valuePluie >= 2 && valuePluie < 10 &&
        valueVent >= 10 && valueVent < 20 &&
        valueNebulosite >= 20 && valueNebulosite < 80 &&
        valueHumidite >= 70 && valueHumidite < 90) {
        return "Pluie légère (Bruine/Averse)"
    } else if (valueTemperature >= 15 && valueTemperature < 30 &&
        valuePluie > 30 &&
        valueVent > 40 &&
        valueNebulosite >= 80 && valueNebulosite <= 100 &&
        valueHumidite > 90) {
        return "Orage/Pluie intense"
    } else if (valueTemperature > 30 &&
        valuePluie >= 0 && valuePluie < 2 &&
        valueVent >= 0 && valueVent < 20 &&
        valueNebulosite >= 0 && valueNebulosite < 50 &&
        valueHumidite >= 30 && valueHumidite < 90) {
        return "Canicule"
    } else if (valuePluie >= 0 && valuePluie < 30 &&
        valueVent > 40 &&
        valueNebulosite >= 50 && valueNebulosite <= 100 &&
        valueHumidite >= 50 && valueHumidite < 90) {
        return "Tempête de vent (Vent fort)"
    } else if (valueTemperature >= 0 && valueTemperature < 15 &&
        valuePluie >= 0 && valuePluie < 2 &&
        valueVent >= 0 && valueVent < 10 &&
        valueNebulosite === 100 &&
        valueHumidite > 90) {
        return "Brouillard"
    } else if (valueTemperature < 0 &&
        valuePluie >= 10 && valuePluie <= 100 &&
        valueVent >= 10 && valueVent < 40 &&
        valueNebulosite >= 50 && valueNebulosite <= 100 &&
        valueHumidite >= 50 && valueHumidite < 90) {
        return "Neige"
    } else if (valueTemperature >= 10 && valueTemperature < 35 &&
        valuePluie >= 0 && valuePluie < 2 &&
        valueVent >= 10 && valueVent < 40 &&
        valueNebulosite >= 0 && valueNebulosite < 20 &&
        valueHumidite < 30) {
        return "Temps sec et aride"
    } else if (valueTemperature > 25 &&
        valuePluie >= 10 &&
        valueVent >= 10 && valueVent < 60 &&
        valueNebulosite >= 20 && valueNebulosite <= 100 &&
        valueHumidite > 80) {
        return "Temps tropical (chaud et humide)"
    } else {
        return "Météo changeante"
    }
}