document.addEventListener("DOMContentLoaded", function () {
    genDOM();

    /**
     * Sécurité pour les champs chiffre d'affaires et nb employés.
     */
    if (["Front/clients/create.html", "Front/clients/update.html"].includes(getCurrentPage())) {
        document.querySelector("main form button").addEventListener("click", function (e) {

            let msg = "";
            e.preventDefault();

            if (securiteChiffreAffaires()) {
                msg += "Chiffre d'affaires doit être au dessus de 250€ !\n";
            }

            if (securiteNbEmployes()) {
                msg += "La société doit compter au moins 1 employé !\n";
            }

            if (msg !== "") {
                alert(msg);
                console.error(msg);
            }

        });
    }

    /**
     * Recherche dans le tableau Hovertable
     */
    if (detectHovertable()) {
        Array.from(document.querySelectorAll(".hovertable input")).forEach((input) => {
            let row = input.parentElement.parentElement;
            input.addEventListener("input", function () {
                searchValueHovertable(input.value, Array.from(row.children).indexOf(input.parentElement));
            });
        });
        Array.from(document.querySelectorAll(".hovertable select")).forEach((select) => {
            let row = select.parentElement.parentElement;
            select.addEventListener("change", function () {
                searchValueHovertable(select.selectedOptions[0].innerText, Array.from(row.children).indexOf(select.parentElement));
            });
        });
    }

    /**
     * Géolocation + Meteo.
     */
    if (["Front/clients/view.html", "Front/prospects/view.html"].includes(getCurrentPage())) {
        searchGeolocalisation()
            .then(array => {
                createLeafletMap(array);
                createMeteoModale(array).then(r => {
                    const t = getTemperature(r);
                    document.getElementById("resultT").innerText = t[0] + "°C - " + t[1];

                    const p = getPluie(r);
                    document.getElementById("resultP").innerText = p[0] + "mm" +
                        " - " + p[1];

                    const v = getVent(r);
                    document.getElementById("resultV").innerText = v[0] + "km/h - " + v[1];

                    const n = getNebulosite(r);
                    document.getElementById("resultN").innerText = n[0] + "% -" +
                        " " + n[1];

                    const h = getHumidite(r);
                    document.getElementById("resultH").innerText = h[0] + "% -" +
                        " " + h[1];

                    const labelMeteo = getTypeMeteo(t[0], p[0], v[0], n[0], h[0]);
                    document.getElementById("modalMeteo").innerText = labelMeteo;
                    document.getElementById("labelAdresseMeteo").innerText = labelMeteo;
                });
            });
    }
});