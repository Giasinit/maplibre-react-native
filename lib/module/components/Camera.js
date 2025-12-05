"use strict";

import { point } from "@turf/helpers";
import { forwardRef, memo, useEffect, useImperativeHandle, useMemo, useState } from "react";
import { Platform, requireNativeComponent } from "react-native";
import { CameraModes } from "../MLRNModule.js";
import { useNativeRef } from "../hooks/useNativeRef.js";
import { makeNativeBounds } from "../utils/makeNativeBounds.js";
import { jsx as _jsx } from "react/jsx-runtime";
export const NATIVE_MODULE_NAME = "MLRNCamera";
export let UserTrackingMode = /*#__PURE__*/function (UserTrackingMode) {
  UserTrackingMode["Follow"] = "normal";
  UserTrackingMode["FollowWithHeading"] = "compass";
  UserTrackingMode["FollowWithCourse"] = "course";
  return UserTrackingMode;
}({});
export function getNativeCameraMode(mode) {
  switch (mode) {
    case "flyTo":
      return CameraModes.Flight;
    case "moveTo":
      return CameraModes.None;
    case "linearTo":
      return CameraModes.Linear;
    case "easeTo":
      return CameraModes.Ease;
    default:
      return CameraModes.None;
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
    newNativeStop.centerCoordinate = JSON.stringify(point(stop.centerCoordinate));
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
    newNativeStop.bounds = makeNativeBounds(ne, sw);
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
export const Camera = /*#__PURE__*/memo(/*#__PURE__*/forwardRef(({
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
  const nativeCameraRef = useNativeRef();
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
  useImperativeHandle(ref, () => ({
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
  const followProps = useMemo(() => {
    return {
      followUserMode,
      followPitch: followPitch ?? pitch,
      followHeading: followHeading ?? heading,
      followZoomLevel: followZoomLevel ?? zoomLevel
    };
  }, [followUserMode, followPitch, pitch, followHeading, heading, followZoomLevel, zoomLevel]);
  useEffect(() => {
    if (followUserLocation) {
      if (Platform.OS === "android") {
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
  const nativeMaxBounds = useMemo(() => {
    if (!maxBounds?.ne || !maxBounds?.sw) {
      return undefined;
    }
    return makeNativeBounds(maxBounds.ne, maxBounds.sw);
  }, [maxBounds]);
  useEffect(() => {
    if (!followUserLocation) {
      nativeCameraRef.current?.setNativeProps({
        maxBounds: nativeMaxBounds
      });
    }
  }, [followUserLocation, nativeMaxBounds]);
  useEffect(() => {
    if (!followUserLocation) {
      nativeCameraRef.current?.setNativeProps({
        minZoomLevel
      });
    }
  }, [followUserLocation, minZoomLevel]);
  useEffect(() => {
    if (!followUserLocation) {
      nativeCameraRef.current?.setNativeProps({
        maxZoomLevel
      });
    }
  }, [followUserLocation, maxZoomLevel]);
  const nativeStop = useMemo(() => {
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
  useEffect(() => {
    if (!followUserLocation) {
      nativeCameraRef.current?.setNativeProps({
        stop: nativeStop
      });
    }
  }, [followUserLocation, nativeStop]);
  const [nativeDefaultStop] = useState(makeNativeCameraStop(defaultSettings));
  return /*#__PURE__*/_jsx(MLRNCamera, {
    testID: "Camera",
    ref: nativeCameraRef,
    defaultStop: nativeDefaultStop,
    onUserTrackingModeChange: onUserTrackingModeChange
  });
}));
const MLRNCamera = requireNativeComponent(NATIVE_MODULE_NAME);
//# sourceMappingURL=Camera.js.map