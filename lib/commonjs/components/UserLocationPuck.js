"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UserLocationPuck = void 0;
var _react = require("react");
var _CircleLayer = require("./CircleLayer.js");
var _UserLocationPuckHeading = require("./UserLocationPuckHeading.js");
var _jsxRuntime = require("react/jsx-runtime");
const blue = "#33B5E5";
const layerStyles = {
  pulse: {
    circleRadius: 15,
    circleColor: blue,
    circleOpacity: 0.2,
    circlePitchAlignment: "map"
  },
  white: {
    circleRadius: 9,
    circleColor: "#fff",
    circlePitchAlignment: "map"
  },
  blue: {
    circleRadius: 6,
    circleColor: blue,
    circlePitchAlignment: "map"
  }
};
const UserLocationPuck = exports.UserLocationPuck = /*#__PURE__*/(0, _react.memo)(({
  sourceID,
  heading
}) => /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
  children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_CircleLayer.CircleLayer, {
    id: "mlrn-user-location-puck-pulse",
    sourceID: sourceID,
    style: layerStyles.pulse
  }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_CircleLayer.CircleLayer, {
    id: "mlrn-user-location-puck-white",
    sourceID: sourceID,
    style: layerStyles.white
  }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_CircleLayer.CircleLayer, {
    id: "mlrn-user-location-puck-blue",
    sourceID: sourceID,
    style: layerStyles.blue
  }), typeof heading === "number" && /*#__PURE__*/(0, _jsxRuntime.jsx)(_UserLocationPuckHeading.UserLocationPuckHeading, {
    sourceID: sourceID,
    belowLayerID: "mlrn-user-location-puck-white",
    heading: heading
  })]
}));
//# sourceMappingURL=UserLocationPuck.js.map