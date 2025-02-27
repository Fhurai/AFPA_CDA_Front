import {Societe} from "./Societe";
import {Adresse} from "./Adresse";

export class Client extends Societe {
    constructor(identifiant: number, raisonSociale: string, adresse: Adresse, telephone: string, mail: string, commentaires: string, chiffreAffaires: number, nbEmployes: number) {
        super(identifiant, raisonSociale, adresse, telephone, mail, commentaires);
        this._chiffreAffaires = chiffreAffaires;
        this._nbEmployes = nbEmployes;
    }

    private _chiffreAffaires: number;

    get chiffreAffaires(): number {
        return this._chiffreAffaires;
    }

    set chiffreAffaires(value: number) {
        this._chiffreAffaires = value;
    }

    private _nbEmployes: number;

    get nbEmployes(): number {
        return this._nbEmployes;
    }

    set nbEmployes(value: number) {
        this._nbEmployes = value;
    }
}