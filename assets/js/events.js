document.addEventListener("DOMContentLoaded", function(){
    /**
     * Sécurité pour les champs chiffre d'affaires et nb employés.
     */
    if(["Front/clients/create.html", "Front/clients/update.html"].includes(getCurrentPage())){
        document.querySelector("main form button").addEventListener("click", function(){
            if(securiteChiffreAffaires()){
                console.error("Chiffre d'affaires doit être au dessus de" +
                    " 250€ !");
            }

            if(securiteNbEmployes()){
                console.error("La société doit compter au moins 1 employé !")
            }
        });
    }

    /**
     * Recherche dans le tableau Hovertable
     */
    if(detectHovertable()){
        Array.from(document.querySelectorAll(".hovertable input")).forEach((input) => {
            let row = input.parentElement.parentElement;
            input.addEventListener("input", function(){
                searchValueHovertable(input.value, Array.from(row.children).indexOf(input.parentElement));
            });
        });
        Array.from(document.querySelectorAll(".hovertable select")).forEach((select) => {
            let row = select.parentElement.parentElement;
            select.addEventListener("change", function(){
                searchValueHovertable(select.selectedOptions[0].innerText, Array.from(row.children).indexOf(select.parentElement));
            });
        });
    }

    if(["Front/clients/view.html", "Front/prospects/view.html"]){
        let map;
        const adresse = document.getElementById("numeroRueInput").value + " " +
            document.getElementById("nomRueInput").value + " " +
            document.getElementById("codePostalInput").value + " " +
            document.getElementById("villeInput").value;

        searchGeolocalisation()
            .then(array => {
                map = L.map('map').setView(array, 16);

                L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    maxZoom: 23,
                    attribution: '&copy; <a href="https://osm.org/copyright%22%3EOpenStreetMap</a> contributors',
                    id: 'mapbox.streets'
                }).addTo(map);

                var marker = L.marker(array).addTo(map);
                marker.bindPopup(document.getElementById("raisonSocialeInput").value+"<br/>"+adresse).openPopup();
            });
    }
});