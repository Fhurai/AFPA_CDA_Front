import {Adresse} from "./Adresse";

export class Societe {
    constructor(identifiant: number, raisonSociale: string, adresse: Adresse, telephone: string, mail: string, commentaires: string) {
        this._identifiant = identifiant;
        this._raisonSociale = raisonSociale;
        this._adresse = adresse;
        this._telephone = telephone;
        this._mail = mail;
        this._commentaires = commentaires;
    }

    private _identifiant: number;

    get identifiant(): number {
        return this._identifiant;
    }

    set identifiant(value: number) {
        this._identifiant = value;
    }

    private _raisonSociale: string;

    get raisonSociale(): string {
        return this._raisonSociale;
    }

    set raisonSociale(value: string) {
        this._raisonSociale = value;
    }

    private _adresse: Adresse;

    get adresse(): Adresse {
        return this._adresse;
    }

    set adresse(value: Adresse) {
        this._adresse = value;
    }

    private _telephone: string;

    get telephone(): string {
        return this._telephone;
    }

    set telephone(value: string) {
        this._telephone = value;
    }

    private _mail: string;

    get mail(): string {
        return this._mail;
    }

    set mail(value: string) {
        this._mail = value;
    }

    private _commentaires: string;

    get commentaires() {
        return this._commentaires;
    }

    set commentaires(value) {
        this._commentaires = value;
    }
}