import {FormState} from "../components/main/form";

export default class Meteo{

    static getTemperature(json: any): [number, string]{
        const valeur: number = Math.floor(json.temperature["sol"] - 273.15);

        const libelle: string = (valeur < 0 && "Très froid") ||
            (valeur >= 0 && valeur < 10 && "Froid") ||
            (valeur >= 10 && valeur < 20 && "Frais") ||
            (valeur >= 20 && valeur < 30 && "Doux") ||
            (valeur >= 30 && "Chaud/Canicule") || "";

        return [valeur, libelle];
    }

    static getPluie(json: any): [number, string]{
        const valeur: number = Math.floor(json.pluie);

        const libelle: string = (valeur === 0 && "Aucune") ||
            (valeur > 0 && valeur < 2 && "Très faible") ||
            (valeur >= 2 && valeur < 10 && "Faible") ||
            (valeur >= 10 && valeur < 30 && "Modérée") ||
            (valeur >= 30 && valeur < 50 && "Forte") ||
            (valeur >= 50  && "Très forte") || "";

        return [valeur, libelle];
    }

    static getVent(json: any): [number, string]{
        const valeur: number = Math.floor(json.vent_moyen["10m"]);

        const libelle: string = (valeur >= 0 && valeur < 10 && "Calme") ||
            (valeur >= 10 && valeur < 20 && "Léger") ||
            (valeur >= 20 && valeur < 40 && "Modéré") ||
            (valeur >= 40 && valeur < 60 && "Fort") ||
            (valeur >= 60 && "Tempête/Ouragan") || "";

        return [valeur, libelle];
    }

    static getNebulosite(json: any): [number, string]{
        const valeur: number = Math.floor(json.nebulosite["totale"]);

        const libelle: string = (valeur >= 0 && valeur <20 && "Dégagé") ||
            (valeur >= 20 && valeur <50 && "Partiellement nuageux") ||
            (valeur >= 50 && valeur <80 && "Nuageux") ||
            (valeur >= 80 && valeur <100 && "Très nuageux") ||
            (valeur >= 100 && "Brouillard") || "";

        return [valeur, libelle];
    }

    static getHumidite(json: any): [number, string]{
        const valeur: number = Math.floor(json.humidite["2m"]);

        const libelle: string = (valeur < 30 && "Très sec") ||
            (valeur >= 30 && valeur < 50 && "Sec") ||
            (valeur >= 50 && valeur < 70 && "Modéré") ||
            (valeur >= 70 && valeur < 90 && "Humide") ||
            (valeur >= 90 && "Très humide") || "";

        return [valeur, libelle];
    }

    static getTypeMeteo(valueTemperature: number, valuePluie: number, valueVent: number, valueNebulosite: number, valueHumidite: number): string{
        if(valueTemperature >= 10 && valueTemperature <30 &&
            valuePluie >= 0 && valuePluie < 2 &&
            valueVent >= 0 && valueVent <20 &&
            valueNebulosite >= 0 && valueNebulosite < 20 &&
            valueHumidite >= 30 && valueHumidite < 70){
            return "Météo claire et ensoleillée"
        }else if(valueTemperature >= 10 && valueTemperature <30 &&
            valuePluie >= 2 && valuePluie < 30 &&
            valueVent >= 10 && valueVent <40 &&
            valueNebulosite >= 50 && valueNebulosite <= 100 &&
            valueHumidite >= 50 && valueHumidite < 90){
            return "Météo nuageuse/grise"
        }else if(valueTemperature >= 5 && valueTemperature <25 &&
            valuePluie >= 2 && valuePluie < 10 &&
            valueVent >= 10 && valueVent <20 &&
            valueNebulosite >= 20 && valueNebulosite < 80 &&
            valueHumidite >= 70 && valueHumidite < 90){
            return "Pluie légère (Bruine/Averse)"
        }else if(valueTemperature >= 15 && valueTemperature <30 &&
            valuePluie > 30 &&
            valueVent > 40 &&
            valueNebulosite >= 80 && valueNebulosite <= 100 &&
            valueHumidite > 90){
            return "Orage/Pluie intense"
        }else if(valueTemperature >30 &&
            valuePluie >= 0 && valuePluie < 2 &&
            valueVent >= 0 && valueVent <20 &&
            valueNebulosite >= 0 && valueNebulosite < 50 &&
            valueHumidite >= 30 && valueHumidite < 90){
            return "Canicule"
        }else if(valuePluie >= 0 && valuePluie < 30 &&
            valueVent > 40 &&
            valueNebulosite >= 50 && valueNebulosite <= 100 &&
            valueHumidite >= 50 && valueHumidite < 90){
            return "Tempête de vent (Vent fort)"
        }else if(valueTemperature >= 0 && valueTemperature <15 &&
            valuePluie >= 0 && valuePluie < 2 &&
            valueVent >= 0 && valueVent <10 &&
            valueNebulosite === 100 &&
            valueHumidite > 90){
            return "Brouillard"
        }else if(valueTemperature < 0 &&
            valuePluie >= 10 && valuePluie <= 100 &&
            valueVent >= 10 && valueVent <40 &&
            valueNebulosite >= 50 && valueNebulosite <= 100 &&
            valueHumidite >= 50 && valueHumidite < 90){
            return "Neige"
        }else if(valueTemperature >= 10 && valueTemperature <35 &&
            valuePluie >= 0 && valuePluie < 2 &&
            valueVent >= 10 && valueVent <40 &&
            valueNebulosite >= 0 && valueNebulosite < 20 &&
            valueHumidite < 30){
            return "Temps sec et aride"
        }else if(valueTemperature >25 &&
            valuePluie >= 10 &&
            valueVent >= 10 && valueVent <60 &&
            valueNebulosite >= 20 && valueNebulosite <= 100 &&
            valueHumidite > 80){
            return "Temps tropical (chaud et humide)"
        }else{
            return "Météo changeante"
        }
    }
}