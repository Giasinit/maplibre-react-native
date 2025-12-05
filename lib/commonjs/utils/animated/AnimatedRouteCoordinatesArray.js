"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AnimatedRouteCoordinatesArray = void 0;
var _distance = _interopRequireDefault(require("@turf/distance"));
var _helpers = require("@turf/helpers");
var _length = _interopRequireDefault(require("@turf/length"));
var _nearestPointOnLine = _interopRequireDefault(require("@turf/nearest-point-on-line"));
var _AbstractAnimatedCoordinates = require("./AbstractAnimatedCoordinates.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class AnimatedRouteCoordinatesArray extends _AbstractAnimatedCoordinates.AbstractAnimatedCoordinates {
  /**
   * Calculate initial state
   *
   * @param {AnimatedCoordinates[]} coordinatesArray
   * @returns {AnimatedRouteState}
   */
  onInitialState(coordinatesArray) {
    return {
      fullRoute: coordinatesArray.map(coordinates => [coordinates[0], coordinates[1]]),
      end: {
        from: 0,
        to: 0
      }
    };
  }

  /**
   * Calculate value from state
   *
   * @param {AnimatedRouteState} state Previous state
   * @returns {AnimatedCoordinates[]}
   */
  onGetValue(state) {
    return state.actRoute || state.fullRoute;
  }

  /**
   * Calculates state based on startingState and progress, returns a new state
   *
   * @param {AnimatedRouteState} state Previous state
   * @param {number} progress Value between 0 and 1
   * @returns {AnimatedRouteState}
   */
  onCalculate(state, progress) {
    const {
      fullRoute,
      end
    } = state;
    const currentEnd = end.from * (1.0 - progress) + progress * end.to;
    let prevSum = 0;
    let actSum = 0;
    let i = fullRoute.length - 1;
    while (actSum < currentEnd && i > 0) {
      prevSum = actSum;
      const start = fullRoute[i];
      const end = fullRoute[i - 1];
      actSum += start && end ? (0, _distance.default)((0, _helpers.point)(start), (0, _helpers.point)(end), this.distconf) : 0;
      i -= 1;
    }
    if (actSum <= currentEnd) {
      const actRoute = [...fullRoute.slice(0, i + 1)];
      return {
        fullRoute,
        end: {
          ...end,
          current: currentEnd
        },
        actRoute
      };
    }
    const r = (currentEnd - prevSum) / (actSum - prevSum);
    const or = 1.0 - r;
    const actRoute = [...fullRoute.slice(0, i + 1), [(fullRoute[i]?.[0] ?? 0) * r + (fullRoute[i + 1]?.[0] ?? 0) * or, (fullRoute[i]?.[1] ?? 0) * r + (fullRoute[i + 1]?.[1] ?? 0) * or]];
    return {
      fullRoute,
      end: {
        ...end,
        current: currentEnd
      },
      actRoute
    };
  }

  /**
   * Subclasses can override to start a new animation
   *
   * @param {AnimatedRouteState} state
   * @param {*} toValue - to value from animate
   * @returns {object} The state
   */
  onStart(state, toValue) {
    const {
      fullRoute,
      end
    } = state;
    const fullRouteLineString = (0, _helpers.lineString)(fullRoute);
    let to = undefined;
    if ("along" in toValue.end) {
      const {
        units
      } = toValue;
      if (units !== undefined) {
        console.warn("RouteCoordinatesArray: `toValue.units` is deprecated, use `toValue.end.units` instead.");
      }
      to = (0, _length.default)(fullRouteLineString) - (0, _helpers.convertLength)(toValue.end.along, toValue.end.units ?? units);
    } else {
      const nearest = (0, _nearestPointOnLine.default)(fullRouteLineString, toValue.end.point);
      to = (0, _length.default)(fullRouteLineString) - nearest.properties.location;
    }
    return {
      fullRoute,
      end: {
        ...end,
        from: end.current ?? end.from,
        to
      }
    };
  }
  get originalRoute() {
    return this.state.fullRoute;
  }
}
exports.AnimatedRouteCoordinatesArray = AnimatedRouteCoordinatesArray;
//# sourceMappingURL=AnimatedRouteCoordinatesArray.js.map