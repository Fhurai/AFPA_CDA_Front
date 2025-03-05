import {FormState} from "../components/main/form";

export default class Meteo{

    static getTemperature(valeur: number){
        return (valeur < 0 && "Très froid") ||
            (valeur >= 0 && valeur < 10 && "Froid") ||
            (valeur >= 10 && valeur < 20 && "Frais") ||
            (valeur >= 20 && valeur < 30 && "Doux") ||
            (valeur >= 30 && "Chaud/Canicule");
    }
    
    static getPluie(valeur: number){
        return (valeur === 0 && "Aucune") ||
        (valeur > 0 && valeur < 2 && "Très faible") ||
        (valeur >= 2 && valeur < 10 && "Faible") ||
        (valeur >= 10 && valeur < 30 && "Modérée") ||
        (valeur >= 30 && valeur < 50 && "Forte") ||
        (valeur >= 50  && "Très forte")
    }
    
    static getVent(valeur: number){
        return (valeur >= 0 && valeur < 10 && "Calme") ||
            (valeur >= 10 && valeur < 20 && "Léger") ||
            (valeur >= 20 && valeur < 40 && "Modéré") ||
            (valeur >= 40 && valeur < 60 && "Fort") ||
            (valeur >= 60 && "Tempête/Ouragan")
    }
    
    static getNebulosite(valeur: number){
        return (valeur >= 0 && valeur <20 && "Dégagé") ||
            (valeur >= 20 && valeur <50 && "Partiellement nuageux") ||
            (valeur >= 50 && valeur <80 && "Nuageux") ||
            (valeur >= 80 && valeur <100 && "Très nuageux") ||
            (valeur >= 100 && "Brouillard");
    }
    
    static getHumidite(valeur: number){
        return (valeur < 30 && "Très sec") ||
            (valeur >= 30 && valeur < 50 && "Sec") ||
            (valeur >= 50 && valeur < 70 && "Modéré") ||
            (valeur >= 70 && valeur < 90 && "Humide") ||
            (valeur >= 90 && "Très humide");
    }

    static getType(properties: FormState){
        if(properties.temperature >= 10 && properties.temperature <30 &&
            properties.pluie >= 0 && properties.pluie < 2 &&
            properties.vent >= 0 && properties.vent <20 &&
            properties.nebulosite >= 0 && properties.nebulosite < 20 &&
            properties.humidite >= 30 && properties.humidite < 70){
            return "Météo claire et ensoleillée"
        }else if(properties.temperature >= 10 && properties.temperature <30 &&
            properties.pluie >= 2 && properties.pluie < 30 &&
            properties.vent >= 10 && properties.vent <40 &&
            properties.nebulosite >= 50 && properties.nebulosite <= 100 &&
            properties.humidite >= 50 && properties.humidite < 90){
            return "Météo nuageuse/grise"
        }else if(properties.temperature >= 5 && properties.temperature <25 &&
            properties.pluie >= 2 && properties.pluie < 10 &&
            properties.vent >= 10 && properties.vent <20 &&
            properties.nebulosite >= 20 && properties.nebulosite < 80 &&
            properties.humidite >= 70 && properties.humidite < 90){
            return "Pluie légère (Bruine/Averse)"
        }else if(properties.temperature >= 15 && properties.temperature <30 &&
            properties.pluie > 30 &&
            properties.vent > 40 &&
            properties.nebulosite >= 80 && properties.nebulosite <= 100 &&
            properties.humidite > 90){
            return "Orage/Pluie intense"
        }else if(properties.temperature >30 &&
            properties.pluie >= 0 && properties.pluie < 2 &&
            properties.vent >= 0 && properties.vent <20 &&
            properties.nebulosite >= 0 && properties.nebulosite < 50 &&
            properties.humidite >= 30 && properties.humidite < 90){
            return "Canicule"
        }else if(properties.pluie >= 0 && properties.pluie < 30 &&
            properties.vent > 40 &&
            properties.nebulosite >= 50 && properties.nebulosite <= 100 &&
            properties.humidite >= 50 && properties.humidite < 90){
            return "Tempête de vent (Vent fort)"
        }else if(properties.temperature >= 0 && properties.temperature <15 &&
            properties.pluie >= 0 && properties.pluie < 2 &&
            properties.vent >= 0 && properties.vent <10 &&
            properties.nebulosite === 100 &&
            properties.humidite > 90){
            return "Brouillard"
        }else if(properties.temperature < 0 &&
            properties.pluie >= 10 && properties.pluie <= 100 &&
            properties.vent >= 10 && properties.vent <40 &&
            properties.nebulosite >= 50 && properties.nebulosite <= 100 &&
            properties.humidite >= 50 && properties.humidite < 90){
            return "Neige"
        }else if(properties.temperature >= 10 && properties.temperature <35 &&
            properties.pluie >= 0 && properties.pluie < 2 &&
            properties.vent >= 10 && properties.vent <40 &&
            properties.nebulosite >= 0 && properties.nebulosite < 20 &&
            properties.humidite < 30){
            return "Temps sec et aride"
        }else if(properties.temperature >25 &&
            properties.pluie >= 10 &&
            properties.vent >= 10 && properties.vent <60 &&
            properties.nebulosite >= 20 && properties.nebulosite <= 100 &&
            properties.humidite > 80){
            return "Temps tropical (chaud et humide)"
        }else{
            return "Météo changeante"
        }
    }
}