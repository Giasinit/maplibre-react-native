"use strict";

import { memo } from "react";
import { SymbolLayer } from "./SymbolLayer.js";
import headingIcon from "../assets/heading.png";
import { jsx as _jsx } from "react/jsx-runtime";
const layerStyle = {
  iconImage: headingIcon,
  iconAllowOverlap: true,
  iconPitchAlignment: "map",
  iconRotationAlignment: "map"
};
export const UserLocationPuckHeading = /*#__PURE__*/memo(({
  sourceID,
  belowLayerID,
  heading
}) => /*#__PURE__*/_jsx(SymbolLayer, {
  id: "mlrn-user-location-puck-heading",
  sourceID: sourceID,
  belowLayerID: belowLayerID,
  style: {
    iconRotate: heading,
    ...layerStyle
  }
}));
//# sourceMappingURL=UserLocationPuckHeading.js.map