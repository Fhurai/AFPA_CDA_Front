export default class Strings {

    static nameToLabel(name: string): string {
        let betterLabel: string = "";
        let i: number = 0;
        let character: any;

        while (i < name.length) {
            character = name.charAt(i);
            betterLabel = betterLabel.trim();
            if (!isNaN(character * 1)) {
                betterLabel += character;
            } else {
                if (character === character.toUpperCase() || i === 0) {
                    betterLabel += " " + character.toUpperCase();
                } else {
                    betterLabel += character;
                }
            }
            i++;
        }
        return betterLabel;
    }

    static getPattern(type: string): string {
        let ret: string;
        switch (type){
            case "nom":{
                ret = "^[A-Za-zÀ-ÿ' \\-]+$";
                break;
            }
            case "telephone":{
                ret = "^(?:(?:\\+|00)33|0)\\s*[1-9](?:[\\s.\\-]*\\d{2}){4}";
                break;
            }
            case "adresseMail":{
                ret = "^[A-Za-z0-9._%+\\-]+@[A-Za-z0-9]+.[A-Za-z0-9.\\-]{2,}";
                break;
            }
            case "numeroRue":{
                ret = "(?:\\d{0,3} +(bis|ter|quat)|(?:^|\\b))|(?:\\b\\d{0,3}[ab]*\\b)";
                break;
            }
            case "codePostal":{
                ret = "\\b\\d{5}\\b";
                break;
            }
            case "ville":{
                ret = "\\b([a-zA-Z]+(?:[.\\- ']*[a-zA-Z]+)*)\\b";
                break;
            }
            default:{
                ret = "";
                break;
            }
        }
        return ret;
    }
}