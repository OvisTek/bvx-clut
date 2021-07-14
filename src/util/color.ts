/**
 * Interface for serialising and deserialising Color structure
 * for storage/database purposes
 */
export interface ColorJson {
    readonly r: number;
    readonly g: number;
    readonly b: number;
    readonly a: number;
}

/**
 * Represents 32 bit RGBA Color
 * Components range from 0 to 1
 * 
 * Contains a number of static and utility methods for working with colors
 */
export class Color {
    // color components
    private _r: number;
    private _g: number;
    private _b: number;
    private _a: number;

    constructor(red: number = 0, green: number = 0, blue: number = 0, alpha: number = 0) {
        this._r = red;
        this._g = green;
        this._b = blue;
        this._a = alpha;
    }

    /**
     * Serialise this Color for storage/database purposes
     * See ColorJson Interface for details
     */
    public serialise(): ColorJson {
        return {
            r: this._r,
            g: this._g,
            b: this._b,
            a: this._a
        };
    }

    /**
     * Deserialise a previously serialised version of a Color
     * 
     * @param values The serialised Color to deserialise
     */
    public static deserialise(values: ColorJson): Color {
        return new Color().deserialise(values);
    }

    private static _clamp(value: number, min: number, max: number): number {
        if (value < min) {
            return min;
        }

        if (value > max) {
            return max;
        }

        return value;
    }

    /**
     * Deserialise a previously serialised version of a Color
     *
     * @param values The serialised Color to deserialise
     */
    public deserialise(values: ColorJson): Color {
        return this.set(values.r, values.g, values.b, values.a);
    }

    /**
     * RED Component of this Color between 0 and 1
     */
    public get r(): number {
        return this._r;
    }

    public set r(value: number) {
        this._r = Color._clamp(value, 0, 1);
    }

    /**
     * Clamped RED Component of this Color between 0 and 255
     */
    public get red(): number {
        return this._r * 255;
    }

    public set red(value: number) {
        this.r = value / 255;
    }

    /**
     * GREEN Component of this Color between 0 and 1
     */
    public get g(): number {
        return this._g;
    }

    public set g(value: number) {
        this._g = Color._clamp(value, 0, 1);
    }

    /**
     * Clamped GREEN Component of this Color between 0 and 255
     */
    public get green(): number {
        return this._g * 255;
    }

    public set green(value: number) {
        this.g = value / 255;
    }

    /**
     * BLUE Component of this Color between 0 and 1
     */
    public get b(): number {
        return this._b;
    }

    public set b(value: number) {
        this._b = Color._clamp(value, 0, 1);
    }

    /**
     * Clamped BLUE Component of this Color between 0 and 255
     */
    public get blue(): number {
        return this._b * 255;
    }

    public set blue(value: number) {
        this.b = value / 255;
    }

    /**
     * ALPHA Component of this Color between 0 and 1
     */
    public get a(): number {
        return this._a;
    }

    public set a(value: number) {
        this._a = Color._clamp(value, 0, 1);
    }

    /**
     * Clamped ALPHA Component of this Color between 0 and 255
     */
    public get alpha(): number {
        return this._a * 255;
    }

    public set alpha(value: number) {
        this.a = value / 255;
    }

    /**
     * @param r red component to set
     * @param g green component to set
     * @param b blue component to set
     * @param a alpha component to set
     */
    public set(r: number, g: number, b: number, a: number): Color {
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;

        return this;
    }

    /**
     * 16 bit RGB565 Color Format
     * 
     * R Component is 5 bits
     * G Component is 6 bits
     * B Component is 5 bits
     */
    public get rgb565(): number {
        return Color.rgb565(this._r, this._g, this._b);
    }

    public set rgb565(color: number) {
        const value: number = color | 0;

        this.r = ((value & 0x0000F800) >>> 11) / 31.0;
        this.g = ((value & 0x000007E0) >>> 5) / 63.0;
        this.b = ((value & 0x0000001F) >>> 0) / 31.0;
    }

    /**
     * 16 bit RGB565 Color Format
     * 
     * @param r - Red Component as 5 bits passed as [0, 1]
     * @param g - Green Component as 6 bits passed as [0, 1]
     * @param b - Blue Component as 5 bits passed as [0, 1]
     */
    public static rgb565(r: number, g: number, b: number): number {
        const cr: number = (r * 31) | 0;
        const cg: number = (g * 63) | 0;
        const cb: number = (b * 31) | 0;

        return (cr << 11) | (cg << 5) | cb;
    }

    /**
     * 24 bit RGB888 Color Format
     * 
     * R Component is 8 bits
     * G Component is 8 bits
     * B Component is 8 bits
     */
    public get rgb888(): number {
        return Color.rgb888(this._r, this._g, this._b);
    }

    public set rgb888(color: number) {
        const value: number = color | 0;

        this.r = ((value & 0x00ff0000) >>> 16) / 255.0;
        this.g = ((value & 0x0000ff00) >>> 8) / 255.0;
        this.b = ((value & 0x000000ff)) / 255.0;
    }

    /**
     * 24 bit RGB888 Color Format
     * 
     * @param r - Red Component as 8 bits passed as [0, 1]
     * @param g - Green Component as 8 bits passed as [0, 1]
     * @param b - Blue Component as 8 bits passed as [0, 1]
     */
    public static rgb888(r: number, g: number, b: number): number {
        const cr: number = (r * 255) | 0;
        const cg: number = (g * 255) | 0;
        const cb: number = (b * 255) | 0;

        return (cr << 16) | (cg << 8) | cb;
    }

    /**
     * 16 bit RGB4444 Color Format
     * 
     * R Component is 4 bits
     * G Component is 4 bits
     * B Component is 4 bits
     * A Component is 4 bits
     */
    public get rgba4444(): number {
        return Color.rgba4444(this._r, this._g, this._b, this._a);
    }

    public set rgba4444(color: number) {
        const value: number = color | 0;

        this.r = ((value & 0x0000f000) >>> 12) / 15.0;
        this.g = ((value & 0x00000f00) >>> 8) / 15.0;
        this.b = ((value & 0x000000f0) >>> 4) / 15.0;
        this.a = ((value & 0x0000000f)) / 15.0;
    }

    /**
     * 16 bit RGBA4444 Color Format
     * 
     * @param r - Red Component as 4 bits passed as [0, 1]
     * @param g - Green Component as 4 bits passed as [0, 1]
     * @param b - Blue Component as 4 bits passed as [0, 1]
     * @param a - Alpha Component as 4 bits passed as [0, 1]
     */
    public static rgba4444(r: number, g: number, b: number, a: number): number {
        const cr: number = (r * 15) | 0;
        const cg: number = (g * 15) | 0;
        const cb: number = (b * 15) | 0;
        const ca: number = (a * 15) | 0;

        return (cr << 12) | (cg << 8) | (cb << 4) | ca;
    }

    /**
     * 32 bit RGBA8888 Color Format
     * 
     * R Component is 8 bits
     * G Component is 8 bits
     * B Component is 8 bits
     * A Component is 8 bits
     */
    public get rgba8888(): number {
        return Color.rgba8888(this._r, this._g, this._b, this._a);
    }

    public set rgba8888(color: number) {
        const value: number = color | 0;

        this.r = ((value & 0xff000000) >>> 24) / 255.0;
        this.g = ((value & 0x00ff0000) >>> 16) / 255.0;
        this.b = ((value & 0x0000ff00) >>> 8) / 255.0;
        this.a = ((value & 0x000000ff)) / 255.0;
    }

    /**
     * 32 bit RGBA8888 Color Format
     * 
     * @param r - Red Component as 8 bits passed as [0, 1]
     * @param g - Green Component as 8 bits passed as [0, 1]
     * @param b - Blue Component as 8 bits passed as [0, 1]
     * @param a - Alpha Component as 8 bits passed as [0, 1]
     */
    public static rgba8888(r: number, g: number, b: number, a: number): number {
        const cr: number = (r * 255) | 0;
        const cg: number = (g * 255) | 0;
        const cb: number = (b * 255) | 0;
        const ca: number = (a * 255) | 0;

        return (cr << 24) | (cg << 16) | (cb << 8) | ca;
    }

    /**
     * 32 bit ARGB8888 Color Format
     * 
     * R Component is 8 bits
     * G Component is 8 bits
     * B Component is 8 bits
     * A Component is 8 bits
     */
    public get argb8888(): number {
        return Color.argb8888(this._r, this._g, this._b, this._a);
    }

    public set argb8888(color: number) {
        const value: number = color | 0;

        this.a = ((value & 0xff000000) >>> 24) / 255.0;
        this.r = ((value & 0x00ff0000) >>> 16) / 255.0;
        this.g = ((value & 0x0000ff00) >>> 8) / 255.0;
        this.b = ((value & 0x000000ff)) / 255.0;
    }

    /**
     * 32 bit ARGB8888 Color Format
     * 
     * @param r - Red Component as 8 bits passed as [0, 1]
     * @param g - Green Component as 8 bits passed as [0, 1]
     * @param b - Blue Component as 8 bits passed as [0, 1]
     * @param a - Alpha Component as 8 bits passed as [0, 1]
     */
    public static argb8888(r: number, g: number, b: number, a: number): number {
        const cr: number = (r * 255) | 0;
        const cg: number = (g * 255) | 0;
        const cb: number = (b * 255) | 0;
        const ca: number = (a * 255) | 0;

        return (ca << 24) | (cr << 16) | (cg << 8) | cb;
    }
}