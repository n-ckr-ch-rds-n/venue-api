export class Utils {

    stringEquals(string1: string, string2: string): boolean {
        return string1.toLowerCase() === string2.toLowerCase();
    }

    dateEquals(val1: any, val2: any): boolean {
        return this.sanitiseDate(val1) === this.sanitiseDate(val2);
    }

    sanitiseDate(date: string | number): number {
        return new Date(date).setHours(0, 0, 0, 0);
    }

    deDupe(values: string[]): string[] {
        return values.filter((v, i, a) => i === a.indexOf(v));
    }
}
