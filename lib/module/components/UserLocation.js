"use strict";

import { forwardRef, memo, useEffect, useImperativeHandle, useRef, useState } from "react";
import { Annotation } from "./Annotation.js";
import { NativeUserLocation } from "./NativeUserLocation.js";
import { UserLocationPuck } from "./UserLocationPuck.js";
import { LocationManager } from "../modules/location/LocationManager.js";
import { jsx as _jsx } from "react/jsx-runtime";
const USER_LOCATION_SOURCE_ID = "mlrn-user-location";
export let UserLocationRenderMode = /*#__PURE__*/function (UserLocationRenderMode) {
  UserLocationRenderMode["Native"] = "native";
  UserLocationRenderMode["Normal"] = "normal";
  return UserLocationRenderMode;
}({});
export const UserLocation = /*#__PURE__*/memo(/*#__PURE__*/forwardRef(({
  animated = true,
  visible = true,
  showsUserHeadingIndicator = false,
  minDisplacement = 0,
  renderMode = "normal",
  androidRenderMode,
  androidPreferredFramesPerSecond,
  children,
  onUpdate,
  onPress
}, ref) => {
  const _isMounted = useRef(null);
  const locationManagerRunning = useRef(false);
  const [userLocationState, setUserLocationState] = useState({
    shouldShowUserLocation: false
  });
  useImperativeHandle(ref, () => ({
    /**
     * Whether to start or stop listening to the LocationManager
     *
     * Notice, that listening will start automatically when
     * either `onUpdate` or `visible` are set
     *
     * @async
     * @param {{running: boolean}} running - Object with key `running` and `boolean` value
     * @return {Promise<void>}
     */
    setLocationManager,
    /**
     *
     * If LocationManager should be running
     *
     * @return {boolean}
     */
    needsLocationManagerRunning,
    _onLocationUpdate
  }));
  useEffect(() => {
    _isMounted.current = true;
    setLocationManager({
      running: needsLocationManagerRunning()
    }).then(() => {
      if (renderMode === UserLocationRenderMode.Native) {
        return;
      }
      LocationManager.setMinDisplacement(minDisplacement ?? 0);
    });
    return () => {
      _isMounted.current = false;
      setLocationManager({
        running: false
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    LocationManager.setMinDisplacement(minDisplacement ?? 0);
  }, [minDisplacement]);
  useEffect(() => {
    if (!_isMounted.current) {
      return;
    }
    setLocationManager({
      running: needsLocationManagerRunning()
    });
  });
  async function setLocationManager({
    running
  }) {
    if (locationManagerRunning.current !== running) {
      locationManagerRunning.current = running;
      if (running) {
        LocationManager.addListener(_onLocationUpdate);
        const location = await LocationManager.getLastKnownLocation();
        _onLocationUpdate(location);
      } else {
        LocationManager.removeListener(_onLocationUpdate);
      }
    }
  }
  function needsLocationManagerRunning() {
    return !!(!!onUpdate || renderMode === UserLocationRenderMode.Normal && visible);
  }
  function _onLocationUpdate(location) {
    if (!_isMounted.current || !location) {
      return;
    }
    let coordinates;
    let heading;
    if (location && location.coords) {
      const {
        longitude,
        latitude
      } = location.coords;
      heading = location.coords.heading;
      coordinates = [longitude, latitude];
    }
    setUserLocationState({
      ...userLocationState,
      coordinates,
      heading
    });
    if (onUpdate) {
      onUpdate(location);
    }
  }
  if (!visible) {
    return null;
  }
  if (renderMode === UserLocationRenderMode.Native) {
    const props = {
      androidRenderMode,
      iosShowsUserHeadingIndicator: showsUserHeadingIndicator,
      androidPreferredFramesPerSecond
    };
    return /*#__PURE__*/_jsx(NativeUserLocation, {
      ...props
    });
  }
  if (!userLocationState.coordinates) {
    return null;
  }
  return /*#__PURE__*/_jsx(Annotation, {
    animated: animated,
    id: USER_LOCATION_SOURCE_ID,
    onPress: onPress,
    coordinates: userLocationState.coordinates,
    style: {
      iconRotate: userLocationState.heading
    },
    children: children || /*#__PURE__*/_jsx(UserLocationPuck, {
      sourceID: USER_LOCATION_SOURCE_ID,
      heading: showsUserHeadingIndicator ? userLocationState.heading : undefined
    })
  });
}));
//# sourceMappingURL=UserLocation.js.map