export class Contrat {
    constructor(identifiant: number, libelle: string, montant: number, idClient: number) {
        this._id = identifiant;
        this._libelle = libelle;
        this._montant = montant;
        this._idClient = idClient;
    }

    private _id: number;

    get id(): number {
        return this._id;
    }

    set id(value: number) {
        this._id = value;
    }

    private _libelle: string;

    get libelle(): string {
        return this._libelle;
    }

    set libelle(value: string) {
        this._libelle = value;
    }

    private _montant: number;

    get montant(): number {
        return this._montant;
    }

    set montant(value: number) {
        this._montant = value;
    }

    private _idClient: number;

    get idClient(): number {
        return this._idClient;
    }

    set idClient(value: number) {
        this._idClient = value;
    }
}