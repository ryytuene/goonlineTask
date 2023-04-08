class Color {
    fullHex: string;
    red: number;
    green: number;
    blue: number;

    constructor(hexValue: string) {
        this.fullHex = hexValue.length === 4 ?
            "#" + hexValue.substring(1, 2).repeat(2) + hexValue.substring(2, 3).repeat(2) + hexValue.substring(3).repeat(2)
            : hexValue;
        this.red = parseInt(this.fullHex.substring(1, 3), 16);
        this.green = parseInt(this.fullHex.substring(3, 5), 16);
        this.blue = parseInt(this.fullHex.substring(5), 16);
    }
}

export default Color