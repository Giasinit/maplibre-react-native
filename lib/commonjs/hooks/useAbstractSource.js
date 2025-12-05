"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useAbstractSource = useAbstractSource;
var _react = require("react");
function useAbstractSource() {
  const _nativeRef = (0, _react.useRef)(undefined);
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