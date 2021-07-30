export class Validator {

    static isStringOrUndefined(input: any): boolean {
        return !input || typeof input === "string";
    }

}
