"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.makeNativeBounds = makeNativeBounds;
var _helpers = require("@turf/helpers");
function makeNativeBounds(ne, sw) {
  return JSON.stringify((0, _helpers.featureCollection)([(0, _helpers.point)(ne), (0, _helpers.point)(sw)]));
}
//# sourceMappingURL=makeNativeBounds.js.map