"use strict";

import { memo } from "react";
import { CircleLayer } from "./CircleLayer.js";
import { UserLocationPuckHeading } from "./UserLocationPuckHeading.js";
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
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
export const UserLocationPuck = /*#__PURE__*/memo(({
  sourceID,
  heading
}) => /*#__PURE__*/_jsxs(_Fragment, {
  children: [/*#__PURE__*/_jsx(CircleLayer, {
    id: "mlrn-user-location-puck-pulse",
    sourceID: sourceID,
    style: layerStyles.pulse
  }), /*#__PURE__*/_jsx(CircleLayer, {
    id: "mlrn-user-location-puck-white",
    sourceID: sourceID,
    style: layerStyles.white
  }), /*#__PURE__*/_jsx(CircleLayer, {
    id: "mlrn-user-location-puck-blue",
    sourceID: sourceID,
    style: layerStyles.blue
  }), typeof heading === "number" && /*#__PURE__*/_jsx(UserLocationPuckHeading, {
    sourceID: sourceID,
    belowLayerID: "mlrn-user-location-puck-white",
    heading: heading
  })]
}));
//# sourceMappingURL=UserLocationPuck.js.map