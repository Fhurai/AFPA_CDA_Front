import {Adresse} from "./Adresse";

export class Societe {
    private _identifiant: number;
    private _raisonSociale: string;
    private _adresse: Adresse;
    private _telephone: string;
    private _mail: string;
    private _commentaires: string;


    constructor(identifiant: number, raisonSociale: string, adresse: Adresse, telephone: string, mail: string, commentaires: string) {
        this._identifiant = identifiant;
        this._raisonSociale = raisonSociale;
        this._adresse = adresse;
        this._telephone = telephone;
        this._mail = mail;
        this._commentaires = commentaires;
    }

    get identifiant(): number {
        return this._identifiant;
    }

    set identifiant(value: number) {
        this._identifiant = value;
    }

    get raisonSociale(): string {
        return this._raisonSociale;
    }

    set raisonSociale(value: string) {
        this._raisonSociale = value;
    }

    get adresse(): Adresse {
        return this._adresse;
    }

    set adresse(value: Adresse) {
        this._adresse = value;
    }

    get telephone(): string {
        return this._telephone;
    }

    set telephone(value: string) {
        this._telephone = value;
    }

    get mail(): string {
        return this._mail;
    }

    set mail(value: string) {
        this._mail = value;
    }

    get commentaires() {
        return this._commentaires;
    }

    set commentaires(value) {
        this._commentaires = value;
    }
}