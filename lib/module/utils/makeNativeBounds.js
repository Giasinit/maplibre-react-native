"use strict";

import { featureCollection, point } from "@turf/helpers";
export function makeNativeBounds(ne, sw) {
  return JSON.stringify(featureCollection([point(ne), point(sw)]));
}
//# sourceMappingURL=makeNativeBounds.js.map