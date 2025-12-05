"use strict";

import { useRef } from "react";
export function useAbstractSource() {
  const _nativeRef = useRef(undefined);
  const setNativeRef = instance => {
    _nativeRef.current = instance;
  };
  const setNativeProps = newProps => {
    if (_nativeRef.current) {
      _nativeRef.current.setNativeProps(newProps);
    }
  };
  return {
    _nativeRef: _nativeRef.current,
    setNativeRef,
    setNativeProps
  };
}
//# sourceMappingURL=useAbstractSource.js.map