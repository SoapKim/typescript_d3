export namespace COMMA{
    export class Constant {
        public static ORINET = { top: "top", bottom: "bottom", left: "left", right: "right" };
        public static TEXT_ANCHOR = { start: "start", middle: "middle", end: "end" };
        public static COLOR = { steelblue: "steelblue", white: "white",black:"black" };
        
    }
    export enum ScaleType  { Linear, Pow, Log, Quantize, Quantile, Ordinal };
}
