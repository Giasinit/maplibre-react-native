"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UserTrackingMode = exports.NATIVE_MODULE_NAME = exports.Camera = void 0;
exports.getNativeCameraMode = getNativeCameraMode;
var _helpers = require("@turf/helpers");
var _react = require("react");
var _reactNative = require("react-native");
var _MLRNModule = require("../MLRNModule.js");
var _useNativeRef = require("../hooks/useNativeRef.js");
var _makeNativeBounds = require("../utils/makeNativeBounds.js");
var _jsxRuntime = require("react/jsx-runtime");
const NATIVE_MODULE_NAME = exports.NATIVE_MODULE_NAME = "MLRNCamera";
let UserTrackingMode = exports.UserTrackingMode = /*#__PURE__*/function (UserTrackingMode) {
  UserTrackingMode["Follow"] = "normal";
  UserTrackingMode["FollowWithHeading"] = "compass";
  UserTrackingMode["FollowWithCourse"] = "course";
  return UserTrackingMode;
}({});
function getNativeCameraMode(mode) {
  switch (mode) {
    case "flyTo":
      return _MLRNModule.CameraModes.Flight;
    case "moveTo":
      return _MLRNModule.CameraModes.None;
    case "linearTo":
      return _MLRNModule.CameraModes.Linear;
    case "easeTo":
      return _MLRNModule.CameraModes.Ease;
    default:
      return _MLRNModule.CameraModes.None;
  }
}
function makeNativeCameraStop(stop) {
  if (!stop) {
    return undefined;
  }
  const newNativeStop = {};
  if (stop.animationDuration !== undefined) {
    newNativeStop.duration = stop.animationDuration;
  }
  if (stop.animationMode !== undefined) {
    newNativeStop.mode = getNativeCameraMode(stop.animationMode);
  }
  if (stop.centerCoordinate) {
    newNativeStop.centerCoordinate = JSON.stringify((0, _helpers.point)(stop.centerCoordinate));
  }
  if (stop.heading !== undefined) {
    newNativeStop.heading = stop.heading;
  }
  if (stop.pitch !== undefined) {
    newNativeStop.pitch = stop.pitch;
  }
  if (stop.zoomLevel !== undefined) {
    newNativeStop.zoom = stop.zoomLevel;
  }
  if (stop.bounds && stop.bounds.ne && stop.bounds.sw) {
    const {
      ne,
      sw
    } = stop.bounds;
    newNativeStop.bounds = (0, _makeNativeBounds.makeNativeBounds)(ne, sw);
  }
  const paddingTop = stop.padding?.paddingTop ?? stop.bounds?.paddingTop;
  if (paddingTop !== undefined) {
    newNativeStop.paddingTop = paddingTop;
  }
  const paddingRight = stop.padding?.paddingRight ?? stop.bounds?.paddingRight;
  if (paddingRight !== undefined) {
    newNativeStop.paddingRight = paddingRight;
  }
  const paddingBottom = stop.padding?.paddingBottom ?? stop.bounds?.paddingBottom;
  if (paddingBottom !== undefined) {
    newNativeStop.paddingBottom = paddingBottom;
  }
  const paddingLeft = stop.padding?.paddingLeft ?? stop.bounds?.paddingLeft;
  if (paddingLeft !== undefined) {
    newNativeStop.paddingLeft = paddingLeft;
  }
  if (newNativeStop.centerCoordinate && newNativeStop.bounds) {
    throw new Error("Create a camera stop with bounds and centerCoordinate – this is not possible.");
  }
  return newNativeStop;
}
const Camera = exports.Camera = /*#__PURE__*/(0, _react.memo)(/*#__PURE__*/(0, _react.forwardRef)(({
  animationMode,
  animationDuration,
  bounds,
  centerCoordinate,
  defaultSettings,
  followUserLocation,
  followHeading,
  followPitch,
  followUserMode,
  followZoomLevel,
  heading,
  maxBounds,
  maxZoomLevel,
  minZoomLevel,
  onUserTrackingModeChange,
  padding,
  pitch,
  zoomLevel
}, ref) => {
  const nativeCameraRef = (0, _useNativeRef.useNativeRef)();
  const setCamera = (config = {}) => {
    if ("stops" in config) {
      nativeCameraRef.current?.setNativeProps({
        stop: {
          stops: config.stops.map(stopItem => makeNativeCameraStop(stopItem)).filter(stopItem => !!stopItem)
        }
      });
    } else {
      const stop = makeNativeCameraStop(config);
      if (stop) {
        nativeCameraRef.current?.setNativeProps({
          stop
        });
      }
    }
  };
  const fitBounds = (ne, sw, padding, animationDuration) => {
    const _padding = {};
    if (Array.isArray(padding)) {
      if (padding.length === 2) {
        _padding.paddingTop = padding[0];
        _padding.paddingBottom = padding[0];
        _padding.paddingLeft = padding[1];
        _padding.paddingRight = padding[1];
      } else if (padding.length === 4) {
        _padding.paddingTop = padding[0];
        _padding.paddingRight = padding[1];
        _padding.paddingBottom = padding[2];
        _padding.paddingLeft = padding[3];
      }
    } else if (typeof padding === "number") {
      _padding.paddingLeft = padding;
      _padding.paddingRight = padding;
      _padding.paddingTop = padding;
      _padding.paddingBottom = padding;
    }
    setCamera({
      bounds: {
        ne,
        sw
      },
      padding: _padding,
      animationDuration,
      animationMode: "easeTo"
    });
  };
  const flyTo = (coordinates, animationDuration = 2000) => {
    setCamera({
      centerCoordinate: coordinates,
      animationDuration,
      animationMode: "flyTo"
    });
  };
  const moveTo = (coordinates, animationDuration = 0) => {
    setCamera({
      centerCoordinate: coordinates,
      animationDuration,
      animationMode: "easeTo"
    });
  };
  const zoomTo = (zoomLevel, animationDuration = 2000) => {
    setCamera({
      zoomLevel,
      animationDuration,
      animationMode: "flyTo"
    });
  };
  (0, _react.useImperativeHandle)(ref, () => ({
    /**
     * Map camera transitions to fit provided bounds
     *
     * @example
     * cameraRef.current?.fitBounds([lng, lat], [lng, lat])
     * cameraRef.current?.fitBounds([lng, lat], [lng, lat], 20, 1000) // padding for all sides
     * cameraRef.current?.fitBounds([lng, lat], [lng, lat], [verticalPadding, horizontalPadding], 1000)
     * cameraRef.current?.fitBounds([lng, lat], [lng, lat], [top, right, bottom, left], 1000)
     *
     * @param {number[]} ne - North east coordinate of bound
     * @param {number[]} sw - South west coordinate of bound
     * @param {number|number[]|undefined} padding - Padding for the bounds
     * @param {number=} animationDuration - Duration of camera animation
     * @return {void}
     */
    fitBounds,
    /**
     * Map camera will fly to new coordinate
     *
     * @example
     * cameraRef.current?.flyTo([lng, lat])
     * cameraRef.current?.flyTo([lng, lat], 12000)
     *
     *  @param {number[]} coordinates - Coordinates that map camera will jump to
     *  @param {number=} animationDuration - Duration of camera animation
     *  @return {void}
     */
    flyTo,
    /**
     * Map camera will move to new coordinate at the same zoom level
     *
     * @example
     * cameraRef.current?.moveTo([lng, lat], 200) // eases camera to new location based on duration
     * cameraRef.current?.moveTo([lng, lat]) // snaps camera to new location without any easing
     *
     *  @param {number[]} coordinates - Coordinates that map camera will move too
     *  @param {number=} animationDuration - Duration of camera animation
     *  @return {void}
     */
    moveTo,
    /**
     * Map camera will zoom to specified level
     *
     * @example
     * cameraRef.current?.zoomTo(16)
     * cameraRef.current?.zoomTo(16, 100)
     *
     * @param {number} zoomLevel - Zoom level that the map camera will animate too
     * @param {number=} animationDuration - Duration of camera animation
     * @return {void}
     */
    zoomTo,
    /**
     * Map camera will perform updates based on provided config. Advanced use only!
     *
     * @example
     * cameraRef.current?.setCamera({
     *   centerCoordinate: [lng, lat],
     *   zoomLevel: 16,
     *   animationDuration: 2000,
     * })
     *
     * cameraRef.current?.setCamera({
     *   stops: [
     *     { pitch: 45, animationDuration: 200 },
     *     { heading: 180, animationDuration: 300 },
     *   ]
     * })
     *
     *  @param {Object} config - Camera configuration
     */
    setCamera
  }));
  const followProps = (0, _react.useMemo)(() => {
    return {
      followUserMode,
      followPitch: followPitch ?? pitch,
      followHeading: followHeading ?? heading,
      followZoomLevel: followZoomLevel ?? zoomLevel
    };
  }, [followUserMode, followPitch, pitch, followHeading, heading, followZoomLevel, zoomLevel]);
  (0, _react.useEffect)(() => {
    if (followUserLocation) {
      if (_reactNative.Platform.OS === "android") {
        nativeCameraRef.current?.setNativeProps({
          ...followProps,
          followUserLocation
        });
      } else {
        nativeCameraRef.current?.setNativeProps({
          ...followProps
        });
        nativeCameraRef.current?.setNativeProps({
          followUserLocation
        });
      }
    } else {
      nativeCameraRef.current?.setNativeProps({
        followUserLocation
      });
    }
  }, [followUserLocation, followProps]);
  const nativeMaxBounds = (0, _react.useMemo)(() => {
    if (!maxBounds?.ne || !maxBounds?.sw) {
      return undefined;
    }
    return (0, _makeNativeBounds.makeNativeBounds)(maxBounds.ne, maxBounds.sw);
  }, [maxBounds]);
  (0, _react.useEffect)(() => {
    if (!followUserLocation) {
      nativeCameraRef.current?.setNativeProps({
        maxBounds: nativeMaxBounds
      });
    }
  }, [followUserLocation, nativeMaxBounds]);
  (0, _react.useEffect)(() => {
    if (!followUserLocation) {
      nativeCameraRef.current?.setNativeProps({
        minZoomLevel
      });
    }
  }, [followUserLocation, minZoomLevel]);
  (0, _react.useEffect)(() => {
    if (!followUserLocation) {
      nativeCameraRef.current?.setNativeProps({
        maxZoomLevel
      });
    }
  }, [followUserLocation, maxZoomLevel]);
  const nativeStop = (0, _react.useMemo)(() => {
    return makeNativeCameraStop({
      animationDuration,
      animationMode,
      bounds,
      centerCoordinate,
      heading,
      padding,
      pitch,
      zoomLevel
    });
  }, [animationDuration, animationMode, bounds, centerCoordinate, heading, padding, pitch, zoomLevel]);
  (0, _react.useEffect)(() => {
    if (!followUserLocation) {
      nativeCameraRef.current?.setNativeProps({
        stop: nativeStop
      });
    }
  }, [followUserLocation, nativeStop]);
  const [nativeDefaultStop] = (0, _react.useState)(makeNativeCameraStop(defaultSettings));
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(MLRNCamera, {
    testID: "Camera",
    ref: nativeCameraRef,
    defaultStop: nativeDefaultStop,
    onUserTrackingModeChange: onUserTrackingModeChange
  });
}));
const MLRNCamera = (0, _reactNative.requireNativeComponent)(NATIVE_MODULE_NAME);
//# sourceMappingURL=Camera.js.map