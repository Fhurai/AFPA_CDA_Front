import {Societe} from "./model/Societe";
import {Adresse} from "./model/Adresse";

export class Client extends Societe{
    private _chiffreAffaires: number;
    private _nbEmployes: number;

    constructor(identifiant: number, raisonSociale: string, adresse: Adresse, telephone: string, mail: string, commentaires: string, chiffreAffaires: number, nbEmployes: number) {
        super(identifiant, raisonSociale, adresse, telephone, mail, commentaires);
        this._chiffreAffaires = chiffreAffaires;
        this._nbEmployes = nbEmployes;
    }

    get chiffreAffaires(): number {
        return this._chiffreAffaires;
    }

    set chiffreAffaires(value: number) {
        this._chiffreAffaires = value;
    }

    get nbEmployes(): number {
        return this._nbEmployes;
    }

    set nbEmployes(value: number) {
        this._nbEmployes = value;
    }
}