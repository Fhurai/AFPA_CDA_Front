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
}