import { Color } from "../util/color";

import azureColors from "./azure/colors";
import blackColors from "./black/colors";

import azureNames from "./azure/names";
import blackNames from "./black/names";

interface NameIndex {
    index: number,
    names: Map<string, number>
}

export class ColorLUT {
    private static readonly _upperNames: Map<string, NameIndex> = new Map<string, NameIndex>([
        ["azure", {
            index: 0,
            names: azureNames
        }],
        ["black", {
            index: 1,
            names: blackNames
        }]
    ]);

    private static readonly _upperValues: Uint8Array[] = [
        azureColors, blackColors
    ];

    constructor() {
        throw new Error("ColorLUT.constructor() - ColorLUT can only be accessed statically");
    }

    public getByName(upper: string, lower: string, optres: Color | null = null): Color {
        const returnVal: Color = optres || new Color();
        const upperIndex: NameIndex | undefined = ColorLUT._upperNames.get(upper);

        if (upperIndex) {
            const lowerIndex: number | undefined = upperIndex.names.get(lower);

            if (lowerIndex) {
                const lut: Uint8Array = ColorLUT._upperValues[upperIndex.index];
                const lutIndex: number = (lowerIndex - 1) * 3;

                const r: number = lut[lutIndex];
                const g: number = lut[lutIndex + 1];
                const b: number = lut[lutIndex + 2];

                return returnVal.set(r, g, b, 255);
            }

            throw new Error("ColorLUT.getByName(string, string) - lower index with name \"" + lower + "\" could not be found");
        }

        throw new Error("ColorLUT.getByName(string, string) - upper index with name \"" + upper + "\" could not be found");
    }

    public getByIndex(upper: number, lower: number, optres: Color | null = null): Color {
        const returnVal: Color = optres || new Color();
        const lut: Uint8Array[] = ColorLUT._upperValues;

        if (upper < lut.length && upper >= 0) {
            const lowerLUT: Uint8Array = lut[upper];
            const lowerIndex: number = lower * 3;

            if (lower < (lowerLUT.length - 3) && lower >= 0) {
                const r: number = lowerLUT[lowerIndex];
                const g: number = lowerLUT[lowerIndex + 1];
                const b: number = lowerLUT[lowerIndex + 2];

                return returnVal.set(r, g, b, 255);
            }

            throw new RangeError("ColorLUT.getByIndex(string, string) - lower index \"" + lower + "\" is out of bounds");
        }

        throw new RangeError("ColorLUT.getByIndex(string, string) - upper index \"" + upper + "\" is out of bounds");
    }
}