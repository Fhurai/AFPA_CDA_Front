export class Adresse {
    private _numeroRue: string;
    private _nomRue: string;
    private _codePostal: string;
    private _ville: string;

    constructor(numeroRue: string, nomRue: string, codePostal: string, ville: string) {
        this._numeroRue = numeroRue;
        this._nomRue = nomRue;
        this._codePostal = codePostal;
        this._ville = ville;
    }

    get numeroRue(): string {
        return this._numeroRue;
    }

    set numeroRue(value: string) {
        this._numeroRue = value;
    }

    get nomRue(): string {
        return this._nomRue;
    }

    set nomRue(value: string) {
        this._nomRue = value;
    }

    get codePostal(): string {
        return this._codePostal;
    }

    set codePostal(value: string) {
        this._codePostal = value;
    }

    get ville(): string {
        return this._ville;
    }

    set ville(value: string) {
        this._ville = value;
    }
}