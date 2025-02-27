export class Adresse {
    constructor(numeroRue: string, nomRue: string, codePostal: string, ville: string) {
        this._numeroRue = numeroRue;
        this._nomRue = nomRue;
        this._codePostal = codePostal;
        this._ville = ville;
    }

    private _numeroRue: string;

    get numeroRue(): string {
        return this._numeroRue;
    }

    set numeroRue(value: string) {
        this._numeroRue = value;
    }

    private _nomRue: string;

    get nomRue(): string {
        return this._nomRue;
    }

    set nomRue(value: string) {
        this._nomRue = value;
    }

    private _codePostal: string;

    get codePostal(): string {
        return this._codePostal;
    }

    set codePostal(value: string) {
        this._codePostal = value;
    }

    private _ville: string;

    get ville(): string {
        return this._ville;
    }

    set ville(value: string) {
        this._ville = value;
    }
}