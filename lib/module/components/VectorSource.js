"use strict";

import { featureCollection } from "@turf/helpers";
import { forwardRef, memo, useImperativeHandle } from "react";
import { NativeModules, requireNativeComponent } from "react-native";
import { useAbstractSource } from "../hooks/useAbstractSource.js";
import { useNativeBridge } from "../hooks/useNativeBridge.js";
import { cloneReactChildrenWithProps, isFunction, isAndroid } from "../utils/index.js";
import { getFilter } from "../utils/filterUtils.js";
import { jsx as _jsx } from "react/jsx-runtime";
const MLRNModule = NativeModules.MLRNModule;
export const NATIVE_MODULE_NAME = "MLRNVectorSource";
const MLRNVectorSource = requireNativeComponent(NATIVE_MODULE_NAME);

/**
 * VectorSource is a map content source that supplies tiled vector data in Mapbox Vector Tile format to be shown on the map.
 * The location of and metadata about the tiles are defined either by an option dictionary or by an external file that conforms to the TileJSON specification.
 */
export const VectorSource = /*#__PURE__*/memo(/*#__PURE__*/forwardRef(({
  id = MLRNModule.StyleSource.DefaultSourceID,
  ...props
}, ref) => {
  // * exposes the methods of the function component so we don't break projects that depend on calling this methods
  useImperativeHandle(ref, () => ({
    /**
     * Returns all features that match the query parameters regardless of whether or not the feature is
     * currently rendered on the map. The domain of the query includes all currently-loaded vector tiles
     * and GeoJSON source tiles. This function does not check tiles outside of the visible viewport.
     *
     * @example
     * vectorSource.features(['id1', 'id2'])
     *
     * @param  {Array=} layerIDs - A set of strings that correspond to the names of layers defined in the current style. Only the features contained in these layers are included in the returned array.
     * @param  {Array=} filter - an optional filter statement to filter the returned Features.
     * @return {GeoJSON.FeatureCollection}
     */
    features,
    onPress
  }));
  const {
    _runNativeCommand,
    //  _runPendingNativeCommands,
    _onAndroidCallback
  } = useNativeBridge(NATIVE_MODULE_NAME);
  const {
    setNativeRef,
    _nativeRef
  } = useAbstractSource();

  // const _setNativeRef = (
  //   nativeRef: (Component<NativeProps> & Readonly<NativeMethods>) | null,
  // ): void => {
  //   if (nativeRef) {
  //     setNativeRef(nativeRef);
  //     _runPendingNativeCommands(nativeRef);
  //   }
  // };

  const features = async (layerIDs = [], filter) => {
    if (!_nativeRef) {
      return featureCollection([]);
    }
    const res = await _runNativeCommand("features", _nativeRef, [[[layerIDs, getFilter(filter)]]]);
    if (isAndroid()) {
      return JSON.parse(res?.data);
    }
    return res.data;
  };
  const onPress = event => {
    const {
      onPress
    } = props;
    if (!onPress) {
      return;
    }
    const {
      nativeEvent: {
        payload: {
          features,
          coordinates,
          point
        }
      }
    } = event;
    onPress({
      features,
      coordinates,
      point
    });
  };
  const allProps = {
    id,
    url: props.url,
    tileUrlTemplates: props.tileUrlTemplates,
    minZoomLevel: props.minZoomLevel,
    maxZoomLevel: props.maxZoomLevel,
    tms: props.tms,
    attribution: props.attribution,
    hitbox: props.hitbox,
    hasPressListener: isFunction(props.onPress),
    onMapboxVectorSourcePress: onPress,
    onPress: undefined,
    onAndroidCallback: isAndroid() ? _onAndroidCallback : undefined
  };
  return /*#__PURE__*/_jsx(MLRNVectorSource, {
    ref: setNativeRef,
    ...allProps,
    children: cloneReactChildrenWithProps(props.children, {
      sourceID: id
    })
  });
}));
//# sourceMappingURL=VectorSource.js.map