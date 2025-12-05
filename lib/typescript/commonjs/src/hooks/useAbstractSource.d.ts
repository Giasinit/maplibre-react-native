import { Component } from "react";
import { type NativeMethods } from "react-native";
export declare function useAbstractSource<NativePropsType extends object>(): {
    _nativeRef: (Component<NativePropsType> & Readonly<NativeMethods>) | undefined;
    setNativeRef: (instance: Component<NativePropsType> & Readonly<NativeMethods>) => void;
    setNativeProps: (nativeProps: NativePropsType) => void;
};
//# sourceMappingURL=useAbstractSource.d.ts.map