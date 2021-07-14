import azureColors from "./azure/colors";
import blackColors from "./black/colors";

import azureNames from "./azure/names";
import blackNames from "./black/names";

export class ColorLUT {
    private static readonly _upperNames: string[] = [
        "azure", "black"
    ];

    private static readonly _upperValues: Uint8Array[] = [
        azureColors, blackColors
    ];

    private static readonly _length: number = ColorLUT._upperNames.length;

    constructor() {
        throw new Error("ColorLUT.constructor() - ColorLUT can only be accessed statically");
    }

}