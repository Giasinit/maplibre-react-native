"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UserLocationRenderMode = exports.UserLocation = void 0;
var _react = require("react");
var _Annotation = require("./Annotation.js");
var _NativeUserLocation = require("./NativeUserLocation.js");
var _UserLocationPuck = require("./UserLocationPuck.js");
var _LocationManager = require("../modules/location/LocationManager.js");
var _jsxRuntime = require("react/jsx-runtime");
const USER_LOCATION_SOURCE_ID = "mlrn-user-location";
let UserLocationRenderMode = exports.UserLocationRenderMode = /*#__PURE__*/function (UserLocationRenderMode) {
  UserLocationRenderMode["Native"] = "native";
  UserLocationRenderMode["Normal"] = "normal";
  return UserLocationRenderMode;
}({});
const UserLocation = exports.UserLocation = /*#__PURE__*/(0, _react.memo)(/*#__PURE__*/(0, _react.forwardRef)(({
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
  const _isMounted = (0, _react.useRef)(null);
  const locationManagerRunning = (0, _react.useRef)(false);
  const [userLocationState, setUserLocationState] = (0, _react.useState)({
    shouldShowUserLocation: false
  });
  (0, _react.useImperativeHandle)(ref, () => ({
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
  (0, _react.useEffect)(() => {
    _isMounted.current = true;
    setLocationManager({
      running: needsLocationManagerRunning()
    }).then(() => {
      if (renderMode === UserLocationRenderMode.Native) {
        return;
      }
      _LocationManager.LocationManager.setMinDisplacement(minDisplacement ?? 0);
    });
    return () => {
      _isMounted.current = false;
      setLocationManager({
        running: false
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  (0, _react.useEffect)(() => {
    _LocationManager.LocationManager.setMinDisplacement(minDisplacement ?? 0);
  }, [minDisplacement]);
  (0, _react.useEffect)(() => {
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
        _LocationManager.LocationManager.addListener(_onLocationUpdate);
        const location = await _LocationManager.LocationManager.getLastKnownLocation();
        _onLocationUpdate(location);
      } else {
        _LocationManager.LocationManager.removeListener(_onLocationUpdate);
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
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(_NativeUserLocation.NativeUserLocation, {
      ...props
    });
  }
  if (!userLocationState.coordinates) {
    return null;
  }
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_Annotation.Annotation, {
    animated: animated,
    id: USER_LOCATION_SOURCE_ID,
    onPress: onPress,
    coordinates: userLocationState.coordinates,
    style: {
      iconRotate: userLocationState.heading
    },
    children: children || /*#__PURE__*/(0, _jsxRuntime.jsx)(_UserLocationPuck.UserLocationPuck, {
      sourceID: USER_LOCATION_SOURCE_ID,
      heading: showsUserHeadingIndicator ? userLocationState.heading : undefined
    })
  });
}));
//# sourceMappingURL=UserLocation.js.map