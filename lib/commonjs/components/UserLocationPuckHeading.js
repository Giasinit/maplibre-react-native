"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UserLocationPuckHeading = void 0;
var _react = require("react");
var _SymbolLayer = require("./SymbolLayer.js");
var _heading = _interopRequireDefault(require("../assets/heading.png"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const layerStyle = {
  iconImage: _heading.default,
  iconAllowOverlap: true,
  iconPitchAlignment: "map",
  iconRotationAlignment: "map"
};
const UserLocationPuckHeading = exports.UserLocationPuckHeading = /*#__PURE__*/(0, _react.memo)(({
  sourceID,
  belowLayerID,
  heading
}) => /*#__PURE__*/(0, _jsxRuntime.jsx)(_SymbolLayer.SymbolLayer, {
  id: "mlrn-user-location-puck-heading",
  sourceID: sourceID,
  belowLayerID: belowLayerID,
  style: {
    iconRotate: heading,
    ...layerStyle
  }
}));
//# sourceMappingURL=UserLocationPuckHeading.js.map