function getCurrentPage(){
    const pathArray = window.location.pathname.split("/");
    let page;

    if(pathArray.length === 9){
        page = pathArray[7] + "/" + pathArray[8];
    }else if(pathArray.length === 10){
        page = pathArray[7] + "/" + pathArray[8] + "/" + pathArray[9];
    }
    return page;
}

function securiteChiffreAffaires(){
    return document.querySelector("form input#chiffreAffairesInput").value < 200;
}

function securiteNbEmployes(){
    return document.querySelector("form input#nbEmployesInput").value < 1;
}

function detectHovertable(){
    return document.querySelector(".hovertable") !== null;
}

function searchValueHovertable(value, column){
    Array.from(document.querySelectorAll(".hovertable .hovertable-body .hovertable-row")).forEach((row) => {
        let searchFalse;

        if(row.getAttribute("searchFalse") !== null){
            searchFalse = JSON.parse(row.getAttribute("searchFalse"));
        }else{
            searchFalse = [];
        }

        if(!row.children[column].innerText.includes(value) && value !== ""){
            searchFalse.push(column);
        }else{
            let index = searchFalse.indexOf(column);
            if(index > -1){
                searchFalse.splice(index, 1);
            }
        }

        row.setAttribute("searchFalse", JSON.stringify(searchFalse));
    });
    hideRowIfMarked();
}

function hideRowIfMarked(){
    Array.from(document.querySelectorAll(".hovertable .hovertable-body .hovertable-row")).forEach((row) => {
        console.log(row.children[0].innerHTML.trim() + " : "+row.getAttribute("searchFalse"));
        let searchFalse;

        if(row.getAttribute("searchFalse") !== null){
            searchFalse = JSON.parse(row.getAttribute("searchFalse"));
        }

        if(searchFalse.length > 0){
            row.setAttribute("hidden", "hidden");
        }else{
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