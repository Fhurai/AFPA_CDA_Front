import {Societe} from "./Societe";
import {Adresse} from "./Adresse";

export class Prospect extends Societe{

    private _dateProspection: Date;
    private _prospectInteresse: string;

    constructor(identifiant: number, raisonSociale: string, adresse: Adresse, telephone: string, mail: string, commentaires: string, dateProspection: Date, prospectInteresse: string) {
        super(identifiant, raisonSociale, adresse, telephone, mail, commentaires);
        this._dateProspection = dateProspection;
        this._prospectInteresse = prospectInteresse;
    }

    get dateProspection(): Date {
        return this._dateProspection;
    }

    set dateProspection(value: Date) {
        this._dateProspection = value;
    }

    get prospectInteresse(): string {
        return this._prospectInteresse;
    }

    set prospectInteresse(value: string) {
        this._prospectInteresse = value;
    }
}