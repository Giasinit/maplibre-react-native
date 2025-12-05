import { type ReactNode } from "react";
import { type SymbolLayerStyle } from "../types/MapLibreRNStyles";
import { type OnPressEvent } from "../types/OnPressEvent";
interface AnnotationProps {
    id: string;
    animated?: boolean;
    animationDuration?: number;
    animationEasingFunction?: (x: number) => number;
    coordinates?: number[];
    onPress?: (event: OnPressEvent) => void;
    children?: ReactNode;
    style?: object;
    icon?: string | number | object;
}
interface AnnotationRef {
    onPress(event: OnPressEvent): void;
    symbolStyle: SymbolLayerStyle | undefined;
}
export declare const Annotation: import("react").ForwardRefExoticComponent<AnnotationProps & import("react").RefAttributes<AnnotationRef>>;
export {};
//# sourceMappingURL=Annotation.d.ts.map