export namespace COMMA {
    export class Constant {
        public static ORINET = { top: "top", bottom: "bottom", left: "left", right: "right" };
        public static TEXT_ANCHOR = { start: "start", middle: "middle", end: "end" };
        public static COLOR = { steelblue: "steelblue", white: "white", black: "black", yellow: "yellow" };
        /**
         * 插值模式
         * linear 线性插值
         * step 锯齿折线
         * 
         */
        public static INTERPOLATER = {
            linear: "linear", linearclosed: "linear-closed", step: "step", basis: "basis",
            bundle: "bundle", cardinal: "cardinal", monotone: "monotone"
        };

    }
    export enum ScaleType { Linear, Pow, Log, Quantize, Quantile, Ordinal };
}
