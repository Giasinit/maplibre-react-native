import { Component, type RefObject } from "react";
import { type NativeMethods } from "react-native";
export type NativeRef<NativeProps> = Component<NativeProps> & Readonly<NativeMethods>;
/**
 * Separate  module which allows to be mocked in tests.
 */
export declare function useNativeRef<NativeProps = object>(): RefObject<NativeRef<NativeProps>>;
//# sourceMappingURL=useNativeRef.d.ts.map