"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useOnce = void 0;
var _react = require("react");
const useOnce = callback => {
  const once = (0, _react.useRef)(false);
  if (!once.current) {
    once.current = true;
    callback();
  }
};
exports.useOnce = useOnce;
//# sourceMappingURL=useOnce.js.map