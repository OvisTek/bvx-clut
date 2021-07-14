const fs = require("fs-extra");

const rgbToHsl = (c) => {
    const r = c[0] / 255;
    const g = c[1] / 255;
    const b = c[2] / 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);

    let h, s, l = (max + min) / 2;

    if (max === min) {
        h = s = 0;
    }
    else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }

        h /= 6;
    }

    return [h * 360, s * 100, l * 100];
};

const sortColourArray = (colourArray) => {
    return colourArray.map((c, i) => {
        return {
            color: rgbToHsl(c.rgb),
            index: i
        };
    }).sort((c1, c2) => {
        return c1.color[0] - c2.color[0];
    }).map((data) => {
        return colourArray[data.index];
    });
};

const searchColour = (colours, search) => {
    for (let i = 0; i < search.length; i++) {
        const toCheck = search[i];

        if (toCheck && colours[0] === toCheck[0] && colours[1] === toCheck[1] && colours[2] === toCheck[2]) {
            return true;
        }
    }

    return false;
};

const duplicates = [];

const writeLUT = (colourArray, lutFileName) => {
    const LUT_COLOUR_PATH = "./src/lut/" + lutFileName + "/colours.ts";
    const LUT_NAME_PATH = "./src/lut/" + lutFileName + "/names.ts";

    try {
        fs.unlinkSync(LUT_COLOUR_PATH);
    }
    catch (e) { }

    try {
        fs.unlinkSync(LUT_NAME_PATH);
    }
    catch (e) { }

    // sort our array
    const sortedColourArray = sortColourArray(colourArray);

    let coloursOut = "[";
    let namesOut = "[";

    for (let i = 0; i < sortedColourArray.length; i++) {
        const colourToWrite = sortedColourArray[i];

        // make sure the same RGB does not end up in different LUT tables
        if (colourToWrite && !searchColour(colourToWrite.rgb, duplicates)) {
            duplicates.push(colourToWrite.rgb);

            coloursOut += colourToWrite.rgb[0] + "," + colourToWrite.rgb[1] + "," + colourToWrite.rgb[2] + ",";
            namesOut += "\"" + colourToWrite.name.toLowerCase() + "\",";
        }
    }

    // strip last character and close the array
    coloursOut = coloursOut.slice(0, -1) + "]";
    namesOut = namesOut.slice(0, -1) + "]";

    fs.ensureFileSync(LUT_COLOUR_PATH);
    fs.writeFileSync(LUT_COLOUR_PATH, "export default new Uint8Array(" + coloursOut + ");");
    fs.ensureFileSync(LUT_NAME_PATH);
    fs.writeFileSync(LUT_NAME_PATH, "export default " + namesOut + ";");
};

const azureArray = require("./colours/azure-lut");
const blackArray = require("./colours/black-lut");

// sort and write the azure-array
writeLUT(azureArray, 'azure');
writeLUT(blackArray, 'black');