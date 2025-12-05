"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  Camera: true,
  UserTrackingMode: true,
  MapView: true,
  Light: true,
  PointAnnotation: true,
  Annotation: true,
  Callout: true,
  requestAndroidLocationPermissions: true,
  UserLocation: true,
  UserLocationRenderMode: true,
  VectorSource: true,
  ShapeSource: true,
  RasterSource: true,
  ImageSource: true,
  Images: true,
  FillLayer: true,
  FillExtrusionLayer: true,
  HeatmapLayer: true,
  LineLayer: true,
  CircleLayer: true,
  SymbolLayer: true,
  RasterLayer: true,
  BackgroundLayer: true,
  MarkerView: true,
  LocationManager: true,
  locationManager: true,
  OfflineManager: true,
  offlineManager: true,
  OfflinePack: true,
  OfflineCreatePackOptions: true,
  SnapshotManager: true,
  snapshotManager: true,
  Animated: true,
  Logger: true
};
Object.defineProperty(exports, "Animated", {
  enumerable: true,
  get: function () {
    return _Animated.Animated;
  }
});
Object.defineProperty(exports, "Annotation", {
  enumerable: true,
  get: function () {
    return _Annotation.Annotation;
  }
});
Object.defineProperty(exports, "BackgroundLayer", {
  enumerable: true,
  get: function () {
    return _BackgroundLayer.BackgroundLayer;
  }
});
Object.defineProperty(exports, "Callout", {
  enumerable: true,
  get: function () {
    return _Callout.Callout;
  }
});
Object.defineProperty(exports, "Camera", {
  enumerable: true,
  get: function () {
    return _Camera.Camera;
  }
});
Object.defineProperty(exports, "CircleLayer", {
  enumerable: true,
  get: function () {
    return _CircleLayer.CircleLayer;
  }
});
Object.defineProperty(exports, "FillExtrusionLayer", {
  enumerable: true,
  get: function () {
    return _FillExtrusionLayer.FillExtrusionLayer;
  }
});
Object.defineProperty(exports, "FillLayer", {
  enumerable: true,
  get: function () {
    return _FillLayer.FillLayer;
  }
});
Object.defineProperty(exports, "HeatmapLayer", {
  enumerable: true,
  get: function () {
    return _HeatmapLayer.HeatmapLayer;
  }
});
Object.defineProperty(exports, "ImageSource", {
  enumerable: true,
  get: function () {
    return _ImageSource.ImageSource;
  }
});
Object.defineProperty(exports, "Images", {
  enumerable: true,
  get: function () {
    return _Images.Images;
  }
});
Object.defineProperty(exports, "Light", {
  enumerable: true,
  get: function () {
    return _Light.Light;
  }
});
Object.defineProperty(exports, "LineLayer", {
  enumerable: true,
  get: function () {
    return _LineLayer.LineLayer;
  }
});
Object.defineProperty(exports, "LocationManager", {
  enumerable: true,
  get: function () {
    return _LocationManager.LocationManager;
  }
});
Object.defineProperty(exports, "Logger", {
  enumerable: true,
  get: function () {
    return _Logger.Logger;
  }
});
Object.defineProperty(exports, "MapView", {
  enumerable: true,
  get: function () {
    return _MapView.MapView;
  }
});
Object.defineProperty(exports, "MarkerView", {
  enumerable: true,
  get: function () {
    return _MarkerView.MarkerView;
  }
});
Object.defineProperty(exports, "OfflineCreatePackOptions", {
  enumerable: true,
  get: function () {
    return _OfflineCreatePackOptions.OfflineCreatePackOptions;
  }
});
Object.defineProperty(exports, "OfflineManager", {
  enumerable: true,
  get: function () {
    return _OfflineManager.OfflineManager;
  }
});
Object.defineProperty(exports, "OfflinePack", {
  enumerable: true,
  get: function () {
    return _OfflinePack.OfflinePack;
  }
});
Object.defineProperty(exports, "PointAnnotation", {
  enumerable: true,
  get: function () {
    return _PointAnnotation.PointAnnotation;
  }
});
Object.defineProperty(exports, "RasterLayer", {
  enumerable: true,
  get: function () {
    return _RasterLayer.RasterLayer;
  }
});
Object.defineProperty(exports, "RasterSource", {
  enumerable: true,
  get: function () {
    return _RasterSource.RasterSource;
  }
});
Object.defineProperty(exports, "ShapeSource", {
  enumerable: true,
  get: function () {
    return _ShapeSource.ShapeSource;
  }
});
Object.defineProperty(exports, "SnapshotManager", {
  enumerable: true,
  get: function () {
    return _SnapshotManager.SnapshotManager;
  }
});
Object.defineProperty(exports, "SymbolLayer", {
  enumerable: true,
  get: function () {
    return _SymbolLayer.SymbolLayer;
  }
});
Object.defineProperty(exports, "UserLocation", {
  enumerable: true,
  get: function () {
    return _UserLocation.UserLocation;
  }
});
Object.defineProperty(exports, "UserLocationRenderMode", {
  enumerable: true,
  get: function () {
    return _UserLocation.UserLocationRenderMode;
  }
});
Object.defineProperty(exports, "UserTrackingMode", {
  enumerable: true,
  get: function () {
    return _Camera.UserTrackingMode;
  }
});
Object.defineProperty(exports, "VectorSource", {
  enumerable: true,
  get: function () {
    return _VectorSource.VectorSource;
  }
});
Object.defineProperty(exports, "locationManager", {
  enumerable: true,
  get: function () {
    return _LocationManager.LocationManager;
  }
});
Object.defineProperty(exports, "offlineManager", {
  enumerable: true,
  get: function () {
    return _OfflineManager.OfflineManager;
  }
});
Object.defineProperty(exports, "requestAndroidLocationPermissions", {
  enumerable: true,
  get: function () {
    return _requestAndroidLocationPermissions.requestAndroidLocationPermissions;
  }
});
Object.defineProperty(exports, "snapshotManager", {
  enumerable: true,
  get: function () {
    return _SnapshotManager.SnapshotManager;
  }
});
var _MLRNModule = require("./MLRNModule.js");
Object.keys(_MLRNModule).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _MLRNModule[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _MLRNModule[key];
    }
  });
});
var _Camera = require("./components/Camera.js");
var _MapView = require("./components/MapView.js");
var _Light = require("./components/Light.js");
var _PointAnnotation = require("./components/PointAnnotation.js");
var _Annotation = require("./components/Annotation.js");
var _Callout = require("./components/Callout.js");
var _requestAndroidLocationPermissions = require("./requestAndroidLocationPermissions.js");
var _UserLocation = require("./components/UserLocation.js");
var _VectorSource = require("./components/VectorSource.js");
var _ShapeSource = require("./components/ShapeSource.js");
var _RasterSource = require("./components/RasterSource.js");
var _ImageSource = require("./components/ImageSource.js");
var _Images = require("./components/Images.js");
var _FillLayer = require("./components/FillLayer.js");
var _FillExtrusionLayer = require("./components/FillExtrusionLayer.js");
var _HeatmapLayer = require("./components/HeatmapLayer.js");
var _LineLayer = require("./components/LineLayer.js");
var _CircleLayer = require("./components/CircleLayer.js");
var _SymbolLayer = require("./components/SymbolLayer.js");
var _RasterLayer = require("./components/RasterLayer.js");
var _BackgroundLayer = require("./components/BackgroundLayer.js");
var _MarkerView = require("./components/MarkerView.js");
var _LocationManager = require("./modules/location/LocationManager.js");
var _OfflineManager = require("./modules/offline/OfflineManager.js");
var _OfflinePack = require("./modules/offline/OfflinePack.js");
var _OfflineCreatePackOptions = require("./modules/offline/OfflineCreatePackOptions.js");
var _SnapshotManager = require("./modules/snapshot/SnapshotManager.js");
var _Animated = require("./utils/animated/Animated.js");
var _Logger = require("./utils/Logger.js");
//# sourceMappingURL=MapLibreRN.js.map